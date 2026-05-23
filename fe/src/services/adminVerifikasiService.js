import httpClient from "./httpClient.js";

/**
 * Service untuk verifikasi dokumen (biasanya untuk verifikator/admin)
 */
// DISABLING this function because backend does not have endpoint `/api/dokumen/:id/verifikasi`
// Use verifyPendaftar from verifikatorVerifikasiService instead.
// export const updateVerifikasiDokumen = (idDokumen, payload) => {
//   return httpClient.patch(`/dokumen/${idDokumen}/verifikasi`, payload);
// };
