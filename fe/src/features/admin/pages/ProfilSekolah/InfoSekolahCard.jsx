import React from "react";
import { Edit2 } from "lucide-react";
import Skeleton from "../../../../shared/components/Skeleton.jsx";

export default function InfoSekolahCard({ loading, profile, onOpenInfo }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#253b80] uppercase">
          Informasi Sekolah
        </h2>
        <button
          onClick={onOpenInfo}
          disabled={loading}
          className="flex items-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Edit2 size={16} />
          Ubah
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Sekolah
          </label>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <input
              type="text"
              value={profile?.nama_sekolah || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
              readOnly
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visi
          </label>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <textarea
              value={profile?.visi || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
              readOnly
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Misi
          </label>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <textarea
              value={profile?.misi || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-30 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
              readOnly
            />
          )}
        </div>
        <div className="flex items-center justify-center w-full gap-5">
          <div className="w-1/6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Akreditasi
            </label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <input
                type="text"
                value={profile?.akreditasi || ""}
                className="w-full text-center font-bold border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                readOnly
              />
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor SK Akreditasi
            </label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <input
                type="text"
                value={profile?.nomor_sk_akreditasi || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
