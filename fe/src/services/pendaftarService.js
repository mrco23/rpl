import { requestAPI } from "./api.js";

export const getPendaftarMe = () => {
  return requestAPI({
    method: "GET",
    url: "/pendaftar/me"
  });
};
