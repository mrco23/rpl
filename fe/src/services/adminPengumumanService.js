import httpClient from "./httpClient.js";

/**
 * Service untuk entitas PendaftarPengumumanPage
 */
export const getAllPengumuman = () => {
  return httpClient.get("/pengumuman");
};

export const createPengumuman = (payload) => {
  return httpClient.post("/pengumuman", payload);
};

export const updatePengumuman = (id, payload) => {
  return httpClient.put(`/pengumuman/${id}`, payload);
};

export const deletePengumuman = (id) => {
  return httpClient.delete(`/pengumuman/${id}`);
};
