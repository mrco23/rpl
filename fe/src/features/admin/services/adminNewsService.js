import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/berita");

export const getAllBerita = (params) => service.list(params);
export const getBeritaById = (id) => service.detail(id);
export const createBerita = (payload) => service.create(payload);
export const updateBeritaData = (id, payload) => service.update(id, payload);
export const updateBeritaImage = (id, payload) => httpClient.patch(`/berita/${id}/image`, payload);
export const deleteBerita = (id) => service.remove(id);
