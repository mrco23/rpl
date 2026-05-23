import React, { useState } from "react";
import { Download } from "lucide-react";
import { downloadLaporanBlob } from "../services/kepalaSekolahService";
import logo from "../../../shared/assets/logo.png";
import Toast from "../../../shared/components/Toast";

export default function LaporanPPDBPage() {
  const [tahunAjaran, setTahunAjaran] = useState("2026/2027");
  const [gelombang, setGelombang] = useState("Semua");
  const [toast, setToast] = useState({ open: false, message: "", type: "info" });
  const [downloading, setDownloading] = useState(false);

  const laporans = [
    { id: "rekap-ppdb", title: "Laporan Rekap PPDB", desc: "Data seluruh pendaftar dan statusnya." },
    { id: "final-penerimaan", title: "Laporan Final Penerimaan", desc: "Data pendaftar yang berstatus Lulus." },
    { id: "status-pendaftaran", title: "Laporan Status Pendaftaran", desc: "Rekap jumlah berdasarkan status (Segera Hadir)." },
    { id: "rekap-gelombang", title: "Laporan Per Gelombang", desc: "Kinerja per gelombang (Segera Hadir)." },
    { id: "asal-sekolah", title: "Laporan Asal Sekolah", desc: "Sebaran asal sekolah dasar pendaftar (Segera Hadir)." },
    { id: "wilayah-pendaftar", title: "Laporan Wilayah Pendaftar", desc: "Sebaran domisili pendaftar (Segera Hadir)." },
    { id: "kinerja-verifikator", title: "Laporan Kinerja Verifikator", desc: "Statistik verifikasi dokumen (Segera Hadir)." },
  ];

  const handleDownload = async (id, format) => {
    // Untuk dummy/belum implementasi
    if (id !== "rekap-ppdb" && id !== "final-penerimaan") {
      setToast({ open: true, message: "Export untuk laporan ini sedang dalam pengembangan.", type: "warning" });
      return;
    }

    setDownloading(true);
    setToast({ open: true, message: `Mengunduh laporan ${format.toUpperCase()}...`, type: "info" });
    try {
      await downloadLaporanBlob(id, format);
      setToast({ open: true, message: "Berhasil mengunduh laporan.", type: "success" });
    } catch (error) {
      setToast({ open: true, message: "Gagal mengunduh laporan.", type: "error" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <Toast 
        open={toast.open} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, open: false })} 
      />

      {/* HEADER */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Laporan PPDB</h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
            Laporan read-only untuk kepala sekolah. PDF digunakan sebagai laporan resmi dengan kop surat, sedangkan Excel digunakan sebagai data rekap yang dapat diolah kembali.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex items-center gap-3">
          <select 
            value={tahunAjaran}
            onChange={(e) => setTahunAjaran(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2026/2027">2026/2027</option>
            <option value="2025/2026">2025/2026</option>
          </select>
          <select 
            value={gelombang}
            onChange={(e) => setGelombang(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Semua">Semua Gelombang</option>
            <option value="1">Gelombang 1</option>
            <option value="2">Gelombang 2</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KIRI: DAFTAR LAPORAN */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {laporans.map((lap) => (
              <div key={lap.id} className="bg-[#f5f6f8] p-5 rounded-2xl border border-gray-200 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-gray-800 text-base mb-1">{lap.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{lap.desc}</p>
                </div>
                
                <div className="flex gap-2 mt-auto pt-2">
                  <button 
                    disabled={downloading}
                    onClick={() => handleDownload(lap.id, "pdf")}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download size={16} /> PDF
                  </button>
                  <button 
                    disabled={downloading}
                    onClick={() => handleDownload(lap.id, "excel")}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-green-200 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-50 hover:border-green-300 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download size={16} /> Excel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: PREVIEW KOP SURAT */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">Preview Kop Surat (PDF)</h2>
            
            <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-inner flex flex-col items-center text-center">
              <img src={logo} alt="Logo Sekolah" className="w-16 h-16 object-contain mb-3" />
              <h3 className="font-bold text-gray-900 leading-tight">SMP KATOLIK ST. RAFAEL MANADO</h3>
              <p className="text-[10px] text-gray-700 mt-1 uppercase tracking-wider">Akreditasi: A</p>
              <p className="text-[10px] text-gray-600 mt-1 px-4 leading-relaxed">
                Jl. Rike, Wanea, Manado, Sulawesi Utara<br/>
                Telp: 0812-XXXX-XXXX | Email: info@st-rafael.sch.id
              </p>
              <div className="w-full border-b-2 border-gray-800 mt-3 mb-[2px]"></div>
              <div className="w-full border-b border-gray-800 mb-4"></div>

              <h4 className="font-bold text-sm mb-6">LAPORAN [JUDUL]</h4>

              <div className="w-full h-24 border border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 text-xs rounded mb-6">
                [Tabel Data]
              </div>

              <div className="w-full text-right text-xs pr-4">
                <p className="mb-8">Manado, {new Date().toLocaleDateString("id-ID")}<br/>Kepala Sekolah,</p>
                <p className="font-bold underline mt-6">Nama Kepala Sekolah</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Format ini digunakan otomatis pada semua eksport PDF.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
