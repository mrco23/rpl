import httpClient, { requestAPI } from "../../../services/httpClient.js";
import formateDate from "../../../shared/utils/formateDate.js";

// Fetch Beranda Data (menggunakan endpoint rekap jika sudah tersedia, atau fallback)
export const getBerandaSummary = async () => {
  try {
    const totalReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-ppdb" });
    const gelombangReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-gelombang" });

    // Asumsikan data berhasil
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
      gelombang: gelombang.map(g => ({
        nama: g.nama,
        periode: `${formateDate(g.tanggal_mulai)} - ${formateDate(g.tanggal_selesai)}`,
        kuota: g.kuota,
        total_pendaftar: g._count?.pendaftar || 0,
        lulus: 0, // Mock atau hitung dari backend detail
        status: new Date() > new Date(g.tanggal_selesai) ? "Selesai" : "Aktif"
      }))
    };
  } catch (error) {
    console.error("Gagal mengambil data beranda:", error);
    throw error;
  }
};

export const downloadLaporanBlob = async (type, format) => {
  try {
    const url = `/kepala-sekolah/laporan/${type}/${format}`;
    const response = await httpClient.get(url, { responseType: 'blob' });

    // Create blob link to download
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = urlBlob;

    const extension = format === 'excel' ? 'xlsx' : 'pdf';
    link.setAttribute('download', `${type}.${extension}`);

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Gagal mengunduh laporan:", error);
    throw error;
  }
};

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
