import { requestAPI } from "./api.js";

/**
 * Login untuk Pendaftar (pengguna biasa)
 * Token dari endpoint ini TIDAK memiliki field role dalam payload.
 */
export const loginService = async (payload) => {
  return await requestAPI({
    method: "POST",
    url: "/login",
    data: payload,
  });
};

/**
 * Login untuk Admin.
 * Endpoint /admin/login menghasilkan token dengan payload { id, role: 'admin' }.
 * HARUS digunakan saat login sebagai admin agar authorizeRole("admin") di backend pass.
 */
export const loginAdminService = async (payload) => {
  return await requestAPI({
    method: "POST",
    url: "/admin/login",
    data: payload,
  });
};

/**
 * Login untuk Verifikator.
 * Endpoint /verifikator/login menghasilkan token dengan payload { id, role: 'verifikator' }.
 */
export const loginVerifikatorService = async (payload) => {
  return await requestAPI({
    method: "POST",
    url: "/verifikator/login",
    data: payload,
  });
};
