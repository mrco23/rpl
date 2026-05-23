import httpClient, { requestAPI } from "../../../services/httpClient.js";

/**
 * Login untuk Pendaftar.
 * Endpoint /pendaftar/login menggunakan field nisn + password.
 */
export const loginService = async (payload) => {
	const res = await requestAPI({
		method: "POST",
		url: "/pendaftar/login",
		data: payload,
	});
	return res.data;
};

/**
 * Login untuk Admin.
 * Endpoint /admin/login menghasilkan token dengan payload { id, role: 'admin' }.
 * HARUS digunakan saat login sebagai admin agar authorizeRole("admin") di backend pass.
 */
export const loginAdminService = async (payload) => {
	const res = await requestAPI({
		method: "POST",
		url: "/admin/login",
		data: payload,
	});
	return res.data;
};

/**
 * Login untuk Verifikator.
 * Endpoint /verifikator/login menghasilkan token dengan payload { id, role: 'verifikator' }.
 */
export const loginVerifikatorService = async (payload) => {
	const res = await requestAPI({
		method: "POST",
		url: "/verifikator/login",
		data: payload,
	});
	return res.data;
};
/**
 * Login untuk Kepala Sekolah.
 * Endpoint /kepala-sekolah/login menghasilkan token dengan payload { id, role: 'kepala_sekolah' }.
 */
export const loginKepalaSekolahService = async (payload) => {
	const res = await requestAPI({
		method: "POST",
		url: "/kepala-sekolah/login",
		data: payload,
	});
	return res.data;
};

/**
 * Ubah Kata Sandi untuk Pendaftar.
 * Endpoint /pendaftar/change-password menggunakan field nisn + oldPassword + newPassword.
 */
export const changePasswordService = async (payload) => {
	return await requestAPI({
		method: "POST",
		url: "/pendaftar/change-password",
		data: payload,
	});
};
