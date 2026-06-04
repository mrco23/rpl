import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/pengumuman");

export const getAllPengumuman = (params) => service.list(params);
export const getPengumumanById = (id) => service.detail(id);
export const createPengumuman = (payload) => service.create(payload);
export const updatePengumumanData = (id, payload) => service.update(id, payload);
export const updatePengumumanDokumen = (id, payload) => httpClient.patch(`/pengumuman/${id}/dokumen`, payload);
export const updatePengumuman = (id, payload) => service.update(id, payload);
export const deletePengumuman = (id) => service.remove(id);
