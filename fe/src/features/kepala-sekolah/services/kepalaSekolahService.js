import httpClient, { requestAPI } from "../../../services/httpClient.js";

// Fetch Beranda Data (menggunakan endpoint rekap jika sudah tersedia, atau fallback)
export const getBerandaSummary = async () => {
  try {
    const totalReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-ppdb" });
    const gelombangReq = await requestAPI({ method: "GET", url: "/kepala-sekolah/laporan/rekap-gelombang" });
    
    // Asumsikan data berhasil
    const rekap = totalReq.data;
    const gelombang = gelombangReq.data;
    
    return {
      tahun_ajaran: new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
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
        periode: `${new Date(g.tanggal_mulai).toLocaleDateString()} - ${new Date(g.tanggal_selesai).toLocaleDateString()}`,
        kuota: g.kuota,
        total_pendaftar: g._count?.pendaftar || 0,
        lulus: 0, // Mock atau hitung dari backend detail
        status: new Date() > new Date(g.tanggal_selesai) ? "Selesai" : "Aktif"
      }))
    };
  } catch (error) {
    // Fallback Mock Data jika endpoint belum di-setup di backend dengan benar
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tahun_ajaran: "2026/2027",
          total_pendaftar: 120,
          kuota_total: 136,
          lulus: 68,
          tidak_lulus: 2,
          menunggu_verifikasi: 50,
          perlu_perbaikan: 0,
          terverifikasi: 0,
          wawancara_orang_tua: 0,
          gelombang: [
            {
              nama: "Gelombang 1",
              periode: "1 Jan 2026 - 31 Mar 2026",
              kuota: 68,
              total_pendaftar: 70,
              lulus: 68,
              status: "Selesai"
            }
          ]
        });
      }, 500);
    });
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
