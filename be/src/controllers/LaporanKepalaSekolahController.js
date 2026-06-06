import { PrismaClient } from "@prisma/client";
import exceljs from "exceljs";
import PDFDocument from "pdfkit-table";

import { STATUS_PENDAFTARAN } from "../constants/statusPendaftaran.js";

const formatLongDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const getImageBuffer = async (url) => {
    if (!url) return null;

    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error) {
        console.error("Gagal mengambil logo sekolah:", error.message);
        return null;
    }
};

const prisma = new PrismaClient();

// Helper untuk mengambil kop surat
const getKopSuratData = async () => {
    const profil = await prisma.profil.findFirst();
    const kontak = await prisma.kontak.findFirst();

    return {
        namaSekolah: profil?.nama_sekolah || "SMP Katolik St. Rafael Manado",
        akreditasi: profil?.akreditasi || "A",
        email: kontak?.email || "info@st-rafael.sch.id",
        telepon: kontak?.no_telpon || "0812-XXXX-XXXX",
        alamat: "Jl. Rike, Wanea, Manado, Sulawesi Utara",
        namaKepsek: profil?.nama_kepala_sekolah || "Kepala Sekolah",
        logo: profil?.logo || null,
    };
};

const drawKopSurat = async (doc, data, title) => {
    if (data.logo) {
        const logoBuffer = await getImageBuffer(data.logo);
        if (logoBuffer) {
            doc.image(logoBuffer, 50, 45, { width: 50 });
        }
    }

    // Posisi teks kop
    doc.fontSize(16).font("Helvetica-Bold").text(data.namaSekolah, { align: "center" });
    doc.fontSize(10)
        .font("Helvetica")
        .text(`Akreditasi: ${data.akreditasi}`, { align: "center" });
    doc.fontSize(10).text(`${data.alamat}`, { align: "center" });
    doc.fontSize(10).text(`Telp: ${data.telepon} | Email: ${data.email}`, {
        align: "center",
    });

    // Garis bawah kop
    doc.moveTo(50, 115).lineTo(550, 115).lineWidth(2).stroke();
    doc.moveTo(50, 118).lineTo(550, 118).lineWidth(1).stroke();

    // Judul Laporan
    doc.moveDown(3);
    doc.fontSize(10).font("Helvetica").text(title, { align: "left" });
    doc.fontSize(10)
        .font("Helvetica")
        .text(`Nomor Surat: ....................................`, { align: "left" });
    doc.fontSize(10)
        .font("Helvetica")
        .text(`Tanggal Cetak: ${formatLongDate(new Date())}`, { align: "left" });
    doc.moveDown(2);
};

const drawSignature = (doc, namaKepsek) => {
    doc.moveDown(3);
    doc.fontSize(10)
        .font("Helvetica")
        .text(`Manado, ${formatLongDate(new Date())}`, 400, doc.y);
    doc.text("Kepala Sekolah,", 400, doc.y + 15);
    doc.text(namaKepsek, 400, doc.y + 70, { underline: true });
};

export const LaporanKepalaSekolahController = {
    // 1. Endpoint Data JSON
    getRekapPPDB: async (req, res) => {
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
    },

    getStatusPendaftaran: async (req, res) => {
        try {
            const pendaftar = await prisma.pendaftar.groupBy({
                by: ["status_pendaftaran"],
                _count: { status_pendaftaran: true },
            });
            res.json({ success: true, data: pendaftar });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getRekapGelombang: async (req, res) => {
        try {
            const gelombang = await prisma.gelombang.findMany({
                include: { _count: { select: { pendaftar: true } } },
            });
            res.json({ success: true, data: gelombang });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getAsalSekolah: async (req, res) => {
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
    },

    getWilayahPendaftar: async (req, res) => {
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
    },

    getKinerjaVerifikator: async (req, res) => {
        try {
            const data = await prisma.verifikator.findMany({
                include: { _count: { select: { pendaftar: true } } },
            });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getFinalPenerimaan: async (req, res) => {
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
    },

    // 2. Export Endpoints - Rekap PPDB
    exportRekapPPDBExcel: async (req, res) => {
        try {
            const data = await getKopSuratData();
            const workbook = new exceljs.Workbook();
            const sheet = workbook.addWorksheet("Rekap PPDB");

            sheet.addRow([data.namaSekolah]);
            sheet.addRow(["LAPORAN REKAPITULASI PPDB"]);
            sheet.addRow([`Tanggal Cetak: ${formatLongDate(new Date())}`]);
            sheet.addRow([]);

            sheet.addRow(["No", "NISN", "Nama", "Asal Sekolah", "Status"]);
            sheet.getRow(5).font = { bold: true };
            sheet.getColumn(1).width = 5;
            sheet.getColumn(2).width = 14;
            sheet.getColumn(3).width = 30;

            const pendaftar = await prisma.pendaftar.findMany();
            pendaftar.forEach((p, idx) => {
                sheet.addRow([
                    idx + 1,
                    p.nisn,
                    p.nama_lengkap,
                    p.asal_sekolah,
                    p.status_pendaftaran,
                ]);
            });

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );
            res.setHeader("Content-Disposition", "attachment; filename=rekap-ppdb.xlsx");

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    exportRekapPPDBPdf: async (req, res) => {
        try {
            const data = await getKopSuratData();
            const doc = new PDFDocument({ margin: 50, size: "A4" });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=rekap-ppdb.pdf");
            doc.pipe(res);

            await drawKopSurat(doc, data, "LAPORAN REKAPITULASI PPDB");

            const pendaftar = await prisma.pendaftar.findMany();

            const table = {
                title: "Daftar Seluruh Pendaftar",
                headers: ["No", "NISN", "Nama Lengkap", "Status"],
                rows: pendaftar.map((p, idx) => [
                    (idx + 1).toString(),
                    p.nisn || "-",
                    p.nama_lengkap,
                    p.status_pendaftaran,
                ]),
            };

            await doc.table(table, {
                width: 500,
                columnsSize: [35, 90, 200, 175],
            });

            drawSignature(doc, data.namaKepsek);
            doc.end();
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // 3. Export Endpoints - Final Penerimaan
    exportFinalPenerimaanExcel: async (req, res) => {
        try {
            const data = await getKopSuratData();
            const workbook = new exceljs.Workbook();
            const sheet = workbook.addWorksheet("Final Penerimaan");

            sheet.addRow([data.namaSekolah]);
            sheet.addRow(["LAPORAN FINAL PENERIMAAN SISWA BARU"]);
            sheet.addRow([`Tanggal Cetak: ${formatLongDate(new Date())}`]);
            sheet.addRow([]);

            sheet.addRow(["No", "NISN", "Nama", "Asal Sekolah"]);
            sheet.getRow(5).font = { bold: true };
            sheet.getColumn(1).width = 5;
            sheet.getColumn(2).width = 14;
            sheet.getColumn(3).width = 30;

            const pendaftar = await prisma.pendaftar.findMany({
                where: { status_pendaftaran: STATUS_PENDAFTARAN.LULUS },
            });
            pendaftar.forEach((p, idx) => {
                sheet.addRow([idx + 1, p.nisn, p.nama_lengkap, p.asal_sekolah]);
            });

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=final-penerimaan.xlsx",
            );

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    exportFinalPenerimaanPdf: async (req, res) => {
        try {
            const data = await getKopSuratData();
            const doc = new PDFDocument({ margin: 50, size: "A4" });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=final-penerimaan.pdf",
            );
            doc.pipe(res);

            await drawKopSurat(doc, data, "LAPORAN FINAL PENERIMAAN SISWA BARU");

            const pendaftar = await prisma.pendaftar.findMany({
                where: { status_pendaftaran: STATUS_PENDAFTARAN.LULUS },
            });

            const table = {
                title: "Daftar Pendaftar Lulus",
                headers: [
                    "No",
                    "NISN",
                    "Nama Lengkap",
                    "Asal Sekolah",
                    "Status Pendaftaran",
                ],
                rows: pendaftar.map((p, idx) => [
                    (idx + 1).toString(),
                    p.nisn || "-",
                    p.nama_lengkap,
                    p.asal_sekolah,
                    p.status_pendaftaran,
                ]),
            };

            await doc.table(table, {
                width: 500,
                columnsSize: [30, 80, 160, 130, 100],
            });

            drawSignature(doc, data.namaKepsek);
            doc.end();
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // 4. Validasi Laporan Gelombang
    getValidasiGelombang: async (req, res) => {
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
    },

    setujuiValidasiGelombang: async (req, res) => {
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
    },
};
