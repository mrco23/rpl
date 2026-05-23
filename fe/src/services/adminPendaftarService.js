import httpClient from "./httpClient.js";

/**
 * Service untuk Pendaftar (bisa diakses admin atau verifikator)
 */
export const getAllPendaftar = () => {
	return httpClient.get("/pendaftar");
};

export const updateStatusMassal = (ids, status) => {
	return httpClient.patch("/pendaftar/mass-status", { ids, status });
};
