import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  Megaphone,
  Info
} from "lucide-react";
import { getPendaftarPengumuman } from "../services/pendaftarPengumumanService";
import { formatMediumDate } from "../../../shared/utils/dateHelper";

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
    return formatMediumDate(dateString);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 py-8 md:py-10 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-dark border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 py-8 md:py-10 font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* HEADER MESSAGE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Pengumuman
          </h1>
          <p className="text-sm md:text-base leading-7 text-gray-500 mt-2 max-w-2xl">
            Informasi penting terkait proses seleksi PPDB dapat Anda lihat di sini.
          </p>
        </div>

        <div className="space-y-6">
          {dataPengumuman.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 shadow-card border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-light/50 p-6 rounded-full mb-4">
                <Megaphone className="text-blue-dark" size={48} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                Belum ada pengumuman.
              </h3>
              <p className="text-sm md:text-base leading-7 text-gray-500">
                Pengumuman dari panitia akan tampil di halaman ini.
              </p>
            </div>
          ) : (
            dataPengumuman.map((item) => {
              const isOpen = openId === item.id_pengumuman;

              return (
                <div
                  key={item.id_pengumuman}
                  className="bg-white rounded-3xl shadow-card overflow-hidden border border-gray-100 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(item.id_pengumuman)}
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 hover:bg-blue-light/60 transition cursor-pointer gap-4 text-left"
                  >
                    <div className="flex items-start gap-4 flex-1 w-full">
                      <div className="bg-blue-light text-blue-dark p-3 rounded-2xl shrink-0 mt-0.5 md:mt-0">
                        <Info size={28} />
                      </div>

                      <div className="flex-1 w-full pr-4">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-yellow-light text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
                            Info PPDB
                          </span>
                        </div>
                        <h2 className="font-semibold text-gray-900 text-lg md:text-xl leading-snug">
                          {item.judul_pengumuman}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            <span>{formatDate(item.tanggal_dibuat)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={16} />
                            <span>{formatTime(item.tanggal_dibuat)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-2 rounded-full bg-[#f5f6f8] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <ChevronDown size={24} className="text-gray-500" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-[#f5f6f8] rounded-2xl p-6 border border-gray-200/60">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                          {item.deksripsi}
                        </p>
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
