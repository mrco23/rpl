import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  UploadCloud,
  AlertCircle,
  CheckCircle,
  Loader2,
  Info,
  RefreshCcw,
  Eye,
  Upload
} from "lucide-react";
import {
  getMyDocuments,
  uploadDocument,
} from "../services/dokumenService.js";
import { getPendaftarMe } from "../services/pendaftarService.js";
import { resolveDocumentUrl, extractFileNameFromUrl } from "../../../shared/utils/documentHelper.js";
import Toast from "../../../shared/components/Toast.jsx";

const DOKUMEN_WAJIB = [
  { title: "Ijazah atau SKL", desk: "Dokumen kelulusan dari SD atau sekolah asal." },
  { title: "Akta Kelahiran", desk: "Dokumen identitas resmi untuk mencocokkan nama dan tanggal lahir." },
  { title: "Kartu Keluarga", desk: "Dokumen keluarga untuk validasi data orang tua atau wali." },
  { title: "Pas Foto", desk: "Foto terbaru dengan kualitas jelas." },
];

export default function UnggahDokumenPage() {
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
    const doc = documents.find(d => d.nama_dokumen === nama);
    if (!doc) return { isUploaded: false, fileName: null, fileUrl: null };
    return { isUploaded: true, fileName: extractFileNameFromUrl(doc.jenis_dokumen), fileUrl: doc.jenis_dokumen };
  };

  const uploadedCount = DOKUMEN_WAJIB.filter(type => getDocStatus(type.title).isUploaded).length;
  const isLocked = pendaftar && ['terverifikasi', 'wawancara orang tua', 'lulus', 'tidak lulus'].includes(pendaftar.status_pendaftaran);
  const catatanDokumen = pendaftar?.catatan_dokumen || "";
  const hasCatatan = catatanDokumen && catatanDokumen.trim().length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-dark" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 py-8 md:py-10 font-sans">
      <div className="max-w-5xl mx-auto w-full">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Unggah Dokumen
          </h1>
          <p className="text-sm md:text-base leading-7 text-gray-500 mt-2 max-w-2xl">
            Lengkapi berkas pendaftaran Anda. Pastikan dokumen yang diunggah dapat terbaca dengan jelas agar proses verifikasi berjalan lancar.
          </p>
        </div>

        {/* CATATAN DARI PANITIA */}
        {hasCatatan && (
          <div className="mb-8 bg-yellow-light border border-yellow-normal/30 rounded-3xl p-6 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-700 shrink-0">
              <AlertCircle size={28} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-yellow-900 mb-2">
                Catatan dari Panitia:
              </h3>
              <p className="text-sm md:text-base leading-7 text-yellow-800 whitespace-pre-wrap">
                {catatanDokumen}
              </p>
            </div>
          </div>
        )}

        <div className="grid xl:grid-cols-3 gap-6 md:gap-8">

          {/* KIRI - LIST DOKUMEN */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8">
            {DOKUMEN_WAJIB.map((doc) => {
              const info = getDocStatus(doc.title);
              return (
                <DokumenCard
                  key={doc.title}
                  title={doc.title}
                  deskcripsi={doc.desk}
                  isUploaded={info.isUploaded}
                  fileName={info.fileName}
                  fileUrl={info.fileUrl}
                  onUploadSuccess={loadData}
                  isLocked={isLocked}
                  showToast={showToast}
                />
              );
            })}
          </div>

          {/* KANAN - RINGKASAN & BANTUAN */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card xl:sticky xl:top-6">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-light rounded-xl text-blue-dark">
                  <Info size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Ringkasan Dokumen
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#f5f6f8] rounded-2xl p-5">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2">Total Dokumen Wajib</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-blue-dark">{uploadedCount}</span>
                    <span className="text-sm md:text-base text-gray-500 mb-1">/ 4 berkas dokumen</span>
                  </div>
                </div>

                <div className="p-5 border border-gray-200 rounded-2xl">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3">Ketentuan File</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm md:text-base leading-6 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-normal mt-2.5 shrink-0" />
                      Ukuran maksimal setiap file adalah 10 Megabyte (MB).
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base leading-6 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-normal mt-2.5 shrink-0" />
                      Format file yang didukung: JPG, PNG, dan PDF.
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base leading-6 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-normal mt-2.5 shrink-0" />
                      Pastikan resolusi cukup tinggi agar tulisan di dokumen terbaca jelas oleh panitia.
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />
    </div>
  );
}

function DokumenCard({ title, deskcripsi, isUploaded, fileName, fileUrl, onUploadSuccess, isLocked, showToast }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        showToast("Ukuran file maksimal 2MB", "error");
        event.target.value = null;
        return;
      }
      try {
        setIsUploading(true);
        await uploadDocument(title, selectedFile);
        showToast(`Dokumen ${title} berhasil diunggah!`, "success");
        onUploadSuccess();
      } catch (err) {
        console.error(err);
        showToast("Gagal mengunggah dokumen: " + (err.response?.data?.message || err.message || "Unknown error"), "error");
      } finally {
        setIsUploading(false);
        event.target.value = null;
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleViewFile = () => {
    if (fileUrl) {
      window.open(resolveDocumentUrl(fileUrl), '_blank');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">

      {/* INFO DOKUMEN */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl shrink-0 mt-1
          ${isUploaded ? "bg-blue-light text-blue-dark" : "bg-gray-100 text-gray-400"}
        `}>
          <FileText size={28} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-500 leading-6">
            {deskcripsi}
          </p>

          {isUploaded && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full">
              <CheckCircle size={14} />
              Sudah Diunggah
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        disabled={isUploading || isLocked}
      />

      {/* AKSI DOKUMEN */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
        {isUploaded ? (
          <>
            <button
              onClick={handleViewFile}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#f5f6f8] text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition font-medium text-sm md:text-base"
            >
              <Eye size={18} />
              Lihat
            </button>
            {!isLocked && (
              <button
                onClick={triggerUpload}
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-dark text-white hover:bg-blue-dark-hover transition font-medium text-sm md:text-base cursor-pointer disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCcw size={18} />}
                {isUploading ? "Proses..." : "Ganti"}
              </button>
            )}
          </>
        ) : (
          !isLocked && (
            <button
              onClick={triggerUpload}
              disabled={isUploading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-dark hover:text-blue-dark hover:bg-blue-50 transition font-medium text-sm md:text-base cursor-pointer w-full sm:w-auto min-h-[48px] disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
              {isUploading ? "Proses..." : "Unggah File"}
            </button>
          )
        )}
      </div>
    </div>
  );
}
