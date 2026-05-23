import httpClient, { requestAPI } from "./httpClient.js";

export const getPendaftarPengumuman = async () => {
    return requestAPI({
        method: "GET",
        url: "/pengumuman/pendaftar"
    });
};
