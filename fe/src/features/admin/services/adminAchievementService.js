import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/prestasi");

export const getAllPrestasi = (params) => service.list(params);
export const getPrestasiById = (id) => service.detail(id);
export const createPrestasi = (payload) => service.create(payload);
export const updatePrestasiData = (id, payload) => service.update(id, payload);
export const updatePrestasiImage = (id, payload) => httpClient.patch(`/prestasi/${id}/image`, payload);
export const updatePrestasi = (id, payload) => service.update(id, payload);
export const deletePrestasi = (id) => service.remove(id);
