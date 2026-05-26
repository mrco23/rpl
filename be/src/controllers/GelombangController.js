import * as GelombangService from "../services/GelombangService.js";
import ExcelJS from "exceljs";
import prisma from "../config/prisma.js";
import { STATUS_PENDAFTARAN } from "../constants/statusPendaftaran.js";

export const getAktif = async (req, res) => {
	try {
		const gelombang = await GelombangService.getAktif();
		if (!gelombang) return res.status(404).json({ message: "Tidak ada gelombang aktif" });
		return res.status(200).json({ message: "success", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getAll = async (req, res) => {
	try {
		const gelombang = await GelombangService.getAll();
		return res.status(200).json({ message: "success", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getPublic = async (req, res) => {
	try {
		const gelombang = await GelombangService.getPublicAll();
		return res.status(200).json({ message: "success", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getById = async (req, res) => {
	try {
		const gelombang = await GelombangService.getById(req.params.id);
		if (!gelombang) return res.status(404).json({ message: "Data tidak ditemukan" });
		return res.status(200).json({ message: "success", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const create = async (req, res) => {
	try {
		const gelombang = await GelombangService.create(req.body);
		return res.status(201).json({ message: "Berhasil membuat gelombang", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const gelombang = await GelombangService.update(req.params.id, req.body);
		return res.status(200).json({ message: "Berhasil memperbarui gelombang", data: gelombang });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const remove = async (req, res) => {
	try {
		const gelombang = await GelombangService.getById(req.params.id);
		if (!gelombang) return res.status(404).json({ message: "Gelombang tidak ditemukan" });

		const now = new Date();
		const start = new Date(gelombang.tanggal_mulai);
		const end = new Date(gelombang.tanggal_selesai);
		end.setHours(23, 59, 59, 999);

		const isActive = start <= now && now <= end;
		if (isActive) {
			return res.status(403).json({ message: "Gelombang aktif tidak dapat dihapus." });
		}

		const isFuture = start > now;
		if (isFuture && gelombang.totalPendaftar > 0) {
			return res.status(403).json({ message: "Gelombang yang sudah memiliki pendaftar tidak dapat dihapus." });
		}

		const isPast = now > end;
		if (isPast && gelombang.status_validasi !== "disetujui") {
			return res.status(403).json({ message: "Gelombang selesai hanya dapat dihapus setelah laporan disetujui kepala sekolah." });
		}

		await GelombangService.remove(req.params.id);
		return res.status(200).json({ message: "Data berhasil dihapus" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const ajukanValidasi = async (req, res) => {
	try {
		const gelombang = await GelombangService.ajukanValidasi(req.params.id);
		return res.status(200).json({ message: "Laporan gelombang berhasil diajukan ke kepala sekolah", data: gelombang });
	} catch (error) {
		if (error.message.includes("Gelombang tidak ditemukan")) return res.status(404).json({ message: error.message });
		return res.status(400).json({ message: error.message });
	}
};

export const exportExcel = async (req, res) => {
	try {
		const id = Number(req.params.id);
		const gelombang = await prisma.gelombang.findUnique({
			where: { id_gelombang: id },
		});

		if (!gelombang) {
			return res.status(404).json({ message: "Gelombang tidak ditemukan" });
		}

		const pendaftarList = await prisma.pendaftar.findMany({
			where: { id_gelombang: id },
			include: { alamat: true },
		});

		// Filter data
		const totalPendaftar = pendaftarList.length;

		const listLulus = pendaftarList.filter((p) => {
			return p.status_pendaftaran === STATUS_PENDAFTARAN.LULUS;
		});

		const listTidakLolos = pendaftarList.filter((p) => {
			return p.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS;
		});

		const totalDiterima = listLulus.length;
		const rasioKelulusan =
			totalPendaftar > 0 ? ((totalDiterima / totalPendaftar) * 100).toFixed(2) + "%" : "0%";
		const sisaKuota = Math.max(0, gelombang.kuota - totalDiterima);

		const workbook = new ExcelJS.Workbook();
		workbook.creator = "PPDB System";

		// Sheet 1: Ringkasan
		const sheetRingkasan = workbook.addWorksheet("Ringkasan");
		sheetRingkasan.columns = [
			{ header: "Metrik", key: "metrik", width: 30 },
			{ header: "Nilai", key: "nilai", width: 20 },
		];

		sheetRingkasan.addRow({ metrik: "Nama Gelombang", nilai: gelombang.nama });
		sheetRingkasan.addRow({ metrik: "Kuota Total", nilai: gelombang.kuota });
		sheetRingkasan.addRow({ metrik: "Total Pendaftar", nilai: totalPendaftar });
		sheetRingkasan.addRow({ metrik: "Total Diterima", nilai: totalDiterima });
		sheetRingkasan.addRow({ metrik: "Rasio Kelulusan", nilai: rasioKelulusan });
		sheetRingkasan.addRow({ metrik: "Sisa Kuota", nilai: sisaKuota });
		sheetRingkasan.addRow({ metrik: "Status Validasi", nilai: gelombang.status_validasi || "belum_diajukan" });
		sheetRingkasan.addRow({ metrik: "Tanggal Validasi", nilai: gelombang.tanggal_validasi ? new Date(gelombang.tanggal_validasi).toLocaleDateString("id-ID") : "-" });

		// Styling Header Ringkasan
		sheetRingkasan.getRow(1).font = { bold: true };
		sheetRingkasan.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFD3D3D3" },
		};

		const columnsPendaftar = [
			{ header: "No", key: "no", width: 5 },
			{ header: "NISN", key: "nisn", width: 15 },
			{ header: "Nama Lengkap", key: "nama_lengkap", width: 30 },
			{ header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
			{ header: "Asal Sekolah", key: "asal_sekolah", width: 25 },
			{ header: "No HP", key: "no_hp", width: 15 },
			{ header: "Status", key: "status_pendaftaran", width: 20 },
		];

		// Sheet 2: Diterima
		const sheetDiterima = workbook.addWorksheet("Lulus");
		sheetDiterima.columns = columnsPendaftar;
		listLulus.forEach((p, index) => {
			sheetDiterima.addRow({
				no: index + 1,
				nisn: p.nisn || "-",
				nama_lengkap: p.nama_lengkap,
				jenis_kelamin: p.jenis_kelamin,
				asal_sekolah: p.asal_sekolah,
				no_hp: p.no_hp,
				status_pendaftaran: p.status_pendaftaran,
			});
		});
		sheetDiterima.getRow(1).font = { bold: true };
		sheetDiterima.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FF90EE90" },
		}; // Light green

		// Sheet 3: Tidak Lolos
		const sheetTidakLolos = workbook.addWorksheet("Tidak Lulus");
		sheetTidakLolos.columns = columnsPendaftar;
		listTidakLolos.forEach((p, index) => {
			sheetTidakLolos.addRow({
				no: index + 1,
				nisn: p.nisn || "-",
				nama_lengkap: p.nama_lengkap,
				jenis_kelamin: p.jenis_kelamin,
				asal_sekolah: p.asal_sekolah,
				no_hp: p.no_hp,
				status_pendaftaran: p.status_pendaftaran,
			});
		});
		sheetTidakLolos.getRow(1).font = { bold: true };
		sheetTidakLolos.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFFB6C1" },
		}; // Light pink

		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);
		res.setHeader("Content-Disposition", `attachment; filename=Export_Gelombang_${id}.xlsx`);

		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error("Export Excel Error:", error);
		res.status(500).json({ message: "Gagal mengekspor data Excel" });
	}
};
