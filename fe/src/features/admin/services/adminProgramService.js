import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/program-unggulan");

export const getAllProgramUnggulan = (params) => service.list(params);
export const getProgramById = (id) => service.detail(id);
export const createProgramUnggulan = (payload) => service.create(payload);
export const updateProgramData = (id, payload) => service.update(id, payload);
export const updateProgramImage = (id, payload) => httpClient.patch(`/program-unggulan/${id}/image`, payload);
export const updateProgramUnggulan = (id, payload) => service.update(id, payload);
export const deleteProgramUnggulan = (id) => service.remove(id);
