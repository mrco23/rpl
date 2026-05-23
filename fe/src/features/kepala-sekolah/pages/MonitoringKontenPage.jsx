import React, { useState, useEffect } from "react";
import { Eye, ShieldAlert, Newspaper, Medal, Building2, BookOpen, ActivitySquare } from "lucide-react";
import { Link } from "react-router-dom";
import { requestAPI } from "../../../services/httpClient";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

export default function MonitoringKontenPage() {
  const [counts, setCounts] = useState({
    berita: 0,
    prestasi: 0,
    fasilitas: 0,
    program: 0,
    ekstrakurikuler: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Menggunakan endpoint public untuk mendapatkan daftar konten dan menghitung jumlahnya
      const [beritaRes, prestasiRes, fasilitasRes, programRes, ekskulRes] = await Promise.all([
        requestAPI({ method: "GET", url: "/berita" }).catch(() => ({ data: { data: [] } })),
        requestAPI({ method: "GET", url: "/prestasi" }).catch(() => ({ data: { data: [] } })),
        requestAPI({ method: "GET", url: "/fasilitas" }).catch(() => ({ data: { data: [] } })),
        requestAPI({ method: "GET", url: "/program-unggulan" }).catch(() => ({ data: { data: [] } })),
        requestAPI({ method: "GET", url: "/ekstrakurikuler" }).catch(() => ({ data: { data: [] } }))
      ]);

      setCounts({
        berita: beritaRes.data?.data?.length || 0,
        prestasi: prestasiRes.data?.data?.length || 0,
        fasilitas: fasilitasRes.data?.data?.length || 0,
        program: programRes.data?.data?.length || 0,
        ekstrakurikuler: ekskulRes.data?.data?.length || 0
      });
    } catch (error) {
      console.error("Gagal mengambil data monitoring:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuKonten = [
    {
      title: "Profil Sekolah",
      desc: "Visi, misi, sejarah, sambutan kepala sekolah, dan kontak",
      count: "Aktif",
      icon: ShieldAlert,
      link: "/sejarah",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Berita",
      desc: "Publikasi artikel, informasi terkini, dan aktivitas sekolah",
      count: counts.berita,
      icon: Newspaper,
      link: "/berita",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Prestasi",
      desc: "Daftar penghargaan akademik dan non-akademik siswa",
      count: counts.prestasi,
      icon: Medal,
      link: "/prestasi",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      title: "Fasilitas",
      desc: "Sarana dan prasarana penunjang kegiatan belajar mengajar",
      count: counts.fasilitas,
      icon: Building2,
      link: "/fasilitas",
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    {
      title: "Program Unggulan",
      desc: "Program khusus dan unggulan yang ditawarkan sekolah",
      count: counts.program,
      icon: BookOpen,
      link: "/program",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Ekstrakurikuler",
      desc: "Klub dan kegiatan pengembangan bakat minat siswa",
      count: counts.ekstrakurikuler,
      icon: ActivitySquare,
      link: "/ekstrakurikuler",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      
      {/* HEADER */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-card border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Monitoring Konten Website</h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
            Kepala sekolah dapat memantau konten yang tampil di website. Pengelolaan konten tetap dilakukan oleh admin.
          </p>
        </div>
      </div>

      {/* ALERT / INFO NOTE */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl flex items-start gap-3 shadow-sm">
        <ShieldAlert className="text-yellow-500 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-yellow-800 text-sm font-medium">Informasi Akses</p>
          <p className="text-yellow-700 text-sm mt-1">
            Kepala sekolah hanya memantau konten. Fitur tambah, edit, dan hapus tetap berada pada akun admin.
          </p>
        </div>
      </div>

      {/* GRID KONTEN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {menuKonten.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                  <Icon size={24} />
                </div>
                <div className="bg-blue-light text-blue-dark text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {typeof item.count === 'number' ? `${item.count} Konten` : item.count}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed min-h-[40px]">{item.desc}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <Link 
                  to={item.link} 
                  target="_blank" // Membuka preview ke halaman public yang dapat dilihat user
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f5f6f8] text-gray-700 rounded-xl text-sm font-semibold hover:bg-blue-dark hover:text-white transition-colors cursor-pointer"
                >
                  <Eye size={18} /> Lihat Konten
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
