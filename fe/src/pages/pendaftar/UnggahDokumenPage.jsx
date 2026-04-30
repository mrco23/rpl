import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  UploadCloud,
  AlertCircle,
  CheckCircle,
  Calendar,
  Send,
  Loader2,
} from "lucide-react";
import {
  getMyDocuments,
  uploadDocument,
} from "../../services/dokumenService.js";
import { getPendaftarMe } from "../../services/pendaftarService.js";
import { resolveDocumentUrl, extractFileNameFromUrl } from "../../utils/documentHelper.js";
import Toast from "../../components/ui/Toast.jsx";

function UnggahDokumenPage() {
  const [documents, setDocuments] = useState([]);
  const [pendaftar, setPendaftar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToastConfig({ show: true, message, type });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [docsRes, pendaftarRes] = await Promise.all([
        getMyDocuments(),
        getPendaftarMe(),
      ]);
      setDocuments(docsRes.data || []);
      setPendaftar(pendaftarRes.data || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDocStatus = (nama) => {
<<<<<<< HEAD
    const doc = documents.find((d) => d.nama_dokumen === nama);
    if (!doc)
      return { status: "empty", fileName: null, statusText: "Belum upload" };
    return {
      status: "success",
      fileName: doc.jenis_dokumen.split("/").pop(),
      statusText: "Sudah diupload",
    };
=======
    const doc = documents.find(d => d.nama_dokumen === nama);
    if (!doc) return { status: "empty", fileName: null, statusText: "Belum upload" };
    return { status: "success", fileName: extractFileNameFromUrl(doc.jenis_dokumen), statusText: "Sudah diupload" };
>>>>>>> 2058f56 (refactor code)
  };

  const docTypes = [
    { title: "Ijazah", desk: "Rapor Semester akhir atau ijazah bagi lulusan" },
    {
      title: "Foto Copy Akte Kelahiran",
      desk: "Dokumen akte kelahiran asli / foto copy",
    },
    {
      title: "Foto Copy Kartu Keluarga",
      desk: "Dokumen kartu keluarga asli / foto copy",
    },
    { title: "Pas Foto", desk: "Pas foto terbaru latar belakang merah" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-semibold">Unggah Dokumen</h2>
      <p className="text-gray-600 mt-1 max-w-xl text-sm md:text-base">
        Unggah dokumen persyaratan dengan format yang sesuai. Pastikan dokumen
        jelas dan tidak buram.
      </p>

      {/* Info */}
      <div className="flex flex-col md:flex-row items-start mt-6 gap-4 md:gap-16">
        {/* Kiri */}
        <div className="bg-gray-300 text-sm md:text-md text-gray-700 p-5 md:p-7 rounded-lg flex gap-2 items-start w-full md:max-w-4xl">
          <AlertCircle size={20} className="flex-shrink-0" />
          <p>
            Setelah semua dokumen diunggah klik tombol{" "}
            <span className="font-medium text-black">
              "Kirim untuk Diverifikasi"
            </span>{" "}
            agar dokumen dapat diperiksa oleh panitia PPDB
          </p>
        </div>

        {/* Kanan */}
        <div className="bg-white shadow p-4 rounded-lg border-0 outline-2 w-full md:w-52 shrink-0">
          <div className="flex items-start gap-2">
            <Calendar size={18} className="text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Batas waktu unggah</p>
              <h4 className="font-semibold">Sesuai Gelombang</h4>
              <span className="text-green-600 text-sm">Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      <h4 className="mt-8 mb-4 font-semibold text-gray-700">
        Dokumen yang diperlukan
      </h4>

      {/* Cards */}
      <div className="flex flex-wrap gap-4">
        {docTypes.map((type, idx) => {
          const info = getDocStatus(type.title);
          const isLocked = pendaftar && ['terverifikasi', 'wawancara orang tua', 'lulus', 'tidak lulus'].includes(pendaftar.status_pendaftaran);
          return (
            <DokumenCard
              key={idx}
              title={type.title}
              deskcripsi={type.desk}
              initialStatus={info.status}
              initialFileName={info.fileName}
              statusText={info.statusText}
              onUploadSuccess={loadData}
<<<<<<< HEAD
              fileUrl={
                documents.find((d) => d.nama_dokumen === type.title)
                  ?.jenis_dokumen
              }
=======
              fileUrl={documents.find(d => d.nama_dokumen === type.title)?.jenis_dokumen}
              isLocked={isLocked}
              showToast={showToast}
>>>>>>> 2058f56 (refactor code)
            />
          );
        })}
      </div>

      {/* Catatan */}
      {pendaftar?.catatan_dokumen && (
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="bg-yellow-100 p-4 rounded-lg flex gap-2 w-full md:flex-1">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
            <div>
              <p className="font-semibold">Catatan Verifikator</p>
              <p className="text-sm mt-1">{pendaftar.catatan_dokumen}</p>
              <span className="text-xs text-gray-600 block mt-2">
                Mohon segera lakukan perbaikan jika diminta.
              </span>
            </div>
          </div>

        </div>
      )}
      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />
    </div>
  );
}

<<<<<<< HEAD
function DokumenCard({
  title,
  initialStatus,
  deskcripsi,
  initialFileName,
  statusText,
  onUploadSuccess,
  fileUrl,
}) {
=======
function DokumenCard({ title, initialStatus, deskcripsi, initialFileName, statusText, onUploadSuccess, fileUrl, isLocked, showToast }) {
>>>>>>> 2058f56 (refactor code)
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        setIsUploading(true);
        await uploadDocument(title, selectedFile);
        showToast(`Dokumen ${title} berhasil diunggah!`, "success");
        onUploadSuccess();
      } catch (err) {
        console.error(err);
        showToast("Gagal mengunggah dokumen: " + (err.message || "Unknown error"), "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleViewFile = () => {
    if (fileUrl) {
<<<<<<< HEAD
      const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
      window.open(`${baseUrl}${fileUrl}`, "_blank");
=======
      window.open(resolveDocumentUrl(fileUrl), '_blank');
>>>>>>> 2058f56 (refactor code)
    }
  };

  const statusColor =
    initialStatus === "success"
      ? "text-green-600"
      : initialStatus === "error"
        ? "text-orange-500"
        : "text-gray-500";

  return (
    <div
      className={`w-full sm:w-56 p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col
    ${initialStatus === "error" ? "bg-orange-50 border-orange-200" : "border-gray-200"}
  `}
    >
      <h5 className="font-medium text-md text-gray-800">{title}</h5>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
        {deskcripsi}
      </p>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {/* Upload Box */}
      <div
        className={`h-24 border-2 border-dashed rounded-lg flex items-center justify-center mt-4 transition-colors
          ${
            initialStatus === "error"
              ? "border-orange-400 bg-orange-100"
              : initialStatus === "success"
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-gray-50"
          }`}
      >
        {isUploading ? (
          <Loader2 className="animate-spin text-blue-500" size={28} />
        ) : (
          <>
            {initialStatus === "success" && (
              <CheckCircle className="text-green-600" size={28} />
            )}
            {initialStatus === "empty" && (
              <UploadCloud className="text-gray-400" size={28} />
            )}
            {initialStatus === "error" && (
              <AlertCircle className="text-orange-500" size={28} />
            )}
          </>
        )}
      </div>

      {/* STATUS TEXT */}
      <p className={`text-xs font-semibold mt-3 ${statusColor}`}>
        {isUploading ? "Sedang Mengunggah..." : statusText}
      </p>

      {/* FILE NAME */}
      <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5 truncate">
        <FileText size={14} className="shrink-0" />
        <span className="truncate">{initialFileName || "Belum ada file"}</span>
      </p>

      {/* Buttons */}
      <div className="mt-4 space-y-2">
        {initialStatus === "success" && (
          <>
            <button
              onClick={handleViewFile}
              className="w-full text-sm font-medium text-blue-normal bg-blue-50 hover:bg-blue-normal-hover py-2 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Lihat File
            </button>
            {!isLocked && (
              <button
                onClick={triggerUpload}
                disabled={isUploading}
                className="w-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Ganti File
              </button>
            )}
          </>
        )}

        {initialStatus === "empty" && !isLocked && (
          <button
            onClick={triggerUpload}
            disabled={isUploading}
            className="w-full text-sm font-medium bg-blue-normal hover:bg-blue-normal-hover text-white py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Unggah File
          </button>
        )}

        {initialStatus === "error" && !isLocked && (
          <>
            <button className="w-full text-sm font-medium bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 rounded-lg transition-colors cursor-pointer">
              Lihat Catatan
            </button>
            <button
              onClick={triggerUpload}
              disabled={isUploading}
              className="w-full text-sm font-medium bg-blue-dark hover:bg-blue-700 text-white py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Unggah Ulang
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UnggahDokumenPage;
