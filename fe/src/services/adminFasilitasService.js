import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Fasilitas
 */
export const getAllFasilitas = () => {
  return adminAxios.get("/fasilitas");
};

export const createFasilitas = (formData) => {
  return adminAxios.post("/fasilitas", formData);
};

export const updateFasilitasData = (id, payload) => {
  return adminAxios.put(`/fasilitas/${id}`, payload);
};

export const updateFasilitasImage = (id, formData) => {
  return adminAxios.patch(`/fasilitas/${id}/image`, formData);
};

export const deleteFasilitas = (id) => {
  return adminAxios.delete(`/fasilitas/${id}`);
};
