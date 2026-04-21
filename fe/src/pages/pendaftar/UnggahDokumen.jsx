import React from "react";
import {
  FileText,
  UploadCloud,
  AlertCircle,
  CheckCircle,
  Calendar,
  Send,
} from "lucide-react";

function UnggahDokumen() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <h2 className="text-3xl font-semibold">Unggah Dokumen</h2>
      <p className="text-gray-600 mt-1 max-w-xl">
        Unggah dokumen persyaratan dengan format yang sesuai. Pastikan dokumen
        jelas dan tidak buram.
      </p>

      {/* Info */}
      <div className="flex items-start mt-4 gap-16">
        {/* Kiri */}
        <div className="bg-gray-300 text-md text-gray-700 p-7 rounded-lg flex gap-2 items-start max-w-4xl">
          <AlertCircle size={20} />
          <p>
            Setelah semua dokumen diunggah klik tombol{" "}
            <span className="font-medium text-black">
              "Kirim untuk Diverifikasi"
            </span>{" "}
            agar dokumen dapat diperiksa oleh panitia PPDB
          </p>
        </div>

        {/* Kanan */}
        <div className="bg-white shadow p-4 rounded-lg border w-52">
          <div className="flex items-start gap-2">
            <Calendar size={18} className="text-gray-500 mt-1" />

            <div>
              <p className="text-sm text-gray-500">Batas waktu unggah</p>
              <h4 className="font-semibold">12 Juni 2026</h4>
              <span className="text-green-600 text-sm">23 hari lagi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      <h4 className="mt-6 mb-3 font-semibold text-gray-700">
        Dokumen yang diperlukan
      </h4>

      {/* Cards */}
      <div className="flex flex-wrap gap-4">
        <DokumenCard
          title="Rapor / Ijazah Terakhir"
          deskcripsi="Rapor Semester akhir atau ijazah bagi lulusan"
          status="success"
          fileName="ijazah.pdf"
          statusText="Sudah Diunggah"
        />

        <DokumenCard
          title="Akte Kelahiran"
          deskcripsi="Dokumen akte kelahiran asli"
          status="empty"
          statusText="Belum Diunggah"
        />

        <DokumenCard
          title="Kartu Keluarga"
          deskcripsi="Dokumen kartu keluarga asli"
          status="error"
          fileName="foto.jpg"
          statusText="Perlu Perbaiki"
        />

        <DokumenCard
          title="Pas Foto"
          deskcripsi="Pas foto terbaru latar belakang"
          status="error"
          fileName="foto.jpg"
          statusText="Perlu Perbaiki"
        />
      </div>

      {/* Catatan */}
      <div className="mt-6 flex justify-between items-start gap-6">
        <div className="bg-yellow-100 p-4 rounded-lg flex gap-2 flex-1">
          <AlertCircle className="text-yellow-600" size={18} />
          <div>
            <p className="font-semibold">Catatan Verifikator</p>
            <p className="text-sm">
              Pas foto kurang jelas. Mohon unggah ulang dengan foto yang lebih
              terang dan fokus.
            </p>
            <span className="text-xs text-gray-600">30 Mei 2026 10:30</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-70">
            <Send size={16} />
            Kirim Untuk Diverifikasi
          </button>

          <p className="text-sm text-gray-500 max-w-xs">
            Pastikan semua dokumen sudah benar sebelum dikirim
          </p>
        </div>
      </div>
    </div>
  );
}

function DokumenCard({ title, status, deskcripsi, fileName, statusText }) {
  const statusColor =
    status === "success"
      ? "text-green-600"
      : status === "error"
        ? "text-orange-500"
        : "text-gray-500";

  return (
    <div
      className={`w-56 p-4 rounded-xl border bg-white shadow-xl
      ${status === "error" ? "bg-orange-50" : ""}
    `}
    >
      <h5 className="font-medium text-md">{title}</h5>
      <p className="text-sm">{deskcripsi}</p>

      {/* Upload Box */}
      <div
        className={`h-24 border-2 border-dashed rounded-lg flex items-center justify-center mt-3
  ${
    status === "error"
      ? "border-orange-400"
      : status === "success"
        ? "border-green-400"
        : "border-gray-300"
  }`}
      >
        {status === "success" && <CheckCircle className="text-green-600" />}
        {status === "empty" && <UploadCloud className="text-gray-400" />}
        {status === "error" && <AlertCircle className="text-orange-500" />}
      </div>

      {/* STATUS TEXT */}
      <p className={`text-xs font-medium mt-2 ${statusColor}`}>{statusText}</p>

      {/* FILE */}
      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
        <FileText size={14} />
        {fileName || "Belum ada file"}
      </p>

      {/* Buttons */}
      <div className="mt-2 space-y-1">
        {status === "success" && (
          <>
            <button className="w-full text-sm text-blue-600 bg-gray-200 py-1 rounded-lg border border-b-blue-600 cursor-pointer">
              Lihat File
            </button>

            <button className="w-full text-sm bg-gray-400 text-white py-1 rounded-lg cursor-pointer">
              Ganti File
            </button>
          </>
        )}

        {status === "empty" && (
          <button className="w-full text-sm bg-blue-600 text-white py-1 rounded-lg cursor-pointer">
            Unggah File
          </button>
        )}

        {status === "error" && (
          <>
            <button className="w-full text-sm bg-orange-400 text-white py-1 rounded-lg cursor-pointer">
              Lihat Catatan
            </button>

            <button className="w-full text-sm bg-blue-600 text-white py-1 rounded-lg cursor-pointer">
              Unggah Ulang
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UnggahDokumen;
