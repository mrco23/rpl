import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

class WaveService extends ResourceService {
  constructor() {
    super("/gelombang");
  }
}

const service = new WaveService();

export const waveApi = {
  getAdminList: () => service.list(),
  getPublicList: () => httpClient.get("/gelombang/public"),
  create: (payload) => service.create(payload),
  update: (id, payload) => service.update(id, payload),
  remove: (id) => service.remove(id),
  exportExcel: (id) => httpClient.get(`/gelombang/${id}/export`, { responseType: "blob" }),
  getActiveWave: () => httpClient.get(`/gelombang/aktif`)
};
