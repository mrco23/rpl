import httpClient, { requestAPI } from "../../../services/httpClient.js";
import formateDate from "../../../shared/utils/formateDate.js";

// ─── BERANDA ──────────────────────────────────────────────────────────────────

export const getBerandaSummary = async () => {
  try {
    const totalReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-ppdb" });
    const gelombangReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-gelombang" });

    const rekap = totalReq.data;
    const gelombang = gelombangReq.data;

    return {
      total_pendaftar: rekap.total || 0,
      kuota_total: gelombang.reduce((acc, curr) => acc + curr.kuota, 0),
      lulus: rekap.lulus || 0,
      tidak_lulus: rekap.tidakLulus || 0,
      menunggu_verifikasi: rekap.menunggu || 0,
      perlu_perbaikan: 0,
      terverifikasi: rekap.total - (rekap.menunggu || 0),
      wawancara_orang_tua: 0,
      gelombang: gelombang.map((g) => ({
        nama: g.nama,
        periode: `${formateDate(g.tanggal_mulai)} - ${formateDate(g.tanggal_selesai)}`,
        kuota: g.kuota,
        total_pendaftar: g._count?.pendaftar || 0,
        lulus: 0,
        status: new Date() > new Date(g.tanggal_selesai) ? "Selesai" : "Aktif",
      })),
    };
  } catch (error) {
    console.error("Gagal mengambil data beranda:", error);
    throw error;
  }
};

// ─── DAFTAR GELOMBANG ─────────────────────────────────────────────────────────

/**
 * Mengambil daftar semua gelombang (untuk dropdown pilih gelombang).
 * @returns {Array} Daftar gelombang
 */
export const getGelombangList = async () => {
  const res = await requestAPI({
    method: "GET",
    url: "/kepala-sekolah/laporan/rekap-gelombang",
  });
  return Array.isArray(res.data) ? res.data : [];
};

// ─── DOWNLOAD LAPORAN PDF ─────────────────────────────────────────────────────

/**
 * Helper internal: unduh blob PDF dan trigger download browser.
 * Gunakan nama file dari header Content-Disposition jika tersedia.
 *
 * @param {string} url - Endpoint API
 * @param {string} fallbackFilename - Nama file fallback
 */
const downloadPdfBlob = async (url, fallbackFilename) => {
  const response = await httpClient.get(url, { responseType: "blob" });

  // Coba ambil nama file dari Content-Disposition header
  let filename = fallbackFilename;
  const disposition = response.headers?.["content-disposition"] || response.headers?.get?.("content-disposition");
  if (disposition) {
    const match = disposition.match(/filename="?([^";\n]+)"?/i);
    if (match?.[1]) filename = match[1];
  }

  const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

/**
 * Unduh Laporan Rekapitulasi PPDB PDF untuk gelombang tertentu.
 * @param {number|string} idGelombang
 * @param {string} namaGelombang - Untuk fallback nama file
 */
export const downloadRekapitulasiPdf = async (idGelombang, namaGelombang = "") => {
  const safe = (namaGelombang || `gelombang-${idGelombang}`)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  await downloadPdfBlob(
    `/kepala-sekolah/laporan/rekapitulasi/${idGelombang}/pdf`,
    `laporan-rekapitulasi-ppdb-${safe}.pdf`,
  );
};

/**
 * Unduh Laporan Final Penerimaan PDF untuk gelombang tertentu.
 * @param {number|string} idGelombang
 * @param {string} namaGelombang - Untuk fallback nama file
 */
export const downloadFinalPenerimaanPdf = async (idGelombang, namaGelombang = "") => {
  const safe = (namaGelombang || `gelombang-${idGelombang}`)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  await downloadPdfBlob(
    `/kepala-sekolah/laporan/final-penerimaan/${idGelombang}/pdf`,
    `laporan-final-penerimaan-${safe}.pdf`,
  );
};

// ─── VALIDASI GELOMBANG ───────────────────────────────────────────────────────

export const getValidasiGelombang = async () => {
  const res = await requestAPI({
    method: "GET",
    url: "/kepala-sekolah/validasi-gelombang",
  });
  return res.data;
};

export const setujuiValidasiGelombang = async (id) => {
  const res = await requestAPI({
    method: "POST",
    url: `/kepala-sekolah/validasi-gelombang/${id}/setujui`,
    data: {},
  });
  return res.data;
};
