import React, { useState } from "react";
import {
  Search,
  Eye,
  Download,
  ChevronRight,
  Check,
  X,
  Save,
  UserCircle,
} from "lucide-react";

function VerifikasiDokumen({ totalPages = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const applicants = [
    {
      name: "Elegantia Makarawung",
      nisn: "00812345",
      status: "Menunggu Verifikasi",
      date: "24 Apr 2026",
      active: true,
    },
    {
      name: "Selomitha Nong",
      nisn: "00812346",
      status: "Menunggu Verifikasi",
      date: "24 Mar 2026",
    },
    {
      name: "Marcois Makalew",
      nisn: "00812347",
      status: "Perlu Revisi",
      date: "24 Jan 2026",
    },
    {
      name: "Marcois Makalew",
      nisn: "00812347",
      status: "Perlu Revisi",
      date: "24 Jan 2026",
    },
    {
      name: "Marcois Makalew",
      nisn: "00812347",
      status: "Perlu Revisi",
      date: "24 Jan 2026",
    },
    {
      name: "Marcois Makalew",
      nisn: "00812347",
      status: "Perlu Revisi",
      date: "24 Jan 2026",
    },
  ];

  const docs = [
    "Rapor / Ijazah Terakhir",
    "Kartu Keluarga",
    "Akta Kelahiran",
    "Pas Foto",
  ];

  return (
    <div className="p-7 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Beranda Verifikator
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Selamat datang di sistem verifikasi dokumen PPDB
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* LEFT */}
        <div className="col-span-5 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Daftar Pendaftar
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Hanya menampilkan data yang perlu diverifikasi
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <input
              type="text"
              placeholder="Cari nama / NISN..."
              className="w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none"
            />
            <Search
              size={18}
              className="absolute right-3 top-3.5 text-gray-400"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 mt-4">
            <button className="px-2 py-1 rounded-lg bg-blue-700 text-white text-xs cursor-pointer">
              Semua 300
            </button>

            <button className="px-2 py-1 rounded-lg bg-gray-100 text-xs cursor-pointer">
              Menunggu 210
            </button>

            <button className="px-2 py-1 rounded-lg bg-gray-100 text-xs cursor-pointer">
              Unggah Ulang 12
            </button>

            <button className="px-2 py-1 rounded-lg bg-gray-100 text-xs cursor-pointer">
              Diproses 3
            </button>
          </div>

          <div className="flex gap-2 justify-center mt-5">
            {/* Tombol prev */}
            <button
              onClick={goPrev}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              {"<<"}
            </button>

            {/* Angka halaman */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Tombol next */}
            <button
              onClick={goNext}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              {">>"}
            </button>
          </div>

          {/* List */}
          <div className="space-y-3 mt-5">
            {applicants.map((item, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-4 flex justify-between items-center ${
                  item.active ? "bg-blue-50 border-blue-300" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">
                    <UserCircle size={34} className="text-pink-500" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500">NISN : {item.nisn}</p>

                    <p className="text-xs text-orange-500 mt-1">
                      {item.status}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Mendaftar : {item.date}
                    </p>
                  </div>
                </div>

                <button className="text-xs border px-3 py-1 rounded-lg text-blue-700">
                  Periksa
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-7 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Data Pendaftar</h2>

            <button className="border px-3 py-2 rounded-lg text-sm text-blue-700">
              Lihat Data Lengkap
            </button>
          </div>

          {/* Profile */}
          <div className="mt-5 border rounded-2xl p-4 bg-blue-50">
            <h3 className="font-semibold text-slate-800">
              Elegantia Makarawung
            </h3>
            <p className="text-sm text-gray-500 mt-1">NISN : 00812345</p>
            <p className="text-sm text-gray-500">Mendaftar : 24 Apr 2026</p>

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-700 text-white text-xs">
              Sedang Diperiksa
            </span>
          </div>

          {/* Status */}
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="text-sm text-gray-700">
              Status saat ini :
              <span className="text-yellow-700 font-semibold ml-2">
                Menunggu Verifikasi
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Dokumen belum pernah diperiksa
            </p>
          </div>

          {/* Dokumen */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-800">
              Dokumen Yang Diunggah
            </h3>

            <p className="text-sm text-gray-500">
              Periksa setiap dokumen dengan baik
            </p>

            <div className="space-y-3 mt-4">
              {docs.map((doc, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium text-slate-800">{doc}</h4>
                    <p className="text-xs text-gray-500">
                      file-{index + 1}.pdf
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      <Eye size={16} />
                      Lihat
                    </button>

                    <button className="border px-3 py-2 rounded-lg text-blue-700">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-6">
            <label className="font-semibold text-slate-800">
              Catatan untuk Pendaftar
            </label>

            <textarea
              rows="5"
              placeholder="Tuliskan catatan yang jelas..."
              className="w-full mt-3 border rounded-2xl p-4 outline-none resize-none"
            ></textarea>
          </div>

          {/* Action */}
          <div className="flex gap-3 mt-5">
            <button className="px-5 py-3 rounded-xl border border-green-500 text-green-700 flex items-center gap-2">
              <Check size={18} />
              Verifikasi
            </button>

            <button className="px-5 py-3 rounded-xl border border-red-500 text-red-700 flex items-center gap-2">
              <X size={18} />
              Perbaiki
            </button>

            <button className="flex-1 px-5 py-3 rounded-xl bg-blue-700 text-white flex items-center justify-center gap-2">
              <Save size={18} />
              Simpan dan Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifikasiDokumen;
