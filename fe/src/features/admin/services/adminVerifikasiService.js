import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk verifikasi dokumen (biasanya untuk verifikator/admin)
 */
export const updateVerifikasiDokumen = (idDokumen, payload) => {
  return httpClient.patch(`/dokumen/${idDokumen}/verifikasi`, payload);
};
