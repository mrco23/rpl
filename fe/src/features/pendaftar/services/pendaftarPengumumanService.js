import httpClient, { requestAPI } from "../../../services/httpClient.js";

export const getPendaftarPengumuman = async () => {
    return requestAPI({
        method: "GET",
        url: "/pengumuman/pendaftar"
    });
};
