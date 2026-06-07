import {
    getKopSuratData,
    getRekapitulasiData,
    getFinalPenerimaanData,
} from "../services/laporanService.js";
import {
    drawKopSurat,
    drawCenteredReportHeader,
    drawSignature,
    createPdfDoc,
    formatLongDate,
    formatPct,
    getPageLayout,
} from "../utils/pdfGenerator.js";
import { getStatusLabel } from "../constants/statusPendaftaran.js";

// Helper: bersihkan nama file dari karakter tidak aman
const sanitizeFilename = (str) =>
    (str || "dokumen")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

// ─── REKAPITULASI PPDB ────────────────────────────────────────────────────────

/**
 * GET /laporan/rekapitulasi/:id_gelombang/pdf
 * Menghasilkan PDF rekapitulasi statistik PPDB untuk satu gelombang.
 */
export const exportRekapitulasiPdf = async (req, res) => {
    try {
        const { id_gelombang } = req.params;

        // 1. Ambil data
        const [kop, rekap] = await Promise.all([
            getKopSuratData(),
            getRekapitulasiData(id_gelombang),
        ]);

        const {
            gelombang,
            jumlahPendaftar,
            kuota,
            sisaKuota,
            tingkatKeterisian,
            jumlahLulus,
            jumlahTidakLulus,
            jumlahBelumFinal,
            persenLulusTotal,
            persenLulusFinal,
            distribusiStatus,
            rekapAsalSekolah,
            asalTerbanyak,
        } = rekap;

        // 2. Nama gelombang untuk judul & filename
        const namaGelombang = gelombang.nama || `Gelombang ${id_gelombang}`;
        const tahunAjaran = new Date(gelombang.tanggal_mulai).getFullYear();
        const tahunAjaranStr = `${tahunAjaran}/${tahunAjaran + 1}`;
        const safeFilename = `laporan-rekapitulasi-ppdb-${sanitizeFilename(namaGelombang)}.pdf`;

        // 3. Setup response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeFilename}"`,
        );

        // 4. Buat dokumen PDF
        const doc = createPdfDoc();
        doc.pipe(res);

        // ── KOP ──────────────────────────────────────────────────────────────
        drawKopSurat(doc, kop);

        // ── JUDUL LAPORAN ─────────────────────────────────────────────────────
        drawCenteredReportHeader(doc, {
            judul: "LAPORAN REKAPITULASI PPDB",
            namaGelombang,
            tahunAjaran: tahunAjaranStr,
            periodeMulai: formatLongDate(gelombang.tanggal_mulai),
            periodeSelesai: formatLongDate(gelombang.tanggal_selesai),
        });

        // ── RINGKASAN UTAMA ───────────────────────────────────────────────────
        const { contentX, contentWidth } = getPageLayout(doc);

        const ringkasanTable = {
            title: "Ringkasan Utama",
            headers: ["Keterangan", "Nilai"],
            rows: [
                ["Kuota Gelombang", kuota.toString()],
                ["Jumlah Seluruh Pendaftar", jumlahPendaftar.toString()],
                ["Sisa Kuota", sisaKuota.toString()],
                ["Tingkat Keterisian Kuota", formatPct(tingkatKeterisian)],
                ["Jumlah Siswa Lulus", jumlahLulus.toString()],
                ["Jumlah Siswa Tidak Lulus", jumlahTidakLulus.toString()],
                ["Jumlah Siswa Belum Final", jumlahBelumFinal.toString()],
                [
                    "Persentase Kelulusan (dari seluruh pendaftar)",
                    formatPct(persenLulusTotal),
                ],
                [
                    "Persentase Kelulusan (dari seleksi final)",
                    formatPct(persenLulusFinal),
                ],
            ],
        };

        doc.x = contentX;
        await doc.table(ringkasanTable, {
            x: contentX,
            width: contentWidth,
            columnsSize: [Math.round(contentWidth * 0.68), Math.round(contentWidth * 0.32)],
            prepareHeader: () => doc.fontSize(9).font("Helvetica-Bold"),
            prepareRow: () => doc.fontSize(9).font("Helvetica"),
        });
        doc.x = contentX;

        doc.moveDown(0.8);

        // ── DISTRIBUSI STATUS ─────────────────────────────────────────────────
        const statusRows = distribusiStatus.map((s, idx) => [
            (idx + 1).toString(),
            getStatusLabel(s.status),
            s.jumlah.toString(),
            jumlahPendaftar > 0
                ? formatPct((s.jumlah / jumlahPendaftar) * 100)
                : "0%",
        ]);

        const statusTable = {
            title: "Distribusi Status Pendaftaran",
            headers: ["No.", "Status Pendaftaran", "Jumlah", "Persentase"],
            rows: statusRows,
        };

        doc.x = contentX;
        await doc.table(statusTable, {
            x: contentX,
            width: contentWidth,
            columnsSize: [30, Math.round(contentWidth * 0.56), 80, 85],
            prepareHeader: () => doc.fontSize(9).font("Helvetica-Bold"),
            prepareRow: () => doc.fontSize(9).font("Helvetica"),
        });
        doc.x = contentX;

        doc.moveDown(0.8);

        // ── REKAPITULASI ASAL SEKOLAH ─────────────────────────────────────────
        const asalRows = rekapAsalSekolah.map((s, idx) => [
            (idx + 1).toString(),
            s.nama,
            s.jumlahPendaftar.toString(),
            s.jumlahLulus.toString(),
            s.jumlahTidakLulus.toString(),
            s.belumFinal.toString(),
            formatPct(s.persenLulus),
        ]);

        // Jika tidak ada pendaftar, tetap tampilkan tabel kosong
        const asalTable = {
            title: "Rekapitulasi Berdasarkan Asal Sekolah",
            headers: [
                "No.",
                "Asal Sekolah",
                "Pendaftar",
                "Lulus",
                "Tdk Lulus",
                "Blm Final",
                "% Lulus",
            ],
            rows:
                asalRows.length > 0
                    ? asalRows
                    : [["–", "Belum ada data", "0", "0", "0", "0", "0%"]],
        };

        const cw = contentWidth;
        doc.x = contentX;
        await doc.table(asalTable, {
            x: contentX,
            width: cw,
            columnsSize: [28, Math.round(cw * 0.32), 58, 50, 58, 58, 58],
            prepareHeader: () => doc.fontSize(8).font("Helvetica-Bold"),
            prepareRow: () => doc.fontSize(8).font("Helvetica"),
        });
        doc.x = contentX;

        doc.moveDown(1);

        // ── PARAGRAF KESIMPULAN ───────────────────────────────────────────────
        let kesimpulan;
        if (jumlahPendaftar === 0) {
            kesimpulan =
                `Berdasarkan hasil rekapitulasi ${namaGelombang}, belum terdapat pendaftar ` +
                `yang terdaftar pada gelombang ini. Kuota yang tersedia adalah ${kuota} siswa.`;
        } else {
            const asalTerbanyakStr = asalTerbanyak
                ? `${asalTerbanyak.nama} dengan jumlah ${asalTerbanyak.jumlahPendaftar} siswa`
                : "data belum tersedia";

            kesimpulan =
                `Berdasarkan hasil rekapitulasi ${namaGelombang}, jumlah pendaftar mencapai ` +
                `${jumlahPendaftar} siswa dari kuota ${kuota} siswa atau sebesar ` +
                `${formatPct(tingkatKeterisian)}. Pendaftar terbanyak berasal dari ` +
                `${asalTerbanyakStr}. Sebanyak ${jumlahLulus} siswa telah dinyatakan lulus` +
                (jumlahBelumFinal > 0
                    ? `, sedangkan ${jumlahBelumFinal} siswa masih berada dalam tahapan seleksi yang belum final.`
                    : ".");
        }

        doc.x = contentX;
        doc.fontSize(10)
            .font("Helvetica-Bold")
            .text("Kesimpulan", contentX, doc.y, { width: contentWidth });
        doc.moveDown(0.3);
        doc.fontSize(10)
            .font("Helvetica")
            .text(kesimpulan, contentX, doc.y, {
                width: contentWidth,
                align: "justify",
                lineGap: 3,
            });

        // ── TANDA TANGAN ──────────────────────────────────────────────────────
        drawSignature(doc, kop.namaKepsek);

        doc.end();
    } catch (error) {
        if (error.code === "GELOMBANG_NOT_FOUND") {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─── FINAL PENERIMAAN ──────────────────────────────────────────────────────────

/**
 * GET /laporan/final-penerimaan/:id_gelombang/pdf
 * Menghasilkan PDF daftar siswa yang dinyatakan lulus pada satu gelombang.
 */
export const exportFinalPenerimaanPdf = async (req, res) => {
    try {
        const { id_gelombang } = req.params;

        const [kop, { gelombang, pendaftar }] = await Promise.all([
            getKopSuratData(),
            getFinalPenerimaanData(id_gelombang),
        ]);

        const namaGelombang = gelombang.nama || `Gelombang ${id_gelombang}`;
        const safeFilename = `laporan-final-penerimaan-${sanitizeFilename(namaGelombang)}.pdf`;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeFilename}"`,
        );

        const doc = createPdfDoc();
        doc.pipe(res);

        // ── KOP ──────────────────────────────────────────────────────────────
        drawKopSurat(doc, kop);

        // ── JUDUL LAPORAN ─────────────────────────────────────────────────────
        drawCenteredReportHeader(doc, {
            judul: "LAPORAN FINAL PENERIMAAN SISWA BARU",
            namaGelombang,
            periodeMulai: formatLongDate(gelombang.tanggal_mulai),
            periodeSelesai: formatLongDate(gelombang.tanggal_selesai),
        });

        // ── TABEL SISWA LULUS ─────────────────────────────────────────────────
        const rows = pendaftar.map((p, idx) => [
            (idx + 1).toString(),
            p.id_pendaftar.toString(),
            p.nama_lengkap || "-",
            p.nisn || "-",
            p.asal_sekolah || "-",
            getStatusLabel(p.status_pendaftaran),
        ]);

        const table = {
            title: `Daftar Pendaftar Lulus — ${namaGelombang}`,
            headers: [
                "No.",
                "No. Pendaftaran",
                "Nama Lengkap",
                "NISN",
                "Asal Sekolah",
                "Status",
            ],
            rows: rows.length > 0 ? rows : [["–", "–", "Belum ada data", "–", "–", "–"]],
        };

        const { contentX: cx, contentWidth: fcw } = getPageLayout(doc);
        doc.x = cx;
        await doc.table(table, {
            x: cx,
            width: fcw,
            columnsSize: [28, 72, Math.round(fcw * 0.30), 68, Math.round(fcw * 0.22), 52],
            prepareHeader: () => doc.fontSize(9).font("Helvetica-Bold"),
            prepareRow: () => doc.fontSize(9).font("Helvetica"),
        });
        doc.x = cx;

        // ── TANDA TANGAN ──────────────────────────────────────────────────────
        drawSignature(doc, kop.namaKepsek);

        doc.end();
    } catch (error) {
        if (error.code === "GELOMBANG_NOT_FOUND") {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─── VALIDASI GELOMBANG (dipertahankan, tidak diubah) ─────────────────────────

import { PrismaClient } from "@prisma/client";
import { STATUS_PENDAFTARAN } from "../constants/statusPendaftaran.js";

const prisma = new PrismaClient();

export const getValidasiGelombang = async (req, res) => {
    try {
        const gelombangList = await prisma.gelombang.findMany({
            where: { status_validasi: "menunggu_validasi" },
            include: { _count: { select: { pendaftar: true } } },
        });

        const now = new Date();
        const filteredList = gelombangList.filter((g) => {
            const end = new Date(g.tanggal_selesai);
            end.setHours(23, 59, 59, 999);
            return now > end;
        });

        const responseData = await Promise.all(
            filteredList.map(async (g) => {
                const pendaftar = await prisma.pendaftar.findMany({
                    where: { id_gelombang: g.id_gelombang },
                    select: { status_pendaftaran: true },
                });

                const totalPendaftar = pendaftar.length;
                const totalLulus = pendaftar.filter(
                    (p) => p.status_pendaftaran === STATUS_PENDAFTARAN.LULUS,
                ).length;
                const totalTidakLulus = pendaftar.filter(
                    (p) => p.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS,
                ).length;
                const totalBelumFinal = totalPendaftar - totalLulus - totalTidakLulus;

                return {
                    id_gelombang: g.id_gelombang,
                    nama: g.nama,
                    tanggal_mulai: g.tanggal_mulai,
                    tanggal_selesai: g.tanggal_selesai,
                    kuota: g.kuota,
                    status_validasi: g.status_validasi,
                    tanggal_validasi: g.tanggal_validasi,
                    totalPendaftar,
                    totalLulus,
                    totalTidakLulus,
                    totalBelumFinal,
                };
            }),
        );

        res.status(200).json({ message: "success", data: responseData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setujuiValidasiGelombang = async (req, res) => {
    try {
        if (req.user && req.user.role !== "kepala_sekolah") {
            return res.status(403).json({ message: "Akses ditolak." });
        }

        const { id } = req.params;

        const gelombang = await prisma.gelombang.findUnique({
            where: { id_gelombang: Number(id) },
        });

        if (!gelombang)
            return res.status(404).json({ message: "Gelombang tidak ditemukan." });

        if (gelombang.status_validasi !== "menunggu_validasi") {
            return res
                .status(400)
                .json({ message: "Gelombang belum diajukan untuk validasi." });
        }

        const updated = await prisma.gelombang.update({
            where: { id_gelombang: Number(id) },
            data: {
                status_validasi: "disetujui",
                tanggal_validasi: new Date(),
            },
        });

        res.status(200).json({
            message: "Laporan gelombang berhasil disetujui",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── DATA JSON ENDPOINTS (dipertahankan untuk halaman Beranda) ─────────────────

export const getRekapPPDB = async (req, res) => {
    try {
        const total = await prisma.pendaftar.count();
        const lulus = await prisma.pendaftar.count({
            where: { status_pendaftaran: STATUS_PENDAFTARAN.LULUS },
        });
        const tidakLulus = await prisma.pendaftar.count({
            where: { status_pendaftaran: STATUS_PENDAFTARAN.TIDAK_LULUS },
        });
        const menunggu = await prisma.pendaftar.count({
            where: { status_pendaftaran: STATUS_PENDAFTARAN.MENUNGGU_VERIFIKASI },
        });

        res.json({ success: true, data: { total, lulus, tidakLulus, menunggu } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStatusPendaftaran = async (req, res) => {
    try {
        const pendaftar = await prisma.pendaftar.groupBy({
            by: ["status_pendaftaran"],
            _count: { status_pendaftaran: true },
        });
        res.json({ success: true, data: pendaftar });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRekapGelombang = async (req, res) => {
    try {
        const gelombang = await prisma.gelombang.findMany({
            include: { _count: { select: { pendaftar: true } } },
            orderBy: { tanggal_mulai: "desc" },
        });
        res.json({ success: true, data: gelombang });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAsalSekolah = async (req, res) => {
    try {
        const data = await prisma.pendaftar.groupBy({
            by: ["asal_sekolah"],
            _count: { asal_sekolah: true },
            orderBy: { _count: { asal_sekolah: "desc" } },
            take: 10,
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getWilayahPendaftar = async (req, res) => {
    try {
        const data = await prisma.alamat.groupBy({
            by: ["kecamatan"],
            _count: { kecamatan: true },
            orderBy: { _count: { kecamatan: "desc" } },
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getKinerjaVerifikator = async (req, res) => {
    try {
        const data = await prisma.verifikator.findMany({
            include: { _count: { select: { pendaftar: true } } },
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFinalPenerimaan = async (req, res) => {
    try {
        const data = await prisma.pendaftar.findMany({
            where: { status_pendaftaran: STATUS_PENDAFTARAN.LULUS },
            select: {
                nisn: true,
                nama_lengkap: true,
                asal_sekolah: true,
                gelombang: { select: { nama: true } },
            },
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const LaporanKepalaSekolahController = {
    getRekapPPDB,
    getStatusPendaftaran,
    getRekapGelombang,
    getAsalSekolah,
    getWilayahPendaftar,
    getKinerjaVerifikator,
    getFinalPenerimaan,
    exportRekapitulasiPdf,
    exportFinalPenerimaanPdf,
    getValidasiGelombang,
    setujuiValidasiGelombang,
};
