import { PrismaClient } from "@prisma/client";
import exceljs from "exceljs";
import PDFDocument from "pdfkit-table";

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
  };
};

const drawKopSurat = (doc, data, title) => {
  // Posisi teks kop
  doc.fontSize(16).font("Helvetica-Bold").text(data.namaSekolah, { align: "center" });
  doc.fontSize(10).font("Helvetica").text(`Akreditasi: ${data.akreditasi}`, { align: "center" });
  doc.fontSize(10).text(`${data.alamat}`, { align: "center" });
  doc.fontSize(10).text(`Telp: ${data.telepon} | Email: ${data.email}`, { align: "center" });
  
  // Garis bawah kop
  doc.moveTo(50, 115).lineTo(550, 115).lineWidth(2).stroke();
  doc.moveTo(50, 118).lineTo(550, 118).lineWidth(1).stroke();
  
  // Judul Laporan
  doc.moveDown(3);
  doc.fontSize(14).font("Helvetica-Bold").text(title, { align: "center" });
  doc.fontSize(10).font("Helvetica").text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, { align: "center" });
  doc.moveDown(2);
};

const drawSignature = (doc, namaKepsek) => {
  doc.moveDown(3);
  doc.fontSize(10).font("Helvetica").text(`Manado, ${new Date().toLocaleDateString("id-ID")}`, 400, doc.y);
  doc.text("Kepala Sekolah,", 400, doc.y + 15);
  doc.text(namaKepsek, 400, doc.y + 70, { underline: true });
};

export const LaporanKepalaSekolahController = {
  // 1. Endpoint Data JSON
  getRekapPPDB: async (req, res) => {
    try {
      const total = await prisma.pendaftar.count();
      const lulus = await prisma.pendaftar.count({ where: { status_pendaftaran: "Lulus" } });
      const tidakLulus = await prisma.pendaftar.count({ where: { status_pendaftaran: "Tidak Lulus" } });
      const menunggu = await prisma.pendaftar.count({ where: { status_pendaftaran: "menunggu verifikasi" } });
      
      res.json({ success: true, data: { total, lulus, tidakLulus, menunggu } });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getStatusPendaftaran: async (req, res) => {
    try {
      const pendaftar = await prisma.pendaftar.groupBy({
        by: ['status_pendaftaran'],
        _count: { status_pendaftaran: true }
      });
      res.json({ success: true, data: pendaftar });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getRekapGelombang: async (req, res) => {
    try {
      const gelombang = await prisma.gelombang.findMany({
        include: { _count: { select: { pendaftar: true } } }
      });
      res.json({ success: true, data: gelombang });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAsalSekolah: async (req, res) => {
    try {
      const data = await prisma.pendaftar.groupBy({
        by: ['asal_sekolah'],
        _count: { asal_sekolah: true },
        orderBy: { _count: { asal_sekolah: 'desc' } },
        take: 10
      });
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getWilayahPendaftar: async (req, res) => {
    try {
      const data = await prisma.alamat.groupBy({
        by: ['kecamatan'],
        _count: { kecamatan: true },
        orderBy: { _count: { kecamatan: 'desc' } }
      });
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getKinerjaVerifikator: async (req, res) => {
    try {
      const data = await prisma.verifikator.findMany({
        include: { _count: { select: { pendaftar: true } } }
      });
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getFinalPenerimaan: async (req, res) => {
    try {
      const data = await prisma.pendaftar.findMany({
        where: { status_pendaftaran: "Lulus" },
        select: { nisn: true, nama_lengkap: true, asal_sekolah: true, gelombang: { select: { nama: true } } }
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
      sheet.addRow([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`]);
      sheet.addRow([]);

      sheet.addRow(["No", "NISN", "Nama", "Asal Sekolah", "Status"]);
      sheet.getRow(5).font = { bold: true };

      const pendaftar = await prisma.pendaftar.findMany();
      pendaftar.forEach((p, idx) => {
        sheet.addRow([idx + 1, p.nisn, p.nama_lengkap, p.asal_sekolah, p.status_pendaftaran]);
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
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

      drawKopSurat(doc, data, "LAPORAN REKAPITULASI PPDB");

      const pendaftar = await prisma.pendaftar.findMany();
      
      const table = {
        title: "Daftar Seluruh Pendaftar",
        headers: ["No", "NISN", "Nama Lengkap", "Status"],
        rows: pendaftar.map((p, idx) => [
          (idx + 1).toString(),
          p.nisn || "-",
          p.nama_lengkap,
          p.status_pendaftaran
        ]),
      };

      await doc.table(table, { width: 500 });
      
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
      sheet.addRow([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`]);
      sheet.addRow([]);

      sheet.addRow(["No", "NISN", "Nama", "Asal Sekolah"]);
      sheet.getRow(5).font = { bold: true };

      const pendaftar = await prisma.pendaftar.findMany({ where: { status_pendaftaran: "Lulus" } });
      pendaftar.forEach((p, idx) => {
        sheet.addRow([idx + 1, p.nisn, p.nama_lengkap, p.asal_sekolah]);
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=final-penerimaan.xlsx");

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
      res.setHeader("Content-Disposition", "attachment; filename=final-penerimaan.pdf");
      doc.pipe(res);

      drawKopSurat(doc, data, "LAPORAN FINAL PENERIMAAN SISWA BARU");

      const pendaftar = await prisma.pendaftar.findMany({ where: { status_pendaftaran: "Lulus" } });
      
      const table = {
        title: "Daftar Pendaftar Lulus",
        headers: ["No", "NISN", "Nama Lengkap", "Asal Sekolah"],
        rows: pendaftar.map((p, idx) => [
          (idx + 1).toString(),
          p.nisn || "-",
          p.nama_lengkap,
          p.asal_sekolah
        ]),
      };

      await doc.table(table, { width: 500 });
      
      drawSignature(doc, data.namaKepsek);
      doc.end();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
