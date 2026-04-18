import React from 'react';
import { Edit2, CloudUpload, Upload } from 'lucide-react';
import AdminHeader from '@components/features/AdminHeader';

export default function AdminProfilSekolahPage() {
  return (
    <>
      <AdminHeader
        text="Profil Sekolah"
        subText="Lorem Ipsum dolor lorem ipsum dolor gipsum"
      />

      {/* Grid Layout untuk Card Formulir */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* KOLOM KIRI (Informasi Sekolah & Kepala Sekolah) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Card Informasi Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-dark uppercase">Informasi Sekolah</h2>
              <button className="flex items-center gap-2 bg-blue-dark hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Edit2 size={16} />
                Ubah
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  defaultValue="SMP Katolik St. Rafael Manado"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Sekolah</label>
                <textarea
                  defaultValue="Jl. jalan nomor keberpaa ..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                <textarea
                  defaultValue="Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
                <textarea
                  defaultValue="Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Card Kepala Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-dark">Kepala Sekolah</h2>
              <button className="flex items-center gap-2 bg-blue-dark hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Edit2 size={16} />
                Ubah
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah</label>
                <input
                  type="text"
                  defaultValue="Marcois Makalew"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata sambutan Kepala Sekolah</label>
                <textarea
                  defaultValue="Selamat datang...."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
                <div className="text-right text-xs text-gray-400 mt-1">0/500</div>
              </div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (Logo Sekolah & Kontak) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Card Logo Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-blue-dark">Logo Sekolah</h2>
              <p className="text-sm text-gray-500">Unggah logo resmi sekolah</p>
            </div>

            <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl h-64 flex flex-col items-center justify-center text-blue-400 mb-4 cursor-pointer hover:bg-blue-50 transition-colors">
              <CloudUpload size={48} strokeWidth={1.5} />
              {/* Tambahkan elemen input type file hidden di sini nanti */}
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-blue-dark hover:bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors mt-auto">
              <Upload size={18} />
              Unggah
            </button>
          </div>

          {/* Card Kontak Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-dark">Kontak Sekolah</h2>
              <button className="flex items-center gap-2 bg-blue-dark hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Edit2 size={16} />
                Ubah
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                    +62
                  </span>
                  <input
                    type="text"
                    className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Sekolah</label>
                <input
                  type="email"
                  defaultValue="contoh@gmail.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}