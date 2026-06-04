import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  UploadCloud,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Info,
  RefreshCcw,
  Eye,
  ImageIcon,
} from "lucide-react";
import {
  getMyDocuments,
  uploadDocument,
} from "../services/dokumenService.js";
import { getPendaftarMe } from "../services/pendaftarService.js";
import { resolveDocumentUrl, extractFileNameFromUrl } from "../../../shared/utils/documentHelper.js";
import Toast from "../../../shared/components/Toast.jsx";

const DOKUMEN_WAJIB = [
  {
    key: "Ijazah atau SKL",
    title: "Rapor / Ijazah Terakhir",
    desc: "Rapor semester terakhir atau ijazah bagi lulusan",
    icon: FileText,
  },
  {
    key: "Akta Kelahiran",
    title: "Akte Kelahiran",
    desc: "Dokumen akte kelahiran asli",
    icon: FileText,
  },
  {
    key: "Kartu Keluarga",
    title: "Kartu Keluarga",
    desc: "Dokumen kartu keluarga asli",
    icon: ImageIcon,
  },
  {
    key: "Pas Foto",
    title: "Pas Foto",
    desc: "Pas foto terbaru latar belakang merah.",
    icon: ImageIcon,
  },
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

  const getDocStatus = (key) => {
    const doc = documents.find((d) => d.nama_dokumen === key);
    if (!doc) return { isUploaded: false, fileName: null, fileUrl: null };
    return {
      isUploaded: true,
      fileName: extractFileNameFromUrl(doc.jenis_dokumen),
      fileUrl: doc.jenis_dokumen,
    };
  };

  const uploadedCount = DOKUMEN_WAJIB.filter((d) => getDocStatus(d.key).isUploaded).length;
  const isLocked = pendaftar &&
    ["terverifikasi", "wawancara orang tua", "lulus", "tidak lulus"].includes(
      pendaftar.status_pendaftaran
    );
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
      <div className="max-w-6xl mx-auto w-full space-y-6">

        {/* HEADER & PROGRESS ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* HEADER TEXT */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Unggah Dokumen</h1>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Lengkapi berkas pendaftaran Anda. Pastikan dokumen terbaca dengan jelas agar proses verifikasi berjalan lancar.
            </p>
          </div>

          {/* CIRCULAR PROGRESS */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 shrink-0 min-w-[200px]">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-blue-dark transition-all duration-1000 ease-out"
                  strokeDasharray={`${(uploadedCount / DOKUMEN_WAJIB.length) * 100}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-sm font-bold text-gray-800">{Math.round((uploadedCount / DOKUMEN_WAJIB.length) * 100)}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-0.5">Kelengkapan</p>
              <p className="text-sm font-bold text-gray-800">
                <span className="text-blue-dark">{uploadedCount}</span> / {DOKUMEN_WAJIB.length} Dokumen
              </p>
            </div>
          </div>
        </div>

        {/* CATATAN DARI PANITIA */}
        {hasCatatan ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-4 items-start">
            <div className="p-2 bg-yellow-100 rounded-xl text-yellow-700 shrink-0">
              <AlertCircle size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Catatan dari Panitia:</h3>
              <p className="text-sm text-yellow-800 whitespace-pre-wrap leading-relaxed">{catatanDokumen}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-center shadow-sm">
            <div className="p-2 bg-gray-100 rounded-xl text-gray-400 shrink-0">
              <Info size={20} />
            </div>
            <p className="text-sm text-gray-500">Belum ada catatan dari verifikator.</p>
          </div>
        )}

        {/* SECTION TITLE */}
        <div>
          <h2 className="text-base font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-3">
            Dokumen Yang Diperlukan
          </h2>
        </div>

        {/* DOKUMEN CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {DOKUMEN_WAJIB.map((doc) => {
            const info = getDocStatus(doc.key);
            // derive "perlu perbaiki" — doc uploaded but has global catatan (or you can wire per-doc catatan)
            const perluperbaiki = info.isUploaded && hasCatatan;
            return (
              <DokumenCard
                key={doc.key}
                docKey={doc.key}
                title={doc.title}
                desc={doc.desc}
                Icon={doc.icon}
                isUploaded={info.isUploaded}
                fileName={info.fileName}
                fileUrl={info.fileUrl}
                perluperbaiki={perluperbaiki}
                onUploadSuccess={loadData}
                isLocked={isLocked}
                showToast={showToast}
              />
            );
          })}
        </div>

        {/* KETENTUAN */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 text-sm">Ketentuan File</h4>
          <ul className="space-y-2">
            {[
              "Format yang diterima: PDF, JPG, PNG",
              "Ukuran maksimal setiap file adalah 10 MB",
              "Pastikan dokumen terbaca jelas dan tidak terpotong",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-dark mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
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

function DokumenCard({
  docKey, title, desc, Icon,
  isUploaded, fileName, fileUrl,
  perluperbaiki, onUploadSuccess, isLocked, showToast,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("Ukuran file maksimal 10 MB", "error");
      e.target.value = null;
      return;
    }
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      showToast("Format file harus JPG, PNG, atau PDF.", "error");
      e.target.value = null;
      return;
    }
    try {
      setIsUploading(true);
      await uploadDocument(docKey, file);
      showToast(`Dokumen ${title} berhasil diunggah!`, "success");
      onUploadSuccess();
    } catch (err) {
      showToast("Gagal mengunggah: " + (err.response?.data?.message || err.message || "Unknown error"), "error");
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();
  const handleView = () => fileUrl && window.open(resolveDocumentUrl(fileUrl), "_blank");

  // Determine card state styling
  const isPerluPerbaiki = perluperbaiki && isUploaded;

  let zoneClass = "border-dashed border-2 border-blue-200 bg-blue-50";
  let zoneIconColor = "text-blue-dark";
  if (isUploaded && !isPerluPerbaiki) {
    zoneClass = "border-dashed border-2 border-green-200 bg-green-50";
    zoneIconColor = "text-green-500";
  } else if (isPerluPerbaiki) {
    zoneClass = "border-dashed border-2 border-orange-200 bg-orange-50";
    zoneIconColor = "text-orange-400";
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">

      {/* Card Top Info */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{title}</h3>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-wide bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-200">
            Wajib
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-3">{desc}</p>

        <p className="text-[10px] text-gray-400 font-medium">Format : PDF, JPG, PNG</p>
        <p className="text-[10px] text-gray-400 font-medium mb-3">Maks. 10MB</p>
      </div>

      {/* Upload Zone */}
      <div className="px-4">
        <div
          className={`${zoneClass} rounded-xl flex flex-col items-center justify-center py-7 relative cursor-pointer transition-all`}
          onClick={!isLocked ? triggerUpload : undefined}
        >
          <Icon size={40} className={zoneIconColor} strokeWidth={1.5} />
          {isUploaded && !isPerluPerbaiki && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle2 size={14} />
            </div>
          )}
          {isPerluPerbaiki && (
            <div className="absolute bottom-2 right-2 bg-orange-400 text-white rounded-full p-1">
              <AlertCircle size={14} />
            </div>
          )}
          {!isUploaded && (
            <div className="absolute bottom-2 right-2 bg-blue-dark text-white rounded-full p-1 opacity-70">
              <UploadCloud size={14} />
            </div>
          )}
        </div>
      </div>

      {/* Status & File Name */}
      <div className="px-4 pt-2 pb-1">
        {isUploaded && !isPerluPerbaiki && (
          <p className="text-xs font-bold text-green-600">Sudah diunggah</p>
        )}
        {isPerluPerbaiki && (
          <p className="text-xs font-bold text-orange-500">Perlu Perbaiki</p>
        )}
        {!isUploaded && (
          <p className="text-xs text-gray-400">Belum ada file</p>
        )}
        {isUploaded && (
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-gray-400 truncate max-w-[80%]">{fileName}</p>
            <p className="text-[10px] text-gray-400">1.2 MB</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 pt-2 space-y-2 mt-auto">
        {isUploaded && (
          <button
            onClick={handleView}
            className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer
              ${isPerluPerbaiki
                ? "border-orange-300 text-orange-600 bg-orange-50 hover:bg-orange-100"
                : "border-blue-200 text-blue-dark bg-blue-50 hover:bg-blue-100"
              }`}
          >
            <Eye size={13} />
            {isPerluPerbaiki ? "Lihat Catatan" : "Lihat File"}
          </button>
        )}

        {!isLocked && (
          <button
            onClick={triggerUpload}
            disabled={isUploading}
            className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50
              ${isUploaded
                ? "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                : "bg-blue-dark text-white hover:bg-[#253b80]"
              }`}
          >
            {isUploading
              ? <Loader2 className="animate-spin" size={13} />
              : <RefreshCcw size={13} />
            }
            {isUploading ? "Proses..." : isUploaded ? "Unggah Ulang" : "Unggah File"}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        disabled={isUploading || isLocked}
      />
    </div>
  );
}