import React from "react";
import { CloudUpload, Upload } from "lucide-react";
import Skeleton from "../../../../shared/components/Skeleton.jsx";
import { getImageUrl } from "../../../../shared/utils/imageHelper.js";

export default function LogoSekolahCard({
  loading,
  profile,
  previewLogo,
  selectedImage,
  uploadingImg,
  fileInputRef,
  onLogoSelect,
  onLogoUpload,
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#253b80]">
          Foto Kepala Sekolah
        </h2>
        <p className="text-sm text-gray-500">
          Unggah foto kepala sekolah
        </p>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full mb-4" />
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl h-80 flex flex-col items-center justify-center text-blue-400 mb-4 cursor-pointer hover:bg-blue-50 transition-colors overflow-hidden relative"
        >
          {previewLogo || (profile?.foto_kepala_sekolah && !profile.foto_kepala_sekolah.includes('null')) ? (
            <img
              src={previewLogo || getImageUrl(profile?.foto_kepala_sekolah)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <CloudUpload size={48} strokeWidth={1.5} />
              <span className="text-sm mt-2 font-medium">
                Gambar tidak ada
              </span>
              <span className="text-xs mt-1 opacity-70">
                Klik untuk memilih file
              </span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={onLogoSelect}
          />
        </div>
      )}

      <button
        onClick={onLogoUpload}
        disabled={loading || uploadingImg || !selectedImage}
        className="w-full flex items-center justify-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors mt-auto disabled:bg-gray-400 cursor-pointer"
      >
        <Upload size={18} />
        {uploadingImg ? "Mengunggah..." : "Unggah"}
      </button>
    </div>
  );
}
