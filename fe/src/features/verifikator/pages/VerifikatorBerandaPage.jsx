import React, { useState, useEffect } from "react";
import {
    Users,
    Clock,
    AlertTriangle,
    CheckCircle,
    Info,
    ArrowRight,
    UserCircle2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import VerifikatorHeader from "../components/VerifikatorHeader";
import httpClient from "../../../services/httpClient.js";
import Skeleton from "../../../shared/components/Skeleton";
import formateDate from "../../../shared/utils/formateDate";

export default function VerifikatorBerandaPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBeranda();
    }, []);

    const fetchBeranda = async () => {
        try {
            setLoading(true);
            const res = await httpClient.get("/verifikator/beranda");
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
        if (s?.includes("menunggu")) return "bg-orange-100 text-orange-700";
        if (s?.includes("terverifikasi")) return "bg-green-100 text-green-700";
        if (s?.includes("perlu perbaikan") || s?.includes("revisi"))
            return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
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

            {/* Kontainer Utama Dinamis (Pas Layar di desktop) */}
            <div className="max-w-7xl mx-auto flex flex-col gap-5 px-4 xl:px-0 xl:h-[calc(100vh-110px)] pb-4">
                {/* Stats Cards (Bisa swipe horizontal) */}
                <div className="flex flex-nowrap overflow-x-auto gap-5 pb-2 shrink-0 snap-x custom-scrollbar">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="bg-white rounded-xl px-6 py-4 border border-gray-200 shadow-sm border-l-4 border-l-gray-300 min-w-[280px] sm:min-w-[300px] lg:flex-1 shrink-0 snap-start"
                              >
                                  <Skeleton className="h-4 w-24 mb-2" />
                                  <Skeleton className="h-8 w-16 mb-4" />
                                  <Skeleton className="h-4 w-20" />
                              </div>
                          ))
                        : stats.map((stat, i) => {
                              const colors = [
                                  {
                                      bg: "bg-[#fff9f0]",
                                      border: "border-l-orange-400",
                                      iconBg: "bg-orange-100",
                                      iconCol: "text-orange-500",
                                      icon: <Clock size={24} />,
                                      link: "/verifikator/menunggu",
                                  },
                                  {
                                      bg: "bg-[#fff5f5]",
                                      border: "border-l-red-400",
                                      iconBg: "bg-red-100",
                                      iconCol: "text-red-500",
                                      icon: <AlertTriangle size={24} />,
                                      link: "/verifikator/revisi",
                                  },
                                  {
                                      bg: "bg-[#f0fdf4]",
                                      border: "border-l-green-400",
                                      iconBg: "bg-green-100",
                                      iconCol: "text-green-600",
                                      icon: <CheckCircle size={24} />,
                                      link: "/verifikator/selesai",
                                  },
                                  {
                                      bg: "bg-[#f4f7ff]",
                                      border: "border-l-blue-600",
                                      iconBg: "bg-blue-100",
                                      iconCol: "text-blue-600",
                                      icon: <Users size={24} />,
                                      link: "/verifikator/pendaftar",
                                  },
                              ];
                              const config = colors[i] || colors[3];

                              return (
                                  <div
                                      key={i}
                                      className={`${config.bg} rounded-xl px-6 py-4 border border-gray-200 shadow-sm flex flex-col border-l-4 ${config.border} min-w-[280px] sm:min-w-[300px] lg:flex-1 shrink-0 snap-start`}
                                  >
                                      <div className="flex justify-between items-start mb-4">
                                          <div>
                                              <h3 className="text-gray-600 text-sm font-medium capitalize">
                                                  {stat.status}
                                              </h3>
                                              <p className="text-3xl font-bold text-gray-800 mt-1 flex items-baseline gap-1">
                                                  {stat.jumlah}{" "}
                                                  <span className="text-sm font-medium text-gray-500">
                                                      pendaftar
                                                  </span>
                                              </p>
                                          </div>
                                          <div
                                              className={`p-3 ${config.iconBg} ${config.iconCol} rounded-full`}
                                          >
                                              {config.icon}
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                </div>

                {/* Info Banner (Tidak menyusut) */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-start gap-3 shrink-0">
                    <div className="text-blue-dark mt-0.5">
                        <Info size={24} fill="#253b80" className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">Informasi</h3>
                        <p className="text-gray-600 text-sm mt-0.5">
                            Periksa dan verifikasi dokumen pendaftar dengan teliti. Jika
                            ada kekurangan, pilih "Perlu Perbaikan" dan tuliskan catatan
                            yang jelas.
                        </p>
                    </div>
                </div>

                {/* Tables Section (Mengisi sisa ruang secara dinamis) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-0">
                    {/* Pendaftar Terbaru Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[450px] xl:h-full overflow-hidden">
                        <div className="p-5 pb-3 flex justify-between items-center shrink-0">
                            <h2 className="text-lg font-bold text-slate-600">
                                Pendaftar Terbaru
                            </h2>
                        </div>
                        {/* Area Tabel (Scrollable Y/X) */}
                        <div className="flex-1 p-5 pt-0 overflow-auto custom-scrollbar">
                            <div className="w-full text-left mt-2 border-0 outline outline-blue-light-hover rounded-lg overflow-hidden min-w-[500px]">
                                <div className="grid grid-cols-12 gap-4 bg-blue-light text-gray-700 font-bold text-xs p-3 uppercase tracking-wider sticky top-0 z-10">
                                    <div className="col-span-6">Nama Siswa</div>
                                    <div className="col-span-3 text-center whitespace-nowrap">
                                        Tanggal Daftar
                                    </div>
                                    <div className="col-span-3 text-center">Status</div>
                                </div>
                                <div className="flex flex-col">
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-12 gap-4 p-3 border-b border-gray-100"
                                            >
                                                <div className="col-span-6 flex gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <div className="flex-1 space-y-2">
                                                        <Skeleton className="h-4 w-3/4" />
                                                        <Skeleton className="h-3 w-1/2" />
                                                    </div>
                                                </div>
                                                <div className="col-span-3 py-2">
                                                    <Skeleton className="h-4 w-full" />
                                                </div>
                                                <div className="col-span-3 flex justify-center py-2">
                                                    <Skeleton className="h-6 w-20 rounded" />
                                                </div>
                                            </div>
                                        ))
                                    ) : recentApplicants.length === 0 ? (
                                        <div className="p-10 text-center text-gray-400">
                                            Belum ada pendaftar terbaru
                                        </div>
                                    ) : (
                                        recentApplicants.map((app, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="col-span-6 flex items-center gap-3">
                                                    <UserCircle2
                                                        size={40}
                                                        className="text-gray-300"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-sm text-gray-800 truncate">
                                                            {app.nama}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            NISN : {app.nisn}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-span-3 text-center text-sm text-gray-800 font-medium whitespace-nowrap">
                                                    {formateDate(app.tanggalDaftar)}
                                                </div>
                                                <div className="col-span-3 text-center">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-tight whitespace-nowrap ${getStatusBadge(app.status)}`}
                                                    >
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Footer Aksi */}
                        <div className="p-4 shrink-0 border-t border-gray-100 text-center bg-gray-50/50">
                            <NavLink
                                to="/verifikator/verifikasi?filter=semua"
                                className="text-slate-600 hover:text-blue-dark-hover hover:underline underline-offset-4 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Lihat Semua Pendaftar <ArrowRight size={16} />
                            </NavLink>
                        </div>
                    </div>

                    {/* Yang Perlu Revisi Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[450px] xl:h-full overflow-hidden">
                        <div className="p-5 pb-3 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 text-red-500 rounded-full">
                                    <AlertTriangle size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-[#253b80]">
                                    Yang Perlu Perbaikan
                                </h2>
                            </div>
                        </div>
                        {/* Area Tabel (Scrollable Y/X) */}
                        <div className="flex-1 p-5 pt-0 overflow-auto custom-scrollbar">
                            <div className="w-full text-left mt-2 border-0 outline outline-blue-light-hover rounded-lg overflow-hidden min-w-[500px]">
                                <div className="grid grid-cols-12 gap-4 bg-blue-light text-gray-700 font-bold text-xs p-3 uppercase tracking-wider sticky top-0 z-10">
                                    <div className="col-span-6">Nama Siswa</div>
                                    <div className="col-span-3 text-center whitespace-nowrap">
                                        Tanggal Daftar
                                    </div>
                                    <div className="col-span-3 text-center">Aksi</div>
                                </div>
                                <div className="flex flex-col">
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-12 gap-4 p-3 border-b border-gray-100"
                                            >
                                                <div className="col-span-6 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                                <div className="col-span-3 py-2">
                                                    <Skeleton className="h-4 w-full" />
                                                </div>
                                                <div className="col-span-3 flex justify-center py-2">
                                                    <Skeleton className="h-8 w-20 rounded" />
                                                </div>
                                            </div>
                                        ))
                                    ) : revisionApplicants.length === 0 ? (
                                        <div className="p-10 text-center text-gray-400">
                                            Tidak ada pendaftar yang perlu perbaikan
                                        </div>
                                    ) : (
                                        revisionApplicants.map((app, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="col-span-6 flex flex-col justify-center min-w-0">
                                                    <p className="font-semibold text-sm text-gray-800 truncate">
                                                        {app.nama}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        NISN : {app.nisn}
                                                    </p>
                                                </div>
                                                <div className="col-span-3 text-center text-sm text-gray-800 font-medium whitespace-nowrap">
                                                    {formateDate(app.tanggalDaftar)}
                                                </div>
                                                <div className="col-span-3 text-center">
                                                    <NavLink
                                                        to={`/verifikator/verifikasi`}
                                                        className="text-blue-dark border border-blue-dark hover:bg-blue-dark-hover hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer shadow-sm"
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
                        {/* Footer Aksi */}
                        <div className="p-4 shrink-0 border-t border-gray-100 text-center bg-gray-50/50">
                            <NavLink
                                to="/verifikator/verifikasi?filter=revisi"
                                className="text-slate-600 hover:text-blue-normal hover:underline underline-offset-4 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Lihat Semua yang Perlu Revisi <ArrowRight size={16} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS untuk Scrollbar Kustom */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `,
                }}
            />
        </>
    );
}
