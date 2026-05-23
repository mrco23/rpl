import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Program Unggulan
 */
export const getAllProgramUnggulan = () => {
  return httpClient.get("/program-unggulan");
};

export const createProgramUnggulan = (formData) => {
  return httpClient.post("/program-unggulan", formData);
};

export const updateProgramUnggulan = (id, formData) => {
  return httpClient.put(`/program-unggulan/${id}`, formData);
};

export const deleteProgramUnggulan = (id) => {
  return httpClient.delete(`/program-unggulan/${id}`);
};
