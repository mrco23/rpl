import { requestAPI } from "./api.js";

const resource = "gelombang";

export const waveApi = {
  getAdminList: async () => {
    const res = await requestAPI({ method: "GET", url: `/${resource}` });
    return res;
  },
  create: async (payload) => {
    const res = await requestAPI({
      method: "POST",
      url: `/${resource}`,
      data: payload,
    });
    return res;
  },
  update: async (id, payload) => {
    const res = await requestAPI({
      method: "PUT",
      url: `/${resource}/${id}`,
      data: payload,
    });
    return res;
  },
  remove: async (id) => {
    const res = await requestAPI({ method: "DELETE", url: `/${resource}/${id}` });
    return res;
  },
  exportExcel: async (id) => {
    const res = await requestAPI({ 
      method: "GET", 
      url: `/${resource}/${id}/export`, 
      responseType: "blob" 
    });
    return res;
  },

  // Public endpoint
  getActiveWave: async () => {
    const res = await requestAPI({ method: "GET", url: `/gelombang/aktif` });
    return res;
  }
};

