import { instance } from "./api/axios.js";

const buildFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const createContentService = (resource) => ({
  getAdminList: async () => (await instance.get(`/${resource}`)).data.data,
  getPublicList: async () => (await instance.get(`/${resource}/public`)).data.data,
  getPublicDetail: async (id) => (await instance.get(`/${resource}/public/${id}`)).data.data,
  create: async (payload) => (await instance.post(`/${resource}`, buildFormData(payload), { headers: { "Content-Type": "multipart/form-data" } })).data.data,
  update: async (id, payload) => (await instance.put(`/${resource}/${id}`, buildFormData(payload), { headers: { "Content-Type": "multipart/form-data" } })).data.data,
  remove: async (id) => (await instance.delete(`/${resource}/${id}`)).data,
});
