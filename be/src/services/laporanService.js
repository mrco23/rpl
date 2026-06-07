import { PrismaClient } from "@prisma/client";
import { STATUS_PENDAFTARAN } from "../constants/statusPendaftaran.js";

const prisma = new PrismaClient();

// ─── KOP DATA ────────────────────────────────────────────────────────────────

/**
 * Mengambil data KOP surat dari database.
 * Semua field memiliki fallback aman jika kosong.
 */
export const getKopSuratData = async () => {
    const profil = await prisma.profil.findFirst();
    const kontak = await prisma.kontak.findFirst();

    return {
        namaSekolah: profil?.nama_sekolah || "SMP KATOLIK ST. RAFAEL MANADO",
        akreditasi: profil?.akreditasi || "B",
        alamat: "Jl. Rike, Wanea, Manado, Sulawesi Utara",
        telepon: kontak?.no_telpon || "0431-XXXXXX",
        email: kontak?.email || "info@st-rafael.sch.id",
        namaKepsek: profil?.nama_kepala_sekolah || "Kepala Sekolah",
    };
};

// ─── REKAPITULASI ─────────────────────────────────────────────────────────────

/**
 * Mengambil dan mengagregasi seluruh data rekapitulasi PPDB untuk satu gelombang.
 * @param {number} idGelombang
 * @returns {object} Data agregat lengkap
 * @throws {Error} Jika gelombang tidak ditemukan (error.code = 'GELOMBANG_NOT_FOUND')
 */
export const getRekapitulasiData = async (idGelombang) => {
    const gelombang = await prisma.gelombang.findUnique({
        where: { id_gelombang: Number(idGelombang) },
    });

    if (!gelombang) {
        const err = new Error(`Gelombang dengan id ${idGelombang} tidak ditemukan.`);
        err.code = "GELOMBANG_NOT_FOUND";
        throw err;
    }

    // Ambil semua pendaftar gelombang ini (hanya field yang dibutuhkan)
    const pendaftar = await prisma.pendaftar.findMany({
        where: { id_gelombang: Number(idGelombang) },
        select: {
            status_pendaftaran: true,
            asal_sekolah: true,
        },
    });

    const jumlahPendaftar = pendaftar.length;
    const kuota = gelombang.kuota || 0;

    // ── Hitung per status ──────────────────────────────────────────────────
    const semuaStatus = [
        STATUS_PENDAFTARAN.MENUNGGU_VERIFIKASI,
        STATUS_PENDAFTARAN.PERLU_PERBAIKAN,
        STATUS_PENDAFTARAN.TERVERIFIKASI,
        STATUS_PENDAFTARAN.WAWANCARA_ORANG_TUA,
        STATUS_PENDAFTARAN.LULUS,
        STATUS_PENDAFTARAN.TIDAK_LULUS,
    ];

    const distribusiStatus = semuaStatus.map((status) => {
        const jumlah = pendaftar.filter((p) => p.status_pendaftaran === status).length;
        return { status, jumlah };
    });

    const jumlahLulus = pendaftar.filter(
        (p) => p.status_pendaftaran === STATUS_PENDAFTARAN.LULUS,
    ).length;
    const jumlahTidakLulus = pendaftar.filter(
        (p) => p.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS,
    ).length;
    const jumlahBelumFinal = jumlahPendaftar - jumlahLulus - jumlahTidakLulus;

    const sisaKuota = Math.max(kuota - jumlahPendaftar, 0);
    const tingkatKeterisian = kuota > 0 ? (jumlahPendaftar / kuota) * 100 : 0;
    const persenLulusTotal =
        jumlahPendaftar > 0 ? (jumlahLulus / jumlahPendaftar) * 100 : 0;
    const persenLulusFinal =
        jumlahLulus + jumlahTidakLulus > 0
            ? (jumlahLulus / (jumlahLulus + jumlahTidakLulus)) * 100
            : 0;

    // ── Rekapitulasi per asal sekolah ──────────────────────────────────────
    const asalSekolahMap = new Map();

    for (const p of pendaftar) {
        // Normalisasi: trim + collapse spasi ganda
        const raw = (p.asal_sekolah || "").trim().replace(/\s+/g, " ");
        const key = raw === "" ? "Belum Diisi" : raw.toLowerCase(); // key case-insensitive
        const displayName = raw === "" ? "Belum Diisi" : raw;

        if (!asalSekolahMap.has(key)) {
            asalSekolahMap.set(key, {
                nama: displayName,
                jumlahPendaftar: 0,
                jumlahLulus: 0,
                jumlahTidakLulus: 0,
            });
        }

        const entry = asalSekolahMap.get(key);
        entry.jumlahPendaftar += 1;
        if (p.status_pendaftaran === STATUS_PENDAFTARAN.LULUS) entry.jumlahLulus += 1;
        if (p.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS)
            entry.jumlahTidakLulus += 1;
    }

    const rekapAsalSekolah = Array.from(asalSekolahMap.values())
        .map((s) => ({
            ...s,
            belumFinal: s.jumlahPendaftar - s.jumlahLulus - s.jumlahTidakLulus,
            persenLulus:
                s.jumlahPendaftar > 0 ? (s.jumlahLulus / s.jumlahPendaftar) * 100 : 0,
        }))
        .sort((a, b) => b.jumlahPendaftar - a.jumlahPendaftar);

    const asalTerbanyak =
        rekapAsalSekolah.length > 0 ? rekapAsalSekolah[0] : null;

    return {
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
    };
};

// ─── FINAL PENERIMAAN ──────────────────────────────────────────────────────────

/**
 * Mengambil daftar pendaftar lulus pada gelombang tertentu.
 * @param {number} idGelombang
 * @returns {{ gelombang: object, pendaftar: object[] }}
 * @throws {Error} Jika gelombang tidak ditemukan (error.code = 'GELOMBANG_NOT_FOUND')
 */
export const getFinalPenerimaanData = async (idGelombang) => {
    const gelombang = await prisma.gelombang.findUnique({
        where: { id_gelombang: Number(idGelombang) },
    });

    if (!gelombang) {
        const err = new Error(`Gelombang dengan id ${idGelombang} tidak ditemukan.`);
        err.code = "GELOMBANG_NOT_FOUND";
        throw err;
    }

    const pendaftar = await prisma.pendaftar.findMany({
        where: {
            id_gelombang: Number(idGelombang),
            status_pendaftaran: STATUS_PENDAFTARAN.LULUS,
        },
        select: {
            id_pendaftar: true,
            nisn: true,
            nama_lengkap: true,
            asal_sekolah: true,
            status_pendaftaran: true,
        },
        orderBy: { nama_lengkap: "asc" },
    });

    return { gelombang, pendaftar };
};
