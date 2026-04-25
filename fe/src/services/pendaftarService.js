import { requestAPI } from "./api.js";

/**
 * Mengambil data profil pendaftar yang sedang login.
 */
export const getPendaftarMe = async () => {
	return await requestAPI({
		method: "GET",
		url: "/pendaftar/me",
	});
};

export const getPendaftarStatus = async () => {
	return await requestAPI({
		method: "GET",
		url: "/pendaftar/status",
	});
};
