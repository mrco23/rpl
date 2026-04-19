import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Fasilitas
 */
export const getAllFasilitas = () => {
  return adminAxios.get("/fasilitas");
};

export const createFasilitas = (formData) => {
  return adminAxios.post("/fasilitas", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateFasilitasData = (id, payload) => {
  return adminAxios.put(`/fasilitas/${id}`, payload);
};

export const updateFasilitasImage = (id, formData) => {
  return adminAxios.patch(`/fasilitas/${id}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteFasilitas = (id) => {
  return adminAxios.delete(`/fasilitas/${id}`);
};
