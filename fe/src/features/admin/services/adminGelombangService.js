import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/gelombang");

export const getAllGelombang = (params) => service.list(params);
export const getGelombangById = (id) => service.detail(id);
export const createGelombang = (payload) => service.create(payload);
export const updateGelombang = (id, payload) => service.update(id, payload);
export const deleteGelombang = (id) => service.remove(id);
export const getGelombangAktif = () => httpClient.get(`/gelombang/aktif`);
