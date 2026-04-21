import adminAxios from "./adminAxios.js";

/**
 * Service untuk Pendaftar (bisa diakses admin atau verifikator)
 */
export const getAllPendaftar = () => {
  return adminAxios.get("/pendaftar");
};
