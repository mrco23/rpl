export const STATUS_PENDAFTARAN = Object.freeze({
  MENUNGGU_VERIFIKASI: "menunggu verifikasi",
  TERVERIFIKASI: "terverifikasi",
  PERLU_PERBAIKAN: "perlu perbaikan",
  UNGGAH_ULANG: "unggah ulang",
  WAWANCARA_ORANG_TUA: "wawancara orang tua",
  LULUS: "lulus",
  TIDAK_LULUS: "tidak lulus",
});

export function normalizeStatusPendaftaran(input) {
  if (!input) return null;
  const normalized = input.toLowerCase().replace(/_/g, " ");
  
  if (normalized === "lolos") return STATUS_PENDAFTARAN.LULUS;
  if (normalized === "tidak lolos") return STATUS_PENDAFTARAN.TIDAK_LULUS;
  
  const validStatuses = Object.values(STATUS_PENDAFTARAN);
  if (validStatuses.includes(normalized)) {
    return normalized;
  }
  return null;
}

export function getStatusLabel(status) {
  if (!status) return "-";
  const words = status.split(" ");
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function isStatusFinal(status) {
  return [
    STATUS_PENDAFTARAN.LULUS,
    STATUS_PENDAFTARAN.TIDAK_LULUS
  ].includes(status);
}

export function isStatusEditableForDokumen(status) {
  return ![
    STATUS_PENDAFTARAN.TERVERIFIKASI,
    STATUS_PENDAFTARAN.WAWANCARA_ORANG_TUA,
    STATUS_PENDAFTARAN.LULUS,
    STATUS_PENDAFTARAN.TIDAK_LULUS
  ].includes(status);
}

export function isStatusVerifikatorAllowed(status) {
  return [
    STATUS_PENDAFTARAN.TERVERIFIKASI,
    STATUS_PENDAFTARAN.PERLU_PERBAIKAN
  ].includes(status);
}

export function isStatusAdminAllowed(status) {
  return [
    STATUS_PENDAFTARAN.WAWANCARA_ORANG_TUA,
    STATUS_PENDAFTARAN.LULUS,
    STATUS_PENDAFTARAN.TIDAK_LULUS
  ].includes(status);
}
