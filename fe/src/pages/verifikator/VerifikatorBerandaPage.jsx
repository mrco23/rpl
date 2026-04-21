import React, { useState, useEffect } from 'react';
import {
  Users, Clock, AlertTriangle, CheckCircle,
  Info, ArrowRight, UserCircle2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import VerifikatorHeader from '@components/features/VerifikatorHeader';
import adminAxios from '@services/adminAxios';
import Skeleton from '@components/ui/Skeleton';

export default function VerifikatorBerandaPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeranda();
  }, []);

  const fetchBeranda = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get("/verifikator/beranda");
      // Respon: { message, data: { card: [], pendaftarTerbaru: [], pendaftarYangPerluRevisi: [] } }
      setData(res.data || null);
    } catch (error) {
      console.error("Gagal mengambil data beranda verifikator:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi pembantu warna badge status
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('menunggu')) return 'bg-orange-100 text-orange-700';
    if (s?.includes('terverifikasi')) return 'bg-green-100 text-green-700';
    if (s?.includes('perlu perbaikan') || s?.includes('revisi')) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const stats = data?.card || [];
  const recentApplicants = data?.pendaftarTerbaru || [];
  const revisionApplicants = data?.pendaftarYangPerluRevisi || [];

  return (
    <>
      <VerifikatorHeader
        text="Beranda Verifikator"
        subText="Selamat datang di sistem verifikasi dokumen PPDB"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl px-6 py-4 border border-gray-200 shadow-sm border-l-4 border-l-gray-300">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16 mb-4" />
                    <Skeleton className="h-4 w-20" />
                </div>
            ))
        ) : (
            stats.map((stat, i) => {
                const colors = [
                    { bg: 'bg-[#fff9f0]', border: 'border-l-orange-400', iconBg: 'bg-orange-100', iconCol: 'text-orange-500', icon: <Clock size={24} />, link: '/verifikator/menunggu', linkText: 'Mulai Verifikasi' },
                    { bg: 'bg-[#fff5f5]', border: 'border-l-red-400', iconBg: 'bg-red-100', iconCol: 'text-red-500', icon: <AlertTriangle size={24} />, link: '/verifikator/revisi', linkText: 'Lihat Revisi' },
                    { bg: 'bg-[#f0fdf4]', border: 'border-l-green-400', iconBg: 'bg-green-100', iconCol: 'text-green-600', icon: <CheckCircle size={24} />, link: '/verifikator/selesai', linkText: 'Lihat Selesai' },
                    { bg: 'bg-[#f4f7ff]', border: 'border-l-blue-600', iconBg: 'bg-blue-100', iconCol: 'text-blue-600', icon: <Users size={24} />, link: '/verifikator/pendaftar', linkText: 'Lihat Semua' }
                ];
                // Try to match by index if available, else use a default
                const config = colors[i] || colors[3];

                return (
                    <div key={i} className={`${config.bg} rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 ${config.border}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-gray-600 text-sm font-medium capitalize">{stat.status}</h3>
                                <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                                    {stat.jumlah} <span className="text-sm font-medium text-gray-500">siswa</span>
                                </p>
                            </div>
                            <div className={`p-3 ${config.iconBg} ${config.iconCol} rounded-full`}>
                                {config.icon}
                            </div>
                        </div>
                        <NavLink to={config.link} className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline cursor-pointer">
                            {config.linkText} <ArrowRight size={16} />
                        </NavLink>
                    </div>
                );
            })
        )}
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
            <h2 className="text-lg font-bold text-[#253b80]">Pendaftar Terbaru</h2>
            <NavLink to="/verifikator/pendaftar" className="text-[#253b80] text-xs font-semibold px-3 py-1 border border-[#253b80] rounded hover:bg-gray-50 cursor-pointer">
              Lihat Semua
            </NavLink>
          </div>
          <div className="flex-1 p-5 pt-0 overflow-x-auto custom-scrollbar">
            <div className="w-full text-left mt-4 border rounded-lg overflow-hidden min-w-[500px]">
              <div className="grid grid-cols-12 gap-4 bg-gray-50 text-gray-700 font-bold text-xs p-3 uppercase tracking-wider border-b">
                <div className="col-span-6">Nama Siswa</div>
                <div className="col-span-3 text-center whitespace-nowrap">Tanggal Daftar</div>
                <div className="col-span-3 text-center">Status</div>
              </div>
              <div className="flex flex-col">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 p-3 border-b border-gray-100">
                            <div className="col-span-6 flex gap-3"><Skeleton className="h-10 w-10 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div>
                            <div className="col-span-3 py-2"><Skeleton className="h-4 w-full" /></div>
                            <div className="col-span-3 flex justify-center py-2"><Skeleton className="h-6 w-20 rounded" /></div>
                        </div>
                    ))
                ) : recentApplicants.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">Belum ada pendaftar terbaru</div>
                ) : (
                    recentApplicants.map((app, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="col-span-6 flex items-center gap-3">
                                <UserCircle2 size={40} className="text-gray-300" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-sm text-gray-800 truncate">{app.nama}</p>
                                    <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                                </div>
                            </div>
                            <div className="col-span-3 text-center text-sm text-gray-800 font-medium whitespace-nowrap">
                                {app.tanggalDaftar}
                            </div>
                            <div className="col-span-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-tight whitespace-nowrap ${getStatusBadge(app.status)}`}>
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50 rounded-b-xl">
            <NavLink to="/verifikator/pendaftar" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline cursor-pointer">
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
              <h2 className="text-lg font-bold text-[#253b80]">Yang Perlu Revisi</h2>
            </div>
            <NavLink to="/verifikator/revisi" className="text-[#253b80] text-xs font-semibold px-3 py-1 border border-[#253b80] rounded hover:bg-gray-50 cursor-pointer">
              Lihat Semua
            </NavLink>
          </div>
          <div className="flex-1 p-5 pt-0 overflow-x-auto custom-scrollbar">
            <div className="w-full text-left mt-4 border rounded-lg overflow-hidden min-w-[500px]">
              <div className="grid grid-cols-12 gap-4 bg-gray-50 text-gray-700 font-bold text-xs p-3 uppercase tracking-wider border-b">
                <div className="col-span-6">Nama Siswa</div>
                <div className="col-span-3 text-center whitespace-nowrap">Tanggal Daftar</div>
                <div className="col-span-3 text-center">Aksi</div>
              </div>
              <div className="flex flex-col">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 p-3 border-b border-gray-100">
                            <div className="col-span-6 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
                            <div className="col-span-3 py-2"><Skeleton className="h-4 w-full" /></div>
                            <div className="col-span-3 flex justify-center py-2"><Skeleton className="h-8 w-20 rounded" /></div>
                        </div>
                    ))
                ) : revisionApplicants.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">Tidak ada pendaftar yang perlu revisi</div>
                ) : (
                    revisionApplicants.map((app, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="col-span-6 flex flex-col justify-center min-w-0">
                                <p className="font-semibold text-sm text-gray-800 truncate">{app.nama}</p>
                                <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                            </div>
                            <div className="col-span-3 text-center text-sm text-gray-800 font-medium">
                                {app.tanggalDaftar}
                            </div>
                            <div className="col-span-3 text-center">
                                <NavLink 
                                    to={`/verifikator/pendaftar/${app.nisn}`}
                                    className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer shadow-sm"
                                >
                                    Periksa
                                </NavLink>
                            </div>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50 rounded-b-xl">
            <NavLink to="/verifikator/revisi" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline cursor-pointer">
              Lihat Semua yang Perlu Revisi <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}