import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk Dashboard Beranda Admin
 */
export const getAdminBeranda = () => {
  return httpClient.get("/admin/beranda");
};
