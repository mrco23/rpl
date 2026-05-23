import httpClient, { requestAPI } from "./httpClient.js";

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

/**
 * Mengirim permintaan reset password ke email.
 */
export const forgotPassword = async (email) => {
	return await requestAPI({
		method: "POST",
		url: "/pendaftar/forgot-password",
		data: { email },
	});
};

/**
 * Memvalidasi token reset password.
 */
export const validateResetToken = async (token) => {
	return await requestAPI({
		method: "GET",
		url: `/pendaftar/validate-token/${token}`,
	});
};

/**
 * Melakukan reset password dengan token.
 */
export const resetPassword = async (data) => {
	return await requestAPI({
		method: "POST",
		url: "/pendaftar/reset-password",
		data,
	});
};
