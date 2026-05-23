import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Prestasi
 */
export const getAllPrestasi = () => {
  return httpClient.get("/prestasi");
};

export const createPrestasi = (formData) => {
  return httpClient.post("/prestasi", formData);
};

export const updatePrestasi = (id, formData) => {
  return httpClient.put(`/prestasi/${id}`, formData);
};

export const deletePrestasi = (id) => {
  return httpClient.delete(`/prestasi/${id}`);
};
