import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/ekstrakurikuler");

export const getAllEkstrakurikuler = (params) => service.list(params);
export const getEkstrakurikulerById = (id) => service.detail(id);
export const createEkstrakurikuler = (payload) => service.create(payload);
export const updateEkstrakurikulerData = (id, payload) => service.update(id, payload);
export const updateEkstrakurikulerImage = (id, payload) => httpClient.patch(`/ekstrakurikuler/${id}/image`, payload);
export const deleteEkstrakurikuler = (id) => service.remove(id);
