import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/fasilitas");

export const getAllFasilitas = (params) => service.list(params);
export const createFasilitas = (payload) => service.create(payload);
export const updateFasilitasData = (id, payload) => service.update(id, payload);
export const updateFasilitasImage = (id, payload) => httpClient.patch(`/fasilitas/${id}/image`, payload);
export const deleteFasilitas = (id) => service.remove(id);
