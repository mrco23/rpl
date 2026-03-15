import { instance } from "./api/axios.js";

export const getAdminProfile = async () => (await instance.get("/profile")).data.data;
export const getPublicProfile = async () => (await instance.get("/profile/public")).data.data;

export const updateProfile = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const response = await instance.put("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};
