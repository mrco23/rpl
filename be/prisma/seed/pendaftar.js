import { STATUS_PENDAFTARAN } from "../../src/constants/statusPendaftaran.js";

const dokumenDummyUrl = {
    ijazah: "https://res.cloudinary.com/degcavmhp/image/upload/v1777905195/dokumen/zlqnl5wabncrict3xycm.jpg",
    akteKelahiran:
        "https://res.cloudinary.com/degcavmhp/image/upload/v1777904727/dokumen/ikuwcjdtegjt1rwkextv.jpg",
    pasFotoLakiLaki:
        "https://res.cloudinary.com/degcavmhp/image/upload/v1777906218/dokumen/xbkilksfz3g2nk3g9wou.jpg",
    pasFotoPerempuan:
        "https://res.cloudinary.com/degcavmhp/image/upload/v1777907048/dokumen/t6cv9usxbwzgo6ehajrh.jpg",
    kartuKeluarga:
        "https://res.cloudinary.com/degcavmhp/image/upload/v1778030052/dokumen/e2rq5ytg2exkoyuwqmwc.jpg",
};

const alamatManadoData = [
    { kecamatan: "Wanea", kelurahan: "Karombasan Utara", kode_pos: "95117" },
    { kecamatan: "Wanea", kelurahan: "Tingkulu", kode_pos: "95119" },
    { kecamatan: "Malalayang", kelurahan: "Bahu", kode_pos: "95115" },
    { kecamatan: "Malalayang", kelurahan: "Kleak", kode_pos: "95115" },
    { kecamatan: "Sario", kelurahan: "Titiwungen Selatan", kode_pos: "95113" },
    { kecamatan: "Sario", kelurahan: "Sario Utara", kode_pos: "95114" },
    { kecamatan: "Wenang", kelurahan: "Mahakeret Timur", kode_pos: "95123" },
    { kecamatan: "Tikala", kelurahan: "Tikala Baru", kode_pos: "95124" },
    { kecamatan: "Paal Dua", kelurahan: "Dendengan Dalam", kode_pos: "95127" },
    { kecamatan: "Mapanget", kelurahan: "Paniki Bawah", kode_pos: "95256" },
    { kecamatan: "Tuminting", kelurahan: "Tumumpa Dua", kode_pos: "95239" },
    { kecamatan: "Singkil", kelurahan: "Kombos Barat", kode_pos: "95234" },
];

const asalSekolahManado = [
    "SD Katolik St. Theresia Manado",
    "SD Katolik 01 St. Antonius Manado",
    "SD Katolik 03 Don Bosco Manado",
    "SD Katolik St. Clara Manado",
    "SD Negeri 06 Manado",
    "SD Negeri 11 Manado",
    "SD Negeri 30 Manado",
    "SD Negeri 54 Manado",
    "SD Inpres Malalayang Manado",
    "SD Inpres Paal Dua Manado",
    "SD GMIM 20 Manado",
    "SD Kristen Eben Haezar Manado",
];

const namaDepanLakiLaki = [
    "Aldo",
    "Benediktus",
    "Carlo",
    "Dion",
    "Evan",
    "Fabian",
    "Gabriel",
    "Jonathan",
    "Kevin",
    "Leonardo",
];

const namaDepanPerempuan = [
    "Agatha",
    "Beatrice",
    "Celine",
    "Debora",
    "Evelyn",
    "Felicia",
    "Gabriella",
    "Ivana",
    "Jessica",
    "Nathania",
];

const namaTengah = [
    "Rafael",
    "Christo",
    "Anugerah",
    "Emanuel",
    "Putra",
    "Putri",
    "Gracia",
    "Michael",
    "Angel",
    "Blessing",
];

const namaBelakang = [
    "Sondakh",
    "Wowor",
    "Pangemanan",
    "Lumowa",
    "Manampiring",
    "Runtuwene",
    "Tumbelaka",
    "Kairupan",
    "Mandagi",
    "Wael",
];

const namaWaliDummy = [
    "Andre Sondakh",
    "Merry Wowor",
    "Daniel Pangemanan",
    "Claudia Lumowa",
    "Johan Manampiring",
    "Yuliana Runtuwene",
    "Frans Tumbelaka",
    "Monica Kairupan",
    "Stefan Mandagi",
    "Lidia Polii",
];

function nomorUrut(value, length) {
    return String(value).padStart(length, "0");
}

function tanggalUtc(tahun, bulan, tanggal, jam = 0, menit = 0) {
    return new Date(Date.UTC(tahun, bulan - 1, tanggal, jam, menit, 0));
}

function tanggalLahirDummy(index) {
    const tahun = 2012 + (index % 2);
    const bulan = (index % 12) + 1;
    const tanggal = (index % 27) + 1;
    return tanggalUtc(tahun, bulan, tanggal);
}

function tanggalDaftarGelombang1(index) {
    return new Date(
        Date.UTC(2026, 3, 1 + (index % 28), 8 + (index % 7), (index * 5) % 60, 0),
    );
}

function tanggalDaftarGelombang2(index) {
    return new Date(
        Date.UTC(2026, 5, 1 + (index % 9), 8 + (index % 8), (index * 7) % 60, 0),
    );
}

function buatAlamatDummy(index) {
    const alamat = alamatManadoData[index % alamatManadoData.length];
    return {
        provinsi: "Sulawesi Utara",
        kota_kabupaten: "Kota Manado",
        kecamatan: alamat.kecamatan,
        kelurahan: alamat.kelurahan,
        rt_rw: `RT ${nomorUrut((index % 9) + 1, 3)} / RW ${nomorUrut((index % 6) + 1, 3)}`,
        kode_pos: alamat.kode_pos,
    };
}

function buatDokumenDummy(jenisKelamin, idVerifikator = null) {
    return [
        {
            nama_dokumen: "Ijazah",
            jenis_dokumen: dokumenDummyUrl.ijazah,
            id_verifikator: idVerifikator,
        },
        {
            nama_dokumen: "Foto Copy Akte Kelahiran",
            jenis_dokumen: dokumenDummyUrl.akteKelahiran,
            id_verifikator: idVerifikator,
        },
        {
            nama_dokumen: "Pas Foto",
            jenis_dokumen:
                jenisKelamin === "L"
                    ? dokumenDummyUrl.pasFotoLakiLaki
                    : dokumenDummyUrl.pasFotoPerempuan,
            id_verifikator: idVerifikator,
        },
        {
            nama_dokumen: "Foto Copy Kartu Keluarga",
            jenis_dokumen: dokumenDummyUrl.kartuKeluarga,
            id_verifikator: idVerifikator,
        },
    ];
}

function buatCatatanDokumen(statusPendaftaran) {
    if (statusPendaftaran === STATUS_PENDAFTARAN.LULUS)
        return "Dokumen lengkap dan memenuhi kriteria seleksi.";
    if (statusPendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS)
        return "Belum memenuhi kriteria seleksi pada Gelombang 1.";
    return null;
}

function sudahDiverifikasi(statusPendaftaran) {
    return [STATUS_PENDAFTARAN.LULUS, STATUS_PENDAFTARAN.TIDAK_LULUS].includes(
        statusPendaftaran,
    );
}

function buatPendaftarDummy({
    nomorGelombang,
    urutan,
    indexGlobal,
    statusPendaftaran,
    idGelombang,
    idVerifikator,
    password,
    tanggalDaftar,
}) {
    const jenisKelamin = indexGlobal % 2 === 0 ? "L" : "P";
    const namaDepan = jenisKelamin === "L" ? namaDepanLakiLaki : namaDepanPerempuan;
    const namaLengkap = `${namaDepan[indexGlobal % namaDepan.length]} ${namaTengah[(indexGlobal + urutan) % namaTengah.length]} ${namaBelakang[(indexGlobal * 3) % namaBelakang.length]}`;
    const nisn = `20260${nomorGelombang}${nomorUrut(urutan, 4)}`;
    const idVerifikatorTerpilih = sudahDiverifikasi(statusPendaftaran)
        ? idVerifikator
        : null;

    return {
        nama_lengkap: namaLengkap,
        kata_sandi: password,
        nisn,
        tempat_lahir: "Manado",
        tanggal_lahir: tanggalLahirDummy(indexGlobal),
        jenis_kelamin: jenisKelamin,
        no_hp: `085256${nomorUrut(930000 + indexGlobal, 6)}`,
        asal_sekolah: asalSekolahManado[indexGlobal % asalSekolahManado.length],
        email: `pendaftar.g${nomorGelombang}.${nomorUrut(urutan, 3)}@dummy.santarafael.test`,
        nama_wali: namaWaliDummy[indexGlobal % namaWaliDummy.length],
        status_pendaftaran: statusPendaftaran,
        catatan_dokumen: buatCatatanDokumen(statusPendaftaran),
        tanggal_daftar: tanggalDaftar,
        id_gelombang: idGelombang,
        id_verifikator: idVerifikatorTerpilih,
        alamat: { create: buatAlamatDummy(indexGlobal) },
        dokumen: { create: buatDokumenDummy(jenisKelamin, idVerifikatorTerpilih) },
    };
}

async function buatPendaftarGelombang(
    prisma,
    {
        nomorGelombang,
        jumlah,
        statusPendaftaran,
        statusPendaftaranResolver,
        idGelombang,
        idVerifikator,
        password,
        offsetIndex,
        buatTanggalDaftar,
    },
) {
    const pendaftarDibuat = [];
    for (let i = 1; i <= jumlah; i++) {
        const indexGlobal = offsetIndex + i;
        const statusFinal = statusPendaftaranResolver
            ? statusPendaftaranResolver(i)
            : statusPendaftaran;

        const pendaftar = await prisma.pendaftar.create({
            data: buatPendaftarDummy({
                nomorGelombang,
                urutan: i,
                indexGlobal,
                statusPendaftaran: statusFinal,
                idGelombang,
                idVerifikator,
                password,
                tanggalDaftar: buatTanggalDaftar(i - 1),
            }),
        });
        pendaftarDibuat.push(pendaftar);
    }
    return pendaftarDibuat;
}

async function buatPengumumanUntukPendaftar(
    prisma,
    { judul_pengumuman, deksripsi, tanggal_dibuat, idAdmin, pendaftar },
) {
    const pengumuman = await prisma.pengumuman.create({
        data: {
            judul_pengumuman,
            deksripsi,
            tanggal_dibuat,
            id_admin: idAdmin,
            pengumuman_pendaftar: {
                create: pendaftar.map((item) => ({
                    pendaftar: { connect: { id_pendaftar: item.id_pendaftar } },
                })),
            },
        },
        include: { pengumuman_pendaftar: true },
    });

    console.log(
        `✅ Pengumuman "${pengumuman.judul_pengumuman}" dibuat untuk ${pengumuman.pengumuman_pendaftar.length} pendaftar`,
    );
    return pengumuman;
}

export async function seedPendaftar(
    prisma,
    bcrypt,
    idAdmin,
    verifikator,
    verifikatorAngie,
) {
    const hashedPendaftarPass = await bcrypt.hash("Maltrian123!", 10);
    const namaGelombangDummy = ["Gelombang 1", "Gelombang 2"];

    const gelombangDummyLama = await prisma.gelombang.findMany({
        where: { nama: { in: namaGelombangDummy } },
        select: { id_gelombang: true },
    });
    const idGelombangDummyLama = gelombangDummyLama.map((item) => item.id_gelombang);

    await prisma.pendaftar.deleteMany({
        where: {
            OR: [
                ...(idGelombangDummyLama.length > 0
                    ? [{ id_gelombang: { in: idGelombangDummyLama } }]
                    : []),
                { nisn: { startsWith: "202601" } },
                { nisn: { startsWith: "202602" } },
                { nisn: "24013058" },
                { email: { endsWith: "@dummy.santarafael.test" } },
            ],
        },
    });

    await prisma.gelombang.deleteMany({
        where: { nama: { in: namaGelombangDummy } },
    });

    const gelombang1 = await prisma.gelombang.create({
        data: {
            nama: "Gelombang 1",
            tanggal_mulai: tanggalUtc(2026, 4, 1),
            tanggal_selesai: tanggalUtc(2026, 5, 1, 23, 59),
            kuota: 68,
            status_validasi: "menunggu_validasi",
        },
    });

    const gelombang2 = await prisma.gelombang.create({
        data: {
            nama: "Gelombang 2",
            tanggal_mulai: tanggalUtc(2026, 6, 1),
            tanggal_selesai: tanggalUtc(2026, 7, 1, 23, 59),
            kuota: 68,
        },
    });

    const pendaftarGelombang1 = await buatPendaftarGelombang(prisma, {
        nomorGelombang: 1,
        jumlah: 70,
        statusPendaftaranResolver: (urutan) =>
            urutan <= 68 ? STATUS_PENDAFTARAN.LULUS : STATUS_PENDAFTARAN.TIDAK_LULUS,
        idGelombang: gelombang1.id_gelombang,
        idVerifikator: verifikator.id_verifikator,
        password: hashedPendaftarPass,
        offsetIndex: 0,
        buatTanggalDaftar: tanggalDaftarGelombang1,
    });

    const pendaftarGelombang2 = await buatPendaftarGelombang(prisma, {
        nomorGelombang: 2,
        jumlah: 50,
        statusPendaftaranResolver: (urutan) =>
            urutan <= 15
                ? STATUS_PENDAFTARAN.MENUNGGU_VERIFIKASI
                : STATUS_PENDAFTARAN.TERVERIFIKASI,
        idGelombang: gelombang2.id_gelombang,
        idVerifikator: verifikatorAngie.id_verifikator,
        password: hashedPendaftarPass,
        offsetIndex: 100,
        buatTanggalDaftar: tanggalDaftarGelombang2,
    });

    const pendaftarGelombang1Lulus = pendaftarGelombang1.filter(
        (item) => item.status_pendaftaran === STATUS_PENDAFTARAN.LULUS,
    );
    const pendaftarGelombang1TidakLulus = pendaftarGelombang1.filter(
        (item) => item.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS,
    );

    await prisma.pengumuman.deleteMany({
        where: { id_admin: idAdmin },
    });
    console.log("✅ Pengumuman lama admin dihapus");

    await buatPengumumanUntukPendaftar(prisma, {
        judul_pengumuman: "Jadwal Wawancara Orang Tua Gelombang 1",
        deksripsi:
            "Yth. orang tua/wali pendaftar Gelombang 1. Wawancara orang tua akan dilaksanakan pada Senin, 4 Mei 2026 pukul 08.00 WITA di SMP Katolik Santu Rafael Manado. Orang tua/wali wajib membawa kartu keluarga, akte kelahiran, dan bukti pendaftaran.",
        tanggal_dibuat: tanggalUtc(2026, 5, 4, 8, 0),
        idAdmin: idAdmin,
        pendaftar: pendaftarGelombang1,
    });

    await buatPengumumanUntukPendaftar(prisma, {
        judul_pengumuman: "Jadwal Daftar Ulang Gelombang 1",
        deksripsi:
            "Selamat kepada pendaftar Gelombang 1 yang dinyatakan lulus. Daftar ulang dilaksanakan pada Selasa, 5 Mei 2026 sampai Jumat, 8 Mei 2026 pukul 08.00-13.00 WITA di ruang tata usaha SMP Katolik Santu Rafael Manado. Pendaftar wajib membawa dokumen asli dan bukti kelulusan.",
        tanggal_dibuat: tanggalUtc(2026, 5, 5, 8, 0),
        idAdmin: idAdmin,
        pendaftar: pendaftarGelombang1Lulus,
    });

    await buatPengumumanUntukPendaftar(prisma, {
        judul_pengumuman: "Hasil Seleksi Gelombang 1 Belum Lulus",
        deksripsi:
            "Terima kasih kepada pendaftar Gelombang 1 yang telah mengikuti seluruh proses seleksi. Berdasarkan hasil verifikasi dan seleksi, beberapa pendaftar belum dinyatakan lulus pada Gelombang 1. Pendaftar dapat menghubungi panitia PPDB untuk informasi lebih lanjut.",
        tanggal_dibuat: tanggalUtc(2026, 5, 5, 9, 0),
        idAdmin: idAdmin,
        pendaftar: pendaftarGelombang1TidakLulus,
    });

    const totalPengumuman = await prisma.pengumuman.count({
        where: { id_admin: idAdmin },
    });

    const daftarPengumuman = await prisma.pengumuman.findMany({
        where: { id_admin: idAdmin },
        select: {
            id_pengumuman: true,
            judul_pengumuman: true,
            tanggal_dibuat: true,
            _count: { select: { pengumuman_pendaftar: true } },
        },
        orderBy: { tanggal_dibuat: "desc" },
    });

    console.log(`✅ Total pengumuman admin di database: ${totalPengumuman}`);
    console.table(daftarPengumuman);

    console.log("✅ Gelombang 1 dibuat: kuota 68, pendaftar 70, lulus 68, tidak lulus 2");
    console.log(
        "✅ Gelombang 2 dibuat: kuota 68, pendaftar 50, status menunggu verifikasi",
    );
    console.log(
        `✅ ${pendaftarGelombang1.length + pendaftarGelombang2.length} Alamat dan ${(pendaftarGelombang1.length + pendaftarGelombang2.length) * 4} Dokumen pendaftar dibuat`,
    );
    console.log("✅ 3 Pengumuman gelombang dibuat dan dikirim ke pendaftar yang sesuai");
}
