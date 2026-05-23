import httpClient from "./httpClient.js";

/**
 * Service untuk entitas Gelombang
 */
export const getSemuaGelombang = () => {
	return httpClient.get("/gelombang");
};

export const createGelombang = (payload) => {
	return httpClient.post("/gelombang", payload);
};

export const getGelombangById = (id) => {
	return httpClient.get(`/gelombang/${id}`);
};

export const updateGelombang = (id, payload) => {
	return httpClient.put(`/gelombang/${id}`, payload);
};

export const deleteGelombang = (id) => {
	return httpClient.delete(`/gelombang/${id}`);
};

export const exportExcelGelombang = (id) => {
	return httpClient.get(`/gelombang/${id}/export`, {
		responseType: "blob",
	});
};
