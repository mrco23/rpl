import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Berita
 */
export const getAllBerita = () => {
  return adminAxios.get("/berita");
};

export const getBeritaById = (id) => {
  return adminAxios.get(`/berita/${id}`);
};

export const createBerita = (formData) => {
  return adminAxios.post("/berita", formData);
};

export const updateBeritaData = (id, payload) => {
  return adminAxios.put(`/berita/${id}`, payload);
};

export const updateBeritaImage = (id, formData) => {
  return adminAxios.patch(`/berita/${id}/image`, formData);
};

export const deleteBerita = (id) => {
  return adminAxios.delete(`/berita/${id}`);
};
