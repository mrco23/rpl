import adminAxios from "./adminAxios.js";

/**
 * Service untuk verifikasi dokumen (biasanya untuk verifikator/admin)
 */
export const updateVerifikasiDokumen = (idDokumen, payload) => {
  return adminAxios.patch(`/dokumen/${idDokumen}/verifikasi`, payload);
};
