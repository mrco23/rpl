import { requestAPI } from "./api.js";

// Utility Form Data
const buildFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const getAdminProfile = async () => {
  const res = await requestAPI({ method: "GET", url: "/profile" });
  return res.data;
};

export const getPublicProfile = async () => {
  const res = await requestAPI({ method: "GET", url: "/profile/public" });
  return res.data;
};

/* 
  Profile Management (POST untuk create/upsert data + awal image)
*/
export const updateProfile = async (payload) => {
  const isMultipart = !!(payload.logo || payload.foto_kepala_sekolah);
  const data = isMultipart ? buildFormData(payload) : payload;
  
  const res = await requestAPI({
    method: "POST", // Menggunakan POST seperti di backend route profil
    url: "/profile",
    data,
    isMultipart,
  });

  return res.data;
};

/* 
  Profile Management: Update teks saja
*/
export const updateProfileData = async (payload) => {
  const res = await requestAPI({
    method: "PUT",
    url: "/profile",
    data: payload,
  });
  return res.data;
};

/* 
  Profile Management: Update image saja
*/
export const updateProfileImage = async (fileObj) => {
  // fileObj misal { logo: File } atau { foto_kepala_sekolah: File }
  const formData = buildFormData(fileObj);
  const res = await requestAPI({
    method: "PATCH",
    url: "/profile/image",
    data: formData,
    isMultipart: true,
  });
  return res.data;
};

/* 
  Kontak Management (POST untuk upsert)
*/
export const updateKontak = async (payload) => {
  const res = await requestAPI({
    method: "POST",
    url: "/profile/kontak",
    data: payload,
  });
  return res.data;
};
