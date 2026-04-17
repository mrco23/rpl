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
    <div className="min-h-screen bg-gray-100 flex justify-start ml-10 p-8">
      <div className="w-full max-w-4xl">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold">Status Verifikasi</h1>
        <p className="text-gray-500 mb-6">
          Pantau proses verifikasi dokumen pendaftaran anda secara real-time.
        </p>

        {/* CARD STATUS */}
        <div className="bg-gray-200  rounded-xl shadow-sm  p-5 flex justify-between items-center">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Status Administrasi
              </p>
              <h2 className="text-green-600 text-2xl font-semibold">
                LULUS VERIFIKASI ADMINISTRASI
              </h2>
              <p className="text-sm text-gray-500">
                Selamat! Dokumen Anda telah dinyatakan lengkap dan sesuai.
              </p>
            </div>
          </div>

          
          {/* RIGHT */}
          <div className="text-right text-sm text-gray-500 space-y-1">
            <p className="font-medium">Tanggal Verifikasi</p>

            {/* tanggal + icon */}
            <div className="flex items-center justify-end gap-2">
              <FaCalendarAlt className="text-green-500" />
              <p className="text-green-600 font-semibold">
                {dataBackend.tanggal}
              </p>
            </div>

            <p>Oleh: {dataBackend.verifikator}</p>
          </div>
        </div>

        {/* STEPPER */}
        <div className="mt-10 relative">
          {/* garis abu */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-300" />

          {/* garis biru (progress) */}
          <div
            className="absolute top-5 left-0 h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />

          {/* STEPS */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const isActive = index === currentStep;
              const isDone = index < currentStep;

              return (
                <div key={step.key} className="flex flex-col items-center z-10">
                  {/* CIRCLE */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all
                    ${
                      isDone || isActive
                        ? "bg-blue-100 border-blue-500 text-blue-600"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {isDone ? <FaCheckCircle /> : <Icon />}
                  </div>

                  {/* LABEL */}
                  <p
                    className={`mt-2 text-sm text-center ${
                      isDone || isActive ? "text-gray-700" : "text-gray-400"
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
  );
}
