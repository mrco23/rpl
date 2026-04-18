import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Prestasi
 */
export const getAllPrestasi = () => {
  return adminAxios.get("/prestasi");
};

export const createPrestasi = (formData) => {
  return adminAxios.post("/prestasi", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updatePrestasi = (id, formData) => {
  return adminAxios.put(`/prestasi/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePrestasi = (id) => {
  return adminAxios.delete(`/prestasi/${id}`);
};
