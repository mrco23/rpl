import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Fasilitas
 */
export const getAllFasilitas = () => {
  return httpClient.get("/fasilitas");
};

export const createFasilitas = (formData) => {
  return httpClient.post("/fasilitas", formData);
};

export const updateFasilitasData = (id, payload) => {
  return httpClient.put(`/fasilitas/${id}`, payload);
};

export const updateFasilitasImage = (id, formData) => {
  return httpClient.patch(`/fasilitas/${id}/image`, formData);
};

export const deleteFasilitas = (id) => {
  return httpClient.delete(`/fasilitas/${id}`);
};
