import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Program Unggulan
 */
export const getAllProgramUnggulan = () => {
  return adminAxios.get("/program-unggulan");
};

export const createProgramUnggulan = (formData) => {
  return adminAxios.post("/program-unggulan", formData);
};

export const updateProgramUnggulan = (id, formData) => {
  return adminAxios.put(`/program-unggulan/${id}`, formData);
};

export const deleteProgramUnggulan = (id) => {
  return adminAxios.delete(`/program-unggulan/${id}`);
};
