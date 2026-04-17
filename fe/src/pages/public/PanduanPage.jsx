import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { FaCalendarAlt, FaCheck, FaThumbtack } from "react-icons/fa";

export default function PanduanPage() {
  const steps = [
    "Isi formulir pendaftaran secara online",
    "Upload dokumen yang dibutuhkan",
    "Verifikasi data oleh panitia",
    "Pengumuman hasil seleksi",
    "Daftar ulang",
  ];

  const syarat = [
    "Fotokopi Akta Kelahiran",
    "Fotokopi Kartu Keluarga",
    "Pas Foto 3x4",
    "Ijazah",
  ];

  return (
    <>
      <div className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 px-6 md:px-16 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Panduan</h2>
      </div>
      <main className="px-6 md:px-10 pb-10 md:pl-16">
        {/* Badge */}
        <div className="bg-[#f5f6f8] rounded-xl px-4 py-3 w-fit mb-6 flex items-center gap-3 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
          <FaCalendarAlt className="text-blue-600 text-lg" />
          <div>
            <p className="text-md font-medium">Pendaftaran Dibuka</p>
            <p className="text-xs text-blue-600">30 maret - 13 juni 2026</p>
          </div>
        </div>

        {/* Card Alur */}
        <div className="bg-[#f5f6f8] rounded-2xl p-5 mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.08)] max-w-5xl ">
          <h3 className="font-semibold text-2xl text-blue-800">
            Alur Pendaftaran PPDB
          </h3>
          <p className="text-md  text-gray-900">
            Alur sistem dibuat sederhana, tetapi pengguna tetap perlu memahami
            urutan proses agar tidak salah langkah.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 ">
          {/* LEFT - Steps */}
          <div className="md:col-span-2 space-y-6">
            <div className="max-w-xl">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f5f6f8] rounded-2xl px-6 py-6 flex items-center gap-4 
        shadow-[0_8px_20px_rgba(0,0,0,0.15)] mb-10"
                >
                  {/* Nomor */}
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-full font-semibold text-lg">
                    {index + 1}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="font-semibold text-blue-700 text-base">
                      Langkah {index + 1}
                    </p>
                    <p className="text-md text-gray-500">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* RIGHT - Syarat */}
          <div className="bg-red-50 rounded-2xl p-10 h-fit border-l-4 border-red-500 shadow-[0_4px_10px_rgba(0,0,0,0.08)] md:-ml-11">
            <div className="flex items-center gap-2 mb-4 text-red-600 font-semibold">
              <FaThumbtack />
              <p className="text-3xl">Syarat Pendaftaran</p>
            </div>

            <ul className="space-y-3">
              {syarat.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-md text-gray-700"
                >
                  <FaCheck className="text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
