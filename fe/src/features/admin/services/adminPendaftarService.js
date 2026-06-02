import ResourceService from "../../../services/resourceService.js";
import httpClient from "../../../services/httpClient.js";

const service = new ResourceService("/pendaftar");

export const getAllPendaftar = (params) => service.list(params);
export const getPendaftarById = (id) => service.detail(id);
// Backend does not have /:id/status. Use updateStatusMassal instead.
// export const updatePendaftarStatus = (id, payload) => httpClient.patch(`/pendaftar/${id}/status`, payload);
export const updateStatusMassal = (ids, status) => httpClient.patch(`/pendaftar/mass-status`, { ids, status });
export const deletePendaftar = (id) => service.remove(id);
