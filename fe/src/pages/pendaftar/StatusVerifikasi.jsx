import React from "react";
import {
  FaCheckCircle,
  FaUser,
  FaFileAlt,
  FaShieldAlt,
  FaBullhorn,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

export default function StatusVerifikasi() {
  // STEP CONFIG (JANGAN DIUBAH SEMBARANG)
  const steps = [
    { key: "akun", label: "Akun Dibuat", icon: FaUser },
    { key: "dokumen", label: "Unggah dokumen", icon: FaFileAlt },
    { key: "verifikasi", label: "Verifikasi", icon: FaShieldAlt },
    { key: "pengumuman", label: "Pengumuman Hasil", icon: FaBullhorn },
    { key: "daftar_ulang", label: "Daftar Ulang", icon: FaClipboardList },
  ];

  // SIMULASI DATA BACKEND
  const dataBackend = {
    status: "verifikasi", // ubah ini nanti dari API
    tanggal: "20 Juni 2026, 14:30",
    verifikator: "Tim Verifikator",
  };

  const statusKey = dataBackend.status;

  // CONVERT KE INDEX
  const currentStep = steps.findIndex((s) => s.key === statusKey);

  // PROGRESS WIDTH
  const progressWidth =
    currentStep <= 0 ? 0 : (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl py-6">
        {/* TITLE */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#253b80]">Status Verifikasi</h1>
            <p className="text-gray-500 mt-1">
            Pantau proses verifikasi dokumen pendaftaran anda secara real-time.
            </p>
        </div>

        {/* CARD STATUS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* LEFT */}
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-4 rounded-2xl shrink-0">
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">
                Status Administrasi
              </p>
              <h2 className="text-gray-900 text-xl sm:text-2xl font-extrabold leading-tight mb-1">
                LULUS VERIFIKASI ADMINISTRASI
              </h2>
              <p className="text-sm text-gray-600">
                Selamat! Dokumen Anda telah dinyatakan lengkap dan sesuai.
              </p>
            </div>
          </div>
          
          {/* RIGHT */}
          <div className="w-full md:w-auto text-left md:text-right text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
            <p className="font-bold text-gray-400 uppercase text-[10px] tracking-wider mb-2">Informasi Verifikasi</p>
            
            <div className="flex items-center md:justify-end gap-2 mb-1">
              <FaCalendarAlt className="text-green-500" />
              <p className="text-gray-900 font-bold">
                {dataBackend.tanggal}
              </p>
            </div>

            <p className="text-xs font-medium">Diverifikasi oleh: <span className="text-gray-900">{dataBackend.verifikator}</span></p>
          </div>
        </div>

        {/* STEPPER */}
        <div className="mt-12 overflow-x-auto pb-8 pt-4 custom-scrollbar">
          <div className="min-w-[600px] relative px-4">
            {/* garis abu */}
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200" />

            {/* garis biru (progress) */}
            <div
                className="absolute top-6 left-0 h-1 bg-blue-600 transition-all duration-700 ease-in-out"
                style={{ width: `${progressWidth}%` }}
            />

            {/* STEPS */}
            <div className="flex justify-between relative">
                {steps.map((step, index) => {
                const Icon = step.icon;

                const isActive = index === currentStep;
                const isDone = index < currentStep;

                return (
                    <div key={step.key} className="flex flex-col items-center z-10 w-24">
                        {/* CIRCLE */}
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300
                            ${
                            isDone || isActive
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                        >
                            {isDone ? <FaCheckCircle size={20} /> : <Icon size={18} />}
                        </div>

                        {/* LABEL */}
                        <p
                            className={`mt-4 text-xs font-bold text-center uppercase tracking-tighter ${
                            isDone || isActive ? "text-[#253b80]" : "text-gray-400"
                            }`}
                        >
                            {step.label}
                        </p>
                    </div>
                );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
