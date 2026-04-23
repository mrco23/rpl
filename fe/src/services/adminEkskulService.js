import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Ekstrakurikuler
 */
export const getAllEkstrakurikuler = () => {
  return adminAxios.get("/ekstrakurikuler");
};

export const createEkstrakurikuler = (formData) => {
  return adminAxios.post("/ekstrakurikuler", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateEkstrakurikulerData = (id, payload) => {
  return adminAxios.put(`/ekstrakurikuler/${id}`, payload);
};

export const updateEkstrakurikulerImage = (id, formData) => {
  return adminAxios.patch(`/ekstrakurikuler/${id}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEkstrakurikuler = (id) => {
  return adminAxios.delete(`/ekstrakurikuler/${id}`);
};
