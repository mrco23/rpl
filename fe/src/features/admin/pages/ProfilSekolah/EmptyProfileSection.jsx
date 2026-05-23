import React from "react";
import AdminHeader from "../../components/AdminHeader";

export default function EmptyProfileSection({ onOpenCreateModal }) {
  return (
    <>
      <AdminHeader
        text="Profil Sekolah"
        subText="Atur informasi profil dasar sekolah"
      />
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl border border-gray-200 mt-6 shadow-sm mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Profil Sekolah Belum Diatur
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Data informasi institusi masih kosong, mohon isikan profil utama
          sebagai basis data web sekolah.
        </p>
        <button
          onClick={onOpenCreateModal}
          className="bg-[#253b80] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Buat Profil Awal
        </button>
      </div>
    </>
  );
}
