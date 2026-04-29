import adminAxios from "./adminAxios.js";

/**
 * Service untuk kebutuhan Verifikator dalam proses verifikasi dokumen pendaftar
 */

// Mengambil semua pendaftar yang perlu diverifikasi (status: menunggu, unggah ulang, perlu perbaikan)
export const getPendaftarVerifikasiList = () => {
	return adminAxios.get("/verifikator/pendaftar");
};

// Mengambil pendaftar yang sedang diperiksa oleh verifikator yang sedang login
export const getMyAssignedPendaftar = () => {
	return adminAxios.get("/verifikator/pendaftar/assigned");
};

// Mengambil alih (assign) pendaftar untuk diperiksa
export const assignPendaftar = (id) => {
	return adminAxios.post(`/verifikator/pendaftar/${id}/assign`);
};

// Melakukan verifikasi final (update status & catatan)
export const verifyPendaftar = (id, payload) => {
	return adminAxios.post(`/verifikator/pendaftar/${id}/verify`, payload);
};

export const cancelVerifikasi = (id) => {
	return adminAxios.post(`/verifikator/pendaftar/${id}/cancel`);
};
