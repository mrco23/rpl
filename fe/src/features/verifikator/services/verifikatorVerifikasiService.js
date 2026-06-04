import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk kebutuhan Verifikator dalam proses verifikasi dokumen pendaftar
 */

// Mengambil semua pendaftar yang perlu diverifikasi (status: menunggu, unggah ulang, perlu perbaikan)
export const getPendaftarVerifikasiList = () => {
	return httpClient.get("/verifikator/pendaftar");
};

// Mengambil pendaftar yang sedang diperiksa oleh verifikator yang sedang login
export const getMyAssignedPendaftar = () => {
	return httpClient.get("/verifikator/pendaftar/assigned");
};

// Mengambil alih (assign) pendaftar untuk diperiksa
export const assignPendaftar = (id) => {
	return httpClient.post(`/verifikator/pendaftar/${id}/assign`);
};

// Melakukan verifikasi final (update status & catatan)
export const verifyPendaftar = (id, payload) => {
	return httpClient.post(`/verifikator/pendaftar/${id}/verify`, payload);
};

export const cancelVerifikasi = (id) => {
	return httpClient.post(`/verifikator/pendaftar/${id}/cancel`);
};
