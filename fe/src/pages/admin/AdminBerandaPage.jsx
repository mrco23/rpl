import React, { useState, useEffect } from 'react';
import {
  Users, ArrowRight, UserCircle2
} from 'lucide-react';
import AdminHeader from '../../components/features/AdminHeader';
import { NavLink } from 'react-router';
import { getAdminBeranda } from '../../services/adminDashboardService';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminBerandaPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await getAdminBeranda();
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data beranda!");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Fungsi pembantu untuk warna badge status
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || '';
    switch (s) {
      case 'menunggu_verifikasi':
      case 'menunggu verifikasi':
        return 'bg-yellow-100 text-yellow-700';
      case 'terverifikasi':
      case 'lolos':
      case 'lulus':
        return 'bg-green-100 text-green-700';
      case 'perlu perbaikan':
      case 'ditolak':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatStatusLabel = (status) => {
    return status?.replace(/_/g, ' ') || status;
  };

  const formatCardTitle = (key) => {
    const titles = {
      totalFasilitas: "Fasilitas",
      totalEkstrakurikuler: "Ekstrakurikuler",
      totalPrestasi: "Prestasi",
      totalBerita: "Berita",
      totalProgramUnggulan: "Program Unggulan",
    };
    return titles[key] || key;
  };

  return (<>
    <AdminHeader text={"Beranda Admin"} subText={"Selamat datang di dashboard admin."} />

    {error && (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
        <p>{error}</p>
      </div>
    )}

    {/* Stats Cards - Diubah ke Horizontal Scroll */}
    <div className="flex flex-nowrap overflow-x-scroll gap-6 mb-8 pb-4">
      {loading ? (
        [1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col min-w-[280px] shrink-0 snap-start border-l-4 border-l-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="w-24 h-4 mb-2" />
                <Skeleton className="w-12 h-8" />
              </div>
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
            <Skeleton className="w-32 h-4 mt-auto" />
          </div>
        ))
      ) : (
        data?.card?.map((c, index) => {
          const keyName = Object.keys(c)[0];
          const val = c[keyName];

          const cardLinks = {
            totalFasilitas: "/admin/fasilitas",
            totalEkstrakurikuler: "/admin/ekstrakurikuler",
            totalPrestasi: "/admin/prestasi",
            totalBerita: "/admin/berita",
            totalProgramUnggulan: "/admin/program",
          };

          return (
            <div key={index} className="bg-white rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-[#253b80] min-w-[280px] shrink-0 snap-start">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">{formatCardTitle(keyName)}</h3>
                  <p className="text-3xl font-semibold text-gray-800 mt-1">{val}</p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Users size={24} />
                </div>
              </div>
              <NavLink
                to={cardLinks[keyName] || "#"}
                className="text-slate-600 hover:text-blue-normal transition-colors text-sm font-medium flex items-center gap-1 mt-auto hover:underline"
              >
                Lihat Selengkapnya <ArrowRight size={16} />
              </NavLink>
            </div>
          )
        })
      )}
    </div>

    {/* Tables Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Pendaftar Terbaru Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="my-6 text-center border-b border-gray-100">
          <h2 className="text-lg font-semibold text-blue-dark">Pendaftar Terbaru</h2>
        </div>
        <div className="flex-1 px-6">
          <div className="w-full text-left">
            <div className="grid grid-cols-13 gap-4 bg-blue-light text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
              <div className="col-span-6">Nama Siswa</div>
              <div className="col-span-4">Tanggal Daftar</div>
              <div className="col-span-3 text-center">Status</div>
            </div>
            {loading ? (
              <div className="flex flex-col mt-2 gap-3">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>
            ) : data?.pendaftarTerbaru?.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Belum ada pendaftar terbaru</div>
            ) : (
              <div className="flex flex-col">
                {data?.pendaftarTerbaru?.map((app, idx) => (
                  <div key={idx} className="grid grid-cols-13 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="col-span-6 flex items-center gap-3">
                      <UserCircle2 size={40} className="text-gray-300" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{app.nama}</p>
                        <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-sm text-gray-800 font-medium">
                      {app.tanggalDaftar}
                    </div>
                    <div className="col-span-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(app.status)}`}>
                        {formatStatusLabel(app.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 text-center">
          <NavLink to="/admin/ppdb" className="text-slate-600 hover:text-blue-normal transition-colors text-sm font-semibold flex items-center justify-center gap-2 hover:underline underline-offset-4">
            Lihat Semua Pendaftar <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

      {/* Daftar Verifikator Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="my-6 text-center border-b border-gray-100">
          <h2 className="text-lg font-semibold text-blue-dark">Daftar Verifikator</h2>
        </div>
        <div className="flex-1 px-6">
          <div className="w-full text-left">
            <div className="bg-blue-light text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
              Nama
            </div>
            {loading ? (
              <div className="flex flex-col mt-2 gap-3">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>
            ) : data?.DaftarVerifikator?.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Belum ada data verifikator</div>
            ) : (
              <div className="flex flex-col">
                {data?.DaftarVerifikator?.map((verifier, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50">
                    <UserCircle2 size={40} className="text-gray-300" />
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{verifier.nama}</p>
                      <p className="text-xs text-gray-500">{verifier.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 text-center">
          <NavLink to="/admin/verifikator" className="text-slate-600 hover:text-blue-normal transition-colors text-sm font-semibold flex items-center justify-center gap-2 hover:underline underline-offset-4">
            Lihat Semua Verifikator <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

    </div>
  </>
  );
}