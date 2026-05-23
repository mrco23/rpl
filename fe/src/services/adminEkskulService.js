import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Ekstrakurikuler
 */
export const getAllEkstrakurikuler = () => {
  return httpClient.get("/ekstrakurikuler");
};

export const createEkstrakurikuler = (formData) => {
  return httpClient.post("/ekstrakurikuler", formData);
};

export const updateEkstrakurikulerData = (id, payload) => {
  return httpClient.put(`/ekstrakurikuler/${id}`, payload);
};

export const updateEkstrakurikulerImage = (id, formData) => {
  return httpClient.patch(`/ekstrakurikuler/${id}/image`, formData);
};

export const deleteEkstrakurikuler = (id) => {
  return httpClient.delete(`/ekstrakurikuler/${id}`);
};
