import { useState, useEffect, useMemo } from "react";
import {
  FaCheckCircle,
  FaUser,
  FaShieldAlt,
  FaBullhorn,
} from "react-icons/fa";
import { getPendaftarStatus } from "../../services/pendaftarService";

const STATUS_META = {
  "menunggu verifikasi": {
    label: "MENUNGGU VERIFIKASI",
    description: "Dokumen Anda sedang mengantre untuk diperiksa.",
    iconBgClass: "bg-yellow-100",
    iconTextClass: "text-yellow-600",
    titleTextClass: "text-yellow-600",
  },
  "perlu perbaikan": {
    label: "PERLU PERBAIKAN",
    description:
      "Ada dokumen yang perlu diperbaiki. Silakan cek menu Unggah Dokumen.",
    iconBgClass: "bg-red-100",
    iconTextClass: "text-red-600",
    titleTextClass: "text-red-600",
  },
  "unggah ulang": {
    label: "UNGGAH ULANG",
    description:
      "Dokumen perbaikan telah diunggah dan sedang menunggu pemeriksaan kembali.",
    iconBgClass: "bg-yellow-100",
    iconTextClass: "text-yellow-600",
    titleTextClass: "text-yellow-600",
  },
  terverifikasi: {
    label: "TERVERIFIKASI",
    description: "Dokumen valid dan lengkap. Menunggu tahap selanjutnya.",
    iconBgClass: "bg-green-100",
    iconTextClass: "text-green-600",
    titleTextClass: "text-green-600",
  },
  "wawancara orang tua": {
    label: "WAWANCARA ORANG TUA",
    description: "Silakan hadir untuk wawancara orang tua sesuai jadwal.",
    iconBgClass: "bg-blue-100",
    iconTextClass: "text-blue-600",
    titleTextClass: "text-blue-600",
  },
  lulus: {
    label: "LULUS",
    description: "Selamat! Anda dinyatakan lulus seleksi PPDB.",
    iconBgClass: "bg-green-100",
    iconTextClass: "text-green-600",
    titleTextClass: "text-green-600",
  },
  "tidak lulus": {
    label: "TIDAK LULUS",
    description: "Mohon maaf, Anda dinyatakan tidak lulus.",
    iconBgClass: "bg-red-100",
    iconTextClass: "text-red-600",
    titleTextClass: "text-red-600",
  },
};

const STEPS = [
  {
    key: "verifikasi",
    label: "Verifikasi Dokumen",
    icon: FaShieldAlt,
    description: "Pemeriksaan kelengkapan dan keabsahan dokumen.",
  },
  {
    key: "wawancara",
    label: "Wawancara",
    icon: FaUser,
    description: "Tahap wawancara orang tua pendaftar.",
  },
  {
    key: "hasil",
    label: "Hasil Akhir",
    icon: FaBullhorn,
    description: "Pengumuman hasil akhir PPDB.",
  },
];

function getCurrentStepIndex(statusKey) {
  if (
    statusKey === "menunggu verifikasi" ||
    statusKey === "perlu perbaikan" ||
    statusKey === "unggah ulang" ||
    statusKey === "terverifikasi"
  ) {
    return 0;
  }

  if (statusKey === "wawancara orang tua") {
    return 1;
  }

  if (statusKey === "lulus" || statusKey === "tidak lulus") {
    return 2;
  }

  return 0;
}

export default function StatusVerifikasiPage() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getPendaftarStatus();
        setStatus(res?.data || {});
      } catch (error) {
        console.error("Gagal mengambil status pendaftar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const statusKey = status?.status_pendaftaran || "menunggu verifikasi";
  const currentStep = useMemo(() => getCurrentStepIndex(statusKey), [statusKey]);

  const statusMeta = STATUS_META[statusKey] || STATUS_META["menunggu verifikasi"];

  const progressWidth =
    STEPS.length <= 1 ? 0 : (currentStep / (STEPS.length - 1)) * 100;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen relative">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Status Pendaftaran
        </h1>
        <p className="text-gray-500 mb-6">
          Pantau proses verifikasi dokumen pendaftaran Anda secara real-time.
        </p>

        <div className="bg-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className={`${statusMeta.iconBgClass} p-3 rounded-full`}>
                <FaCheckCircle className={`${statusMeta.iconTextClass} text-2xl`} />
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase">
                  Status Pendaftaran
                </p>
                <h2 className={`${statusMeta.titleTextClass} text-2xl font-semibold uppercase`}>
                  {statusMeta.label}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {loading ? "Memuat status..." : statusMeta.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-300" />

            <div
              className="absolute top-5 left-0 h-1 bg-blue-500 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />

            <div className="flex justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isDone = index < currentStep;

                return (
                  <div key={step.key} className="flex flex-col items-center z-10">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${isDone || isActive
                        ? "bg-blue-100 border-blue-500 text-blue-600"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                    >
                      {isDone ? <FaCheckCircle /> : <Icon />}
                    </div>

                    <p
                      className={`mt-2 text-sm text-center ${isDone || isActive ? "text-gray-700" : "text-gray-400"
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