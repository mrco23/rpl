import React, { useState } from "react";
import {
  Trophy,
  Users,
  ClipboardList,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

function Pengumuman() {
  // DATA DUMMY
  const dataPengumuman = [
    {
      id: 1,
      key: "hasil",
      title: "Hasil Seleksi",
      icon: Trophy,
      tanggal: "20 Maret 2026",
      waktu: "14:00 WITA",
      lokasi: null,
      status: "DITERIMA",
      sekolah: "SMP Katolik St.Rafael Manado",
    },
    {
      id: 2,
      key: "wawancara",
      title: "Wawancara Orang Tua/Wali",
      icon: Users,
      tanggal: "24 Maret 2026",
      waktu: "14:00 WITA",
      lokasi: "Ruang Multimedia",
    },
    {
      id: 3,
      key: "daftar_ulang",
      title: "Daftar Ulang",
      icon: ClipboardList,
      tanggal: "27-30 Maret 2026",
      waktu: "08:00 - 14:00 WITA",
      lokasi: "Tata Usaha",
      deskripsi: "Peserta yang lulus wajib melakukan daftar ulang.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
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
          {dataPengumuman.map((item) => {
            const Icon = item.icon;
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="bg-blue-50 rounded-xl shadow-lg">
                {/* HEADER */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between rounded-xl p-4 hover:bg-blue-100 transition"
                >
                  <div className="flex items-start gap-4">
                    {/* ICON */}
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Icon className="text-gray-600" size={30} />
                    </div>

                    {/* TEXT */}
                    <div className="text-left">
                      <h2 className="font-medium">{item.title}</h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{item.tanggal}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{item.waktu}</span>
                        </div>

                        {item.lokasi && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{item.lokasi}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* BODY */}
                {isOpen && (
                  <div className="px-4 pb-5 pt-3 text-sm text-gray-600 space-y-4">
                    {/* HASIL SELEKSI */}
                    {item.key === "hasil" && (
                      <>
                        <p>
                          Selamat! Berdasarkan hasil seleksi, Anda dinyatakan :
                        </p>

                        <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="text-green-600" />
                          </div>

                          <div>
                            <p className="text-green-600 font-semibold">
                              {item.status}
                            </p>
                            <p className="text-gray-500 text-sm">
                              di {item.sekolah}
                            </p>
                          </div>
                        </div>

                        <p>
                          Terima kasih atas kepercayaan Anda. Silahkan lanjutkan
                          ke tahap berikutnya.
                        </p>
                      </>
                    )}

                    {/* WAWANCARA */}
                    {item.key === "wawancara" && (
                      <>
                        <p>
                          Kehadiran Orang Tua / Wali sangat diharapkan sesuai
                          jadwal yang ditentukan.
                        </p>

                        <div className="bg-white rounded-lg p-4">
                          <h3 className="font-semibold mb-4">
                            Detail Wawancara
                          </h3>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-500 text-xs">
                                Hari / Tanggal
                              </p>
                              <p className="font-medium">
                                Selasa, 24 Maret 2026
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-xs">Waktu</p>
                              <p className="font-medium">14:00 WITA</p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-xs">Tempat</p>
                              <p className="font-medium">
                                Ruang Multimedia
                              </p>
                            </div>
                          </div>
                        </div>

                        <p>
                          Mohon hadir 10 menit sebelum jadwal dan membawa
                          dokumen yang diperlukan.
                        </p>
                      </>
                    )}

                    

                    {/* WAWANCARA */}
                    {item.key === "daftar_ulang" && (
                      <>
                        <p>
                          Lakukan daftar ulang dengan membawa berkas yang telah ditentukan
                        </p>

                        <div className="bg-white rounded-lg p-4">
                          <h3 className="font-semibold mb-4">
                            Daftar Ulang
                          </h3>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-500 text-xs">
                                Periode
                              </p>
                              <p className="font-medium">
                                 24-27 Maret 2026
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-xs">Waktu</p>
                              <p className="font-medium">14:00 WITA</p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-xs">Tempat</p>
                              <p className="font-medium">
                                Tata usaha  
                              </p>
                            </div>
                          </div>
                        </div>

                        <p>
                          Bawa berkas fotokopi sesuai daftar persyaratan yang diberikan
                        </p>
                      </>
                    )}
                  </div>
                )}

                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pengumuman;