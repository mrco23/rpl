import React, { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  ClipboardList,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  CheckCircle,
  Megaphone,
} from "lucide-react";
import { getPendaftarPengumuman } from "../../services/pendaftarPengumumanService";
import Skeleton from "../../components/ui/Skeleton";

function PendaftarPengumumanPage() {
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPendaftarPengumuman();
      setDataPengumuman(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil pengumuman:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-start ml-16">
      <div className="w-full max-w-3xl">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold uppercase">Pengumuman</h1>
        <p className="text-gray-500 mb-12">
          Informasi penting terkait proses seleksi PPDB dapat anda lihat disini.
        </p>

        {/* LIST */}
        <div className="space-y-7">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 italic text-gray-300">
                <Skeleton className="h-4 w-1/3 mb-3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : dataPengumuman.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Megaphone className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-400 font-medium">Belum ada pengumuman untuk Anda.</p>
            </div>
          ) : (
            dataPengumuman.map((item) => {
              const isOpen = openId === item.id_pengumuman;

              return (
                <div key={item.id_pengumuman} className="bg-blue-50 rounded-xl shadow-lg overflow-hidden border border-blue-100">
                  {/* HEADER */}
                  <button
                    onClick={() => toggleAccordion(item.id_pengumuman)}
                    className="w-full flex items-center justify-between p-5 hover:bg-blue-100 transition cursor-pointer"
                  >
                    <div className="flex items-start gap-5">
                      {/* ICON */}
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600">
                        <Megaphone size={28} />
                      </div>

                      {/* TEXT */}
                      <div className="text-left">
                        <h2 className="font-bold text-gray-800 text-lg">{item.judul_pengumuman}</h2>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1 font-medium">
                          <div className="flex items-center gap-1.5 bg-white/50 px-2 py-0.5 rounded">
                            <Calendar size={12} className="text-blue-500" />
                            <span>{formatDate(item.tanggal_dibuat)}</span>
                          </div>

                          <div className="flex items-center gap-1.5 bg-white/50 px-2 py-0.5 rounded">
                            <Clock size={12} className="text-blue-500" />
                            <span>{formatTime(item.tanggal_dibuat)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-2 rounded-full bg-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={20} className="text-blue-600" />
                    </div>
                  </button>

                  {/* BODY */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-white rounded-2xl p-5 shadow-inner border border-blue-50">
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{item.deksripsi}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default PendaftarPengumumanPage;

