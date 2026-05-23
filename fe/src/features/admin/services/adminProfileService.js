import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk entitas Profil Sekolah
 */
export const getAdminProfile = () => {
  return httpClient.get("/profile/admin");
};

export const createProfile = (formData) => {
  return httpClient.post("/profile", formData);
};

export const updateProfileData = (payload) => {
  return httpClient.put("/profile", payload);
};

export const updateProfileImage = (formData) => {
  return httpClient.patch("/profile/image", formData);
};

export const upsertKontakProfile = (payload) => {
  return httpClient.post("/profile/kontak", payload);
};
