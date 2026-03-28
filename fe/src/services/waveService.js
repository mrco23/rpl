import { requestAPI } from "./api.js";

const resource = "admin/gelombang";

export const waveApi = {
  getAdminList: async () => {
    const res = await requestAPI({ method: "GET", url: `/${resource}` });
    return res.data;
  },
  create: async (payload) => {
    const res = await requestAPI({
      method: "POST",
      url: `/${resource}`,
      data: payload,
    });
    return res.data;
  },
  update: async (id, payload) => {
    const res = await requestAPI({
      method: "PUT",
      url: `/${resource}/${id}`,
      data: payload,
    });
    return res.data;
  },
  remove: async (id) => {
    const res = await requestAPI({ method: "DELETE", url: `/${resource}/${id}` });
    return res.data;
  },
  // Public endpoint
  getActiveWave: async () => {
    const res = await requestAPI({ method: "GET", url: `/gelombang/aktif` });
    return res.data;
  }
};
