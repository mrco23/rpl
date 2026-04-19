import adminAxios from "./adminAxios.js";

/**
 * Service untuk Manajemen Akun Verifikator oleh Admin
 */
export const getAllVerifikator = () => {
    return adminAxios.get("/verifikator");
};

export const createVerifikator = (payload) => {
    return adminAxios.post("/verifikator", payload);
};

export const updateVerifikator = (id, payload) => {
    return adminAxios.put(`/verifikator/${id}`, payload);
};

export const deleteVerifikator = (id) => {
    return adminAxios.delete(`/verifikator/${id}`);
};
