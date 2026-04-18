import React, { useState } from 'react';
import {
  Search, RefreshCw, ChevronRight, Lock,
  Download, Info, Check, X, ArrowRight, UserCircle2, XCircle
} from 'lucide-react';
import VerifikatorHeader from '@components/features/VerifikatorHeader';

export default function VerifikatorVerifikasiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Dummy Pendaftar
  const applicants = [
    { id: 1, name: 'Elegantia Makarawung', nisn: '00812345', date: '24 Apr 2026', status: 'Menunggu Verifikasi', action: 'Periksa', isActive: true },
    { id: 2, name: 'Selomitha Nong', nisn: '00812345', date: '24 Mar 2026', status: 'Unggah Ulang', action: 'Periksa Ulang', isActive: false },
    { id: 3, name: 'Marcois Makalew', nisn: '00812345', date: '24 Jan 2026', status: 'Perlu Perbaiki', action: 'Periksa', isActive: false },
    { id: 4, name: 'Budi Santoso', nisn: '00812345', lockedBy: 'Pak Joko', lockedTime: '10.45 Wita', status: 'Sedang Diproses', action: 'Locked', isActive: false },
    { id: 5, name: 'Reins Maindjanga', nisn: '00812345', date: '24 Feb 2026', status: 'Menunggu Verifikasi', action: 'Periksa', isActive: false },
    { id: 6, name: 'Dinda Rantung', nisn: '00812345', date: '24 Feb 2026', status: 'Menunggu Verifikasi', action: 'Periksa', isActive: false },
  ];

  // Data Dummy Dokumen
  const documents = [
    { id: 1, title: 'Rapor / Ijazah Terakhir', filename: 'Ijazah_elegantia.pdf' },
    { id: 2, title: 'Kartu Keluarga', filename: 'KK_elegantia.pdf' },
    { id: 3, title: 'Akta Kelahiran', filename: 'Akta_elegantia.pdf' },
    { id: 4, title: 'Pas Foto', filename: 'PasFoto_elegantia.pdf' },
  ];

  // Helper untuk warna badge status di list kiri
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Menunggu Verifikasi': return 'bg-orange-100 text-orange-600';
      case 'Unggah Ulang': return 'bg-teal-100 text-teal-700';
      case 'Perlu Perbaiki': return 'bg-red-100 text-red-600';
      case 'Sedang Diproses': return 'text-blue-500 font-medium';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      <VerifikatorHeader
        text="Verifikasi Dokumen PPDB"
        subText="Selamat datang di sistem verifikasi dokumen PPDB"
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 pb-8">

        {/* ================= KOLOM KIRI (Daftar Pendaftar) ================= */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[85vh]">
          <div className="p-5 border-b border-gray-100">
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-xl font-bold text-gray-900">Daftar Pendaftar</h2>
              <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Hanya menampilkan data yang perlu diverifikasi</p>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari nama / NISN..."
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-[#253b80] text-white px-3 py-1.5 rounded-md text-xs font-medium">Semua 300</button>
              <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-md text-xs font-medium">Menunggu 210</button>
              <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-md text-xs font-medium">Unggah Ulang 12</button>
              <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-md text-xs font-medium">Diproses 3</button>
            </div>
          </div>

          {/* List Pendaftar (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {applicants.map((app) => (
              <div
                key={app.id}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${app.isActive
                  ? 'bg-blue-50/50 border-blue-200'
                  : app.action === 'Locked'
                    ? 'bg-gray-100 border-gray-200 opacity-70'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-orange-200 shrink-0 flex items-center justify-center text-orange-600 font-bold overflow-hidden">
                    {app.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-900">{app.name}</span>

                    {app.action === 'Locked' ? (
                      <span className="text-[11px] text-gray-500 mt-0.5">
                        NISN : {app.nisn} <span className="mx-1">•</span> <span className={getStatusStyle(app.status)}>{app.status}</span><br />
                        Oleh : {app.lockedBy} <span className="mx-1">•</span> {app.lockedTime}
                      </span>
                    ) : (
                      <>
                        <span className="text-[11px] text-gray-500 mt-0.5">NISN : {app.nisn}</span>
                        <div className="mt-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusStyle(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">Mendaftar: {app.date}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action */}
                {app.action === 'Locked' ? (
                  <Lock size={18} className="text-gray-400 mr-2" />
                ) : (
                  <button className="flex items-center gap-1 text-blue-600 text-[11px] font-semibold px-3 py-1.5 border border-blue-200 rounded-full hover:bg-blue-50 bg-white">
                    {app.action} {app.action === 'Periksa' && <ChevronRight size={12} />}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-center items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium">«</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-100 text-blue-600 border border-blue-200 text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">5</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium">»</button>
          </div>
        </div>

        {/* ================= KOLOM KANAN (Detail Verifikasi) ================= */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[85vh] overflow-y-auto">
          <div className="p-6 lg:p-8">

            {/* Header Kanan */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Data Pendaftar</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-[#253b80] text-sm font-semibold px-4 py-2 border border-[#253b80] rounded-lg hover:bg-blue-50 transition-colors"
              >
                Lihat Data Lengkap <ArrowRight size={16} />
              </button>
            </div>

            {/* Active User Card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5 mb-6 flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 text-xl font-bold">E</div>
                <div className="flex flex-col">
                  <span className="font-bold text-base text-gray-900">Elegantia Makarawung</span>
                  <span className="text-xs text-gray-600 mt-0.5">NISN : 00812345</span>
                  <div className="mt-1 mb-1">
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold">Menunggu Verifikasi</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Mendaftar: 24 Apr 2026</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded-full mt-2">
                Sedang Diperiksa
              </span>
            </div>

            {/* Status Alert */}
            <div className="bg-[#fff9e6] border border-yellow-200 rounded-xl p-4 mb-8 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">Status saat ini :</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[11px] font-bold">Menunggu Verifikasi</span>
              </div>
              <p className="text-sm text-gray-600">Dokumen belum pernah diperiksa</p>
            </div>

            {/* Dokumen Section */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Dokumen Yang Diunggah</h3>
              <p className="text-sm text-gray-500">Periksa setiap dokumen dengan baik</p>
            </div>

            <div className="space-y-3 mb-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#253b80]">{doc.title}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{doc.filename}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#253b80] hover:bg-blue-800 text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors">
                      Lihat
                    </button>
                    <button className="p-1.5 text-[#253b80] border border-[#253b80] rounded hover:bg-blue-50 transition-colors">
                      <Download size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 bg-white mb-8 mt-2">
              <div className="mt-0.5 text-yellow-500 bg-yellow-100 p-0.5 rounded-full">
                <Info size={16} strokeWidth={2.5} />
              </div>
              <p className="text-sm text-gray-700 font-medium leading-snug">
                Pastikan semua dokumen jelas terbaca jelas dan informasi sesuai<br />sebelum memverifikasi
              </p>
            </div>

            {/* Form Catatan & Action */}
            <div className="mt-auto">
              <h3 className="text-sm font-bold text-[#253b80] mb-2">Catatan untuk Pendaftar ( Wajib jika Perbaiki)</h3>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 h-28 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 mb-6"
                placeholder="Tuliskan catatan yang jelas untuk pendaftar..."
              ></textarea>

              <div className="flex items-center gap-3 mb-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-600 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors">
                  Verifikasi <Check size={16} strokeWidth={3} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
                  Perbaiki <X size={16} strokeWidth={3} />
                </button>
              </div>

              <button className="w-full bg-[#253b80] hover:bg-blue-800 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <Download className="rotate-180" size={16} strokeWidth={2.5} />
                Simpan dan Kirim
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MODAL DATA LENGKAP ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header (Sticky) */}
            <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Lihat Data Lengkap</h2>
                <p className="text-sm text-gray-500 mt-1">Informasi lengkap pendaftar untuk keperluan verifikasi</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1">

              {/* User Highlight */}
              <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-5 mb-8 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 text-xl font-bold">E</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-gray-900">Elegantia Makarawung</span>
                    <span className="text-xs text-gray-600 mt-0.5">NISN : 00812345</span>
                    <div className="mt-1 mb-1">
                      <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold">Menunggu Verifikasi</span>
                    </div>
                    <span className="text-[11px] text-gray-500">Mendaftar: 24 Apr 2026</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded-full mt-2">
                  Sedang Diperiksa
                </span>
              </div>

              {/* Data Sections */}
              <div className="space-y-8">

                {/* Biodata */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">BIODATA SISWA</h3>
                  <div className="space-y-3">
                    <DataRow label="Nama Lengkap" value="Elegantia Makarawung" />
                    <DataRow label="NISN" value="00812345" />
                    <DataRow label="NIK" value="00812345" />
                    <DataRow label="Tempat Lahir" value="00812345" />
                    <DataRow label="Tanggal Lahir" value="00812345" />
                    <DataRow label="Jenis Kelamin" value="00812345" />
                  </div>
                </div>

                {/* Orang Tua */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">DATA ORANG TUA / WALI</h3>
                  <div className="space-y-3">
                    <DataRow label="Nama Orang Tua" value="00812345" />
                    <DataRow label="Hubungan" value="00812345" />
                    <DataRow label="NIK" value="00812345" />
                    <DataRow label="Pekerjaan" value="00812345" />
                    <DataRow label="No.HP" value="00812345" />
                  </div>
                </div>

                {/* Wali */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Wali (JIKA ADA)</h3>
                  <div className="space-y-3">
                    <DataRow label="Nama" value="00812345" />
                    <DataRow label="Hubungan" value="00812345" />
                    <DataRow label="No.HP" value="00812345" />
                  </div>
                </div>

                {/* Domisili */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">ALAMAT / DOMISILI</h3>
                  <div className="space-y-3">
                    <DataRow label="Alamat Lengkap" value="00812345" />
                    <DataRow label="kelurahan" value="00812345" />
                    <DataRow label="Kecamatan" value="00812345" />
                    <DataRow label="Kota/Kabupaten" value="00812345" />
                    <DataRow label="Provinsi" value="00812345" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Sub-komponen untuk baris data di dalam Modal agar rapi
function DataRow({ label, value }) {
  return (
    <div className="flex items-start text-[15px]">
      <div className="w-[40%] text-gray-600 font-medium">{label}</div>
      <div className="w-[5%] text-gray-600">:</div>
      <div className="w-[55%] font-semibold text-gray-900">{value}</div>
    </div>
  );
}