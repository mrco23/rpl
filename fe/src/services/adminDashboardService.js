import adminAxios from "./adminAxios.js";

/**
 * Service untuk Dashboard Beranda Admin
 */
export const getAdminBeranda = () => {
  return adminAxios.get("/admin/beranda");
};
