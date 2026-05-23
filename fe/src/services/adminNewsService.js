import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Berita
 */
export const getAllBerita = () => {
  return httpClient.get("/berita");
};

export const getBeritaById = (id) => {
  return httpClient.get(`/berita/${id}`);
};

export const createBerita = (formData) => {
  return httpClient.post("/berita", formData);
};

export const updateBeritaData = (id, payload) => {
  return httpClient.put(`/berita/${id}`, payload);
};

export const updateBeritaImage = (id, formData) => {
  return httpClient.patch(`/berita/${id}/image`, formData);
};

export const deleteBerita = (id) => {
  return httpClient.delete(`/berita/${id}`);
};
