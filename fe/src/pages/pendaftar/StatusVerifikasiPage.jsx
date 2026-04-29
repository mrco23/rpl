import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaUser,
  FaFileAlt,
  FaShieldAlt,
  FaBullhorn,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import { getPendaftarStatus } from "../../services/pendaftarService";

export default function StatusVerifikasiPage() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    async function getStatus() {
      const res = await getPendaftarStatus();
      setStatus(res.data);
    }
    getStatus();
  }, []);
  // STEP CONFIG (JANGAN DIUBAH SEMBARANG)\
  const steps = [
    {
      key: "akun",
      label: "Akun Dibuat",
      icon: FaUser,
      keterangan:
        "Tahap ini menandakan bahwa akun pengguna telah berhasil dibuat.",
    },
    {
      key: "dokumen",
      label: "Unggah dokumen",
      icon: FaFileAlt,
      keterangan: "Mengunggah dokumen yang diperlukan.",
    },
    {
      key: "menunggu verifikasi",
      label: "menunggu verifikasi",
      icon: FaUser,
      keterangan: "Menunggu verifikasi data pendaftaran.",
    },
    {
      key: "verifikasi",
      label: "Verifikasi",
      icon: FaShieldAlt,
      keterangan: "Verifikasi dokumen pendaftaran.",
    },
    {
      key: "pengumuman",
      label: "PendaftarPengumumanPage Hasil",
      icon: FaBullhorn,
      keterangan: "PendaftarPengumumanPage hasil pendaftaran.",
    },
    {
      key: "daftar_ulang",
      label: "Daftar Ulang",
      icon: FaClipboardList,
      keterangan: "Daftar ulang pendaftaran.",
    },
  ];

  // SIMULASI DATA BACKEND
  const dataBackend = {
    status: status.status_pendaftaran,
  };

  const statusKey = dataBackend.status;

  // CONVERT KE INDEX
  const currentStep = steps.findIndex((s) => s.key === statusKey);

  // PROGRESS WIDTH
  const progressWidth =
    currentStep <= 0 ? 0 : (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen relative">
      <div className="w-full max-w-5xl">
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-semibold">
          Status Pendaftaran
        </h1>
        <p className="text-gray-500 mb-6">
          Pantau proses verifikasi dokumen pendaftaran anda secara real-time.
        </p>

        {/* CARD STATUS */}
        <div className="bg-gray-200  rounded-xl shadow-sm  p-5 flex justify-between items-center">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div
              className={`bg-${status.status_pendaftaran === "menunggu verifikasi" ? "yellow" : "green"}-100 p-3 rounded-full`}
            >
              <FaCheckCircle
                className={`text-${status.status_pendaftaran === "menunggu verifikasi" ? "yellow" : "green"}-600 text-2xl`}
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Status Pendaftaran
              </p>
              <h2
                className={`text-${status.status_pendaftaran === "menunggu verifikasi" ? "yellow" : "green"}-600 text-2xl font-semibold uppercase`}
              >
                {status.status_pendaftaran}
              </h2>
              <p className="text-sm text-gray-500">
                {steps.find((s) => s.key === statusKey)?.keterangan}
              </p>
            </div>
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
