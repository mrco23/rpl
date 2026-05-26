import React, { useState } from "react";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { downloadLaporanBlob } from "../services/kepalaSekolahService";
import Toast from "../../../shared/components/Toast";

export default function LaporanPPDBPage() {
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });
  const [downloading, setDownloading] = useState(false);

  const laporans = [
    {
      id: "rekap-ppdb",
      title: "Laporan Rekapitulasi PPDB",
      desc: "Ringkasan seluruh pendaftar, status seleksi, dan data utama PPDB. Dapat diolah kembali sesuai kebutuhan.",
      format: "excel",
      formatLabel: "Excel",
      icon: FileSpreadsheet,
      btnClass: "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300",
      badgeClass: "bg-green-50 text-green-700 border-green-100",
      badgeLabel: "Excel (.xlsx)",
    },
    {
      id: "final-penerimaan",
      title: "Laporan Final Penerimaan",
      desc: "Daftar pendaftar yang dinyatakan lulus sebagai bahan pengesahan kepala sekolah, lengkap dengan kop surat resmi.",
      format: "pdf",
      formatLabel: "PDF",
      icon: FileText,
      btnClass: "bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300",
      badgeClass: "bg-red-50 text-red-600 border-red-100",
      badgeLabel: "PDF + Kop Surat",
    },
  ];

  const handleDownload = async (id, format) => {
    setDownloading(true);
    setToast({ show: true, message: `Mengunduh laporan ${format.toUpperCase()}...`, type: "info" });
    try {
      await downloadLaporanBlob(id, format);
      setToast({ show: true, message: "Berhasil mengunduh laporan.", type: "success" });
    } catch (error) {
      setToast({ show: true, message: "Gagal mengunduh laporan.", type: "error" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* HEADER */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Laporan PPDB</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          Unduh laporan resmi PPDB. PDF digunakan sebagai laporan dengan kop surat, sedangkan Excel untuk rekap data yang dapat diolah kembali.
        </p>
      </div>

      {/* LAPORAN CARDS — full width 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {laporans.map((lap) => {
          const Icon = lap.icon;
          return (
            <div
              key={lap.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4"
            >
              {/* Top: icon + badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Icon size={24} className="text-gray-500" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${lap.badgeClass}`}>
                  {lap.badgeLabel}
                </span>
              </div>

              {/* Title + desc */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1">{lap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{lap.desc}</p>
              </div>

              {/* Download button */}
              <button
                disabled={downloading}
                onClick={() => handleDownload(lap.id, lap.format)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 ${lap.btnClass}`}
              >
                <Download size={16} />
                Unduh {lap.formatLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}