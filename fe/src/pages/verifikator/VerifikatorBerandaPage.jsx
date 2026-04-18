import React from 'react';
import {
  Users, Clock, AlertTriangle, CheckCircle,
  Info, ArrowRight, UserCircle2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import VerifikatorHeader from '@components/features/VerifikatorHeader';

export default function VerifikatorBerandaPage() {
  // Data dummy tabel kiri
  const recentApplicants = [
    { id: 1, name: 'Elegantia Makarawung', nisn: '008xxxxxxx', date: '24 Apr 2026', status: 'Menunggu' },
    { id: 2, name: 'Selomitha Nong', nisn: '008xxxxxxx', date: '24 Mar 2026', status: 'Terverifikasi' },
    { id: 3, name: 'Marcois Makalew', nisn: '008xxxxxxx', date: '24 Jan 2026', status: 'Perlu Revisi' },
  ];

  // Data dummy tabel kanan
  const revisionApplicants = [
    { id: 1, name: 'Marcois Makalew', nisn: '008xxxxxxx', document: 'Pas Foto' },
    { id: 2, name: 'Citra Manopo', nisn: '008xxxxxxx', document: 'Pas Foto' },
    { id: 3, name: 'Michael Tawas', nisn: '008xxxxxxx', document: 'Pas Foto' },
  ];

  // Fungsi pembantu warna badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-orange-100 text-orange-700';
      case 'Terverifikasi':
        return 'bg-green-100 text-green-700';
      case 'Perlu Revisi':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <VerifikatorHeader
        text="Beranda Verifikator"
        subText="Selamat datang di sistem verifikasi dokumen PPDB"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Card 1: Total Pendaftar */}
        <div className="bg-[#f4f7ff] rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-blue-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Total Pendaftar</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                128 <span className="text-sm font-medium text-gray-500">siswa</span>
              </p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Users size={24} />
            </div>
          </div>
          <NavLink to="/verifikator/pendaftar" className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline">
            Lihat Semua <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Card 2: Menunggu Verifikasi */}
        <div className="bg-[#fff9f0] rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-orange-400">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Menunggu Verifikasi</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                24 <span className="text-sm font-medium text-gray-500">siswa</span>
              </p>
            </div>
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full">
              <Clock size={24} />
            </div>
          </div>
          <NavLink to="/verifikator/menunggu" className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline">
            Mulai Verifikasi <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Card 3: Perlu Perbaikan */}
        <div className="bg-[#fff5f5] rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-red-400">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Perlu Perbaikan</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                12 <span className="text-sm font-medium text-gray-500">siswa</span>
              </p>
            </div>
            <div className="p-3 bg-red-100 text-red-500 rounded-full">
              <AlertTriangle size={24} />
            </div>
          </div>
          <NavLink to="/verifikator/revisi" className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline">
            Lihat yang perlu revisi <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Card 4: Terverifikasi */}
        <div className="bg-[#f0fdf4] rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-green-400">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Terverifikasi</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                128 <span className="text-sm font-medium text-gray-500">siswa</span>
              </p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <CheckCircle size={24} />
            </div>
          </div>
          <NavLink to="/verifikator/selesai" className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline">
            Lihat Semua <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-start gap-3 mb-8">
        <div className="text-blue-dark mt-0.5">
          <Info size={24} fill="#253b80" className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Informasi</h3>
          <p className="text-gray-600 text-sm mt-0.5">
            Periksa dan verifikasi dokumen pendaftar dengan teliti. Jika ada kekurangan, pilih "Perlu Revisi" dan tuliskan catatan yang jelas.
          </p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Pendaftar Terbaru Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-blue-dark">Pendaftar Terbaru</h2>
            <button className="text-blue-dark text-xs font-semibold px-3 py-1 border border-blue-dark rounded hover:bg-gray-50">
              Lihat Semua
            </button>
          </div>
          <div className="flex-1 p-5 pt-0">
            <div className="w-full text-left mt-4">
              <div className="grid grid-cols-12 gap-4 bg-blue-light text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
                <div className="col-span-6">Nama Siswa</div>
                <div className="col-span-3">Tanggal Daftar</div>
                <div className="col-span-3 text-center">Status</div>
              </div>
              <div className="flex flex-col">
                {recentApplicants.map((app) => (
                  <div key={app.id} className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="col-span-6 flex items-center gap-3">
                      <UserCircle2 size={40} className="text-gray-300" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{app.name}</p>
                        <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-sm text-gray-800 font-medium">
                      {app.date}
                    </div>
                    <div className="col-span-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 text-center">
            <NavLink to="/verifikator/pendaftar" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline">
              Lihat Semua Pendaftar <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>

        {/* Yang Perlu Revisi Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-500 rounded-full">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-lg font-bold text-blue-dark">Yang Perlu Revisi</h2>
            </div>
            <button className="text-blue-dark text-xs font-semibold px-3 py-1 border border-blue-dark rounded hover:bg-gray-50">
              Lihat Semua
            </button>
          </div>
          <div className="flex-1 p-5 pt-0">
            <div className="w-full text-left mt-4">
              <div className="grid grid-cols-12 gap-4 bg-blue-light text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
                <div className="col-span-6">Nama Siswa</div>
                <div className="col-span-3 text-center">Dokumen</div>
                <div className="col-span-3 text-center">Aksi</div>
              </div>
              <div className="flex flex-col">
                {revisionApplicants.map((app) => (
                  <div key={app.id} className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="col-span-6 flex flex-col justify-center">
                      <p className="font-semibold text-sm text-gray-800">{app.name}</p>
                      <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                    </div>
                    <div className="col-span-3 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        {app.document}
                      </span>
                    </div>
                    <div className="col-span-3 text-center">
                      <button className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-xs font-semibold transition-colors">
                        Periksa Ulang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 text-center">
            <NavLink to="/verifikator/revisi" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline">
              Lihat Semua yang Perlu Revisi <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>

      </div>
    </>
  );
}