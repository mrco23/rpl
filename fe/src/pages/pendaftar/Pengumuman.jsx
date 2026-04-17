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
  // DATA DUMMY (siap backend)
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
      deskripsi: "Orang tua/wali diwajibkan hadir sesuai jadwal.",
    },
    {
      id: 3,
      key: "daftar_ulang",
      title: "Daftar Ulang",
      icon: ClipboardList,
      tanggal: "27-30 Maret 2026",
      waktu: "14:00 WITA",
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

        {/* LIST CARD */}
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

                  {/* ARROW */}
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* BODY */}
                {isOpen && (
                  <div className="px-4 pb-5 pt-3 text-sm text-gray-600 space-y-4">
                    {/* KHUSUS HASIL SELEKSI */}
                    {item.key === "hasil" ? (
                      <>
                        <p>
                          Selamat! Berdasarkan hasil seleksi, Anda dinyatakan :
                        </p>

                        {/* BOX STATUS */}
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
                          ke tahap berikutnya
                        </p>

                        {/* CATATAN */}
                        <div>
                          <p className="font-medium">Catatan:</p>
                          <ul className="list-disc ml-5 text-gray-500">
                            <li>
                              Informasi selanjutnya mengenai jadwal wawancara,
                              daftar ulang, dan mulai masuk sekolah dapat Anda
                              lihat di bawah ini.
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p>{item.deskripsi}</p>
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
