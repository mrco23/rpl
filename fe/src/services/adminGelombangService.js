import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Gelombang
 */
export const getSemuaGelombang = () => {
  return adminAxios.get("/admin/gelombang");
};

export const createGelombang = (payload) => {
  return adminAxios.post("/admin/gelombang", payload);
};

export const getGelombangById = (id) => {
  return adminAxios.get(`/admin/gelombang/${id}`);
};

export const updateGelombang = (id, payload) => {
  return adminAxios.put(`/admin/gelombang/${id}`, payload);
};

export const deleteGelombang = (id) => {
  return adminAxios.delete(`/admin/gelombang/${id}`);
};
