import { requestAPI } from "./api.js";

export const getPendaftarPengumuman = async () => {
    return requestAPI({
        method: "GET",
        url: "/pengumuman/pendaftar"
    });
};
