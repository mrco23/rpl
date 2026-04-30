import adminAxios from "./adminAxios.js";

/**
 * Service untuk entitas Gelombang
 */
export const getSemuaGelombang = () => {
	return adminAxios.get("/gelombang");
};

export const createGelombang = (payload) => {
	return adminAxios.post("/gelombang", payload);
};

export const getGelombangById = (id) => {
	return adminAxios.get(`/gelombang/${id}`);
};

export const updateGelombang = (id, payload) => {
	return adminAxios.put(`/gelombang/${id}`, payload);
};

export const deleteGelombang = (id) => {
	return adminAxios.delete(`/gelombang/${id}`);
};

export const exportExcelGelombang = (id) => {
	return adminAxios.get(`/gelombang/${id}/export`, {
		responseType: "blob",
	});
};
