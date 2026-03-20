import { requestAPI } from "./api.js";

const buildFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

/* 
  Generator layanan konten dengan Endpoint Backend Baru
  Sudah mensupport pemisahan data teks dan gambar
*/
export const createContentService = (resource) => ({
  getAdminList: async () => {
    const res = await requestAPI({ method: "GET", url: `/${resource}` });
    return res.data;
  },
  getPublicList: async () => {
    const res = await requestAPI({ method: "GET", url: `/${resource}/public` });
    return res.data;
  },
  getPublicDetail: async (id) => {
    const res = await requestAPI({ method: "GET", url: `/${resource}/public/${id}` });
    return res.data;
  },
  // Saat create, jika ada file gambar akan dikirim sebagai multipart
  create: async (payload) => {
    const isMultipart = !!payload.gambar;
    const res = await requestAPI({
      method: "POST",
      url: `/${resource}`,
      data: isMultipart ? buildFormData(payload) : payload,
      isMultipart,
    });
    return res.data;
  },
  // PUT = Update data teks saja
  update: async (id, payload) => {
    const res = await requestAPI({
      method: "PUT",
      url: `/${resource}/${id}`,
      data: payload, // JSON biasa
    });
    return res.data;
  },
  // PATCH = Khusus ganti gambar
  updateImage: async (id, file) => {
    const formData = new FormData();
    formData.append("gambar", file);
    const res = await requestAPI({
      method: "PATCH",
      url: `/${resource}/${id}/image`,
      data: formData,
      isMultipart: true,
    });
    return res.data;
  },
  remove: async (id) => {
    const res = await requestAPI({ method: "DELETE", url: `/${resource}/${id}` });
    return res.data;
  },
});
