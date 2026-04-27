import adminAxios from "./adminAxios.js";

/**
 * Service untuk Pendaftar (bisa diakses admin atau verifikator)
 */
export const getAllPendaftar = () => {
	return adminAxios.get("/pendaftar");
};

export const updateStatusMassal = (ids, status) => {
	console.log({ ids, status });
	return adminAxios.patch("/pendaftar/mass-status", { ids, status });
};
