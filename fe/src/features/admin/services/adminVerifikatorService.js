import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk Manajemen Akun Verifikator oleh Admin
 */
export const getAllVerifikator = () => {
    return httpClient.get("/verifikator");
};

export const createVerifikator = (payload) => {
    return httpClient.post("/verifikator", payload);
};

export const updateVerifikator = (id, payload) => {
    return httpClient.put(`/verifikator/${id}`, payload);
};

export const deleteVerifikator = (id) => {
    return httpClient.delete(`/verifikator/${id}`);
};

export const updateStatusVerifikator = (id, status_aktif) => {
    return httpClient.patch(`/admin/verifikator/${id}/status`, { status_aktif });
};
