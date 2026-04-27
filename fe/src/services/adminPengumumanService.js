import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas PendaftarPengumumanPage
 */
export const getAllPengumuman = () => {
  return adminAxios.get("/pengumuman");
};

export const createPengumuman = (payload) => {
  return adminAxios.post("/pengumuman", payload);
};

export const updatePengumuman = (id, payload) => {
  return adminAxios.put(`/pengumuman/${id}`, payload);
};

export const deletePengumuman = (id) => {
  return adminAxios.delete(`/pengumuman/${id}`);
};
