import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Profil Sekolah
 */
export const getAdminProfile = () => {
  return adminAxios.get("/profile/admin");
};

export const createProfile = (formData) => {
  return adminAxios.post("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProfileData = (payload) => {
  return adminAxios.put("/profile", payload);
};

export const updateProfileImage = (formData) => {
  return adminAxios.patch("/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const upsertKontakProfile = (payload) => {
  return adminAxios.post("/profile/kontak", payload);
};
