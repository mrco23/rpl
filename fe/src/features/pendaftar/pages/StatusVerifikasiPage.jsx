import { useState, useEffect, useMemo } from "react";
import { FaCheckCircle, FaUser, FaShieldAlt, FaBullhorn } from "react-icons/fa";
import { AlertCircle, CalendarDays, Hash } from "lucide-react";
import { getPendaftarStatus } from "../services/pendaftarService";
import { formatMediumDate } from "../../../shared/utils/dateHelper";

const STATUS_META = {
    "menunggu verifikasi": {
        label: "MENUNGGU VERIFIKASI",
        description:
            "Dokumen sudah masuk ke sistem dan sedang menunggu pemeriksaan dari panitia.",
        iconBgClass: "bg-yellow-light text-yellow-900 border border-yellow-normal/30",
        textClass: "text-yellow-900",
    },
    "perlu perbaikan": {
        label: "PERLU PERBAIKAN",
        description:
            "Ada dokumen atau data yang perlu diperbaiki. Silakan cek catatan dari panitia.",
        iconBgClass: "bg-yellow-light text-yellow-900 border border-yellow-normal/30",
        textClass: "text-yellow-900",
    },
    "unggah ulang": {
        label: "UNGGAH ULANG",
        description: "Dokumen perbaikan sudah diunggah dan menunggu pemeriksaan ulang.",
        iconBgClass: "bg-blue-light text-blue-dark border border-blue-200",
        textClass: "text-blue-dark",
    },
    terverifikasi: {
        label: "TERVERIFIKASI",
        description: "Data dan dokumen sudah diverifikasi oleh panitia.",
        iconBgClass: "bg-blue-light text-blue-dark border border-blue-200",
        textClass: "text-blue-dark",
    },
    "wawancara orang tua": {
        label: "WAWANCARA ORANG TUA",
        description: "Pendaftar masuk tahap wawancara orang tua.",
        iconBgClass: "bg-blue-light text-blue-dark border border-blue-200",
        textClass: "text-blue-dark",
    },
    lulus: {
        label: "LULUS",
        description: "Pendaftar dinyatakan lulus seleksi PPDB.",
        iconBgClass: "bg-blue-light text-blue-dark border border-blue-200",
        textClass: "text-blue-dark",
    },
    "tidak lulus": {
        label: "TIDAK LULUS",
        description: "Pendaftar belum dinyatakan lulus seleksi PPDB.",
        iconBgClass: "bg-gray-100 text-gray-700 border border-gray-300",
        textClass: "text-gray-700",
    },
};

const STEPS = [
    {
        key: "verifikasi",
        label: "Verifikasi Dokumen",
        icon: FaShieldAlt,
    },
    {
        key: "wawancara",
        label: "Wawancara",
        icon: FaUser,
    },
    {
        key: "hasil",
        label: "Hasil Akhir",
        icon: FaBullhorn,
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
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await getPendaftarStatus();
                console.log(statusData);
                setStatusData(res?.data || null);
            } catch (error) {
                console.error("Gagal mengambil status pendaftar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    const statusKey = statusData?.status_pendaftaran || "menunggu verifikasi";
    const currentStep = useMemo(() => getCurrentStepIndex(statusKey), [statusKey]);
    const statusMeta = STATUS_META[statusKey] || STATUS_META["menunggu verifikasi"];
    const progressWidth =
        STEPS.length <= 1 ? 0 : (currentStep / (STEPS.length - 1)) * 100;

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
                        Status Pendaftaran
                    </h1>
                    <p className="text-sm md:text-base leading-7 text-gray-500 mt-2 max-w-2xl">
                        Pantau proses seleksi pendaftaran Anda secara berkala.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100">
                    {/* HEADER STATUS */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-100">
                        <div
                            className={`p-4 rounded-2xl shrink ${statusMeta.iconBgClass}`}
                        >
                            <FaCheckCircle className="text-4xl" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Status Saat Ini
                            </p>
                            <h2
                                className={`text-2xl md:text-3xl font-bold uppercase ${statusMeta.textClass}`}
                            >
                                {statusMeta.label}
                            </h2>
                            <p className="text-base leading-7 text-gray-600 mt-2">
                                {statusMeta.description}
                            </p>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="grid md:grid-cols-2 gap-6 py-6 border-b border-gray-100">
                        <div className="bg-[#f5f6f8] rounded-2xl p-5 flex items-start gap-4">
                            <CalendarDays className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Tanggal Daftar
                                </p>
                                <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                                    {statusData?.tanggal_daftar
                                        ? formatMediumDate(statusData.tanggal_daftar)
                                        : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#f5f6f8] rounded-2xl p-5 flex items-start gap-4">
                            <Hash className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Gelombang
                                </p>
                                <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                                    {statusData?.gelombang?.nama || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-8 pt-8 border-t border-gray-100 relative">
                        <div className="absolute top-3.25rem left-8 right-8 h-1 bg-gray-200 rounded-full" />
                        <div
                            className="absolute top-3.25rem left-8 h-1 bg-blue-dark rounded-full transition-all duration-500"
                            style={{ width: `calc(${progressWidth}% - 4rem)` }}
                        />

                        <div className="flex justify-between relative z-10 px-2 md:px-6">
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = index === currentStep;
                                const isDone = index < currentStep;

                                return (
                                    <div
                                        key={step.key}
                                        className="flex flex-col items-center max-w-[100px] md:max-w-[150px]"
                                    >
                                        <div
                                            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all bg-white shadow-sm
                        ${
                            isDone || isActive
                                ? "border-4 border-blue-dark text-blue-dark"
                                : "border-4 border-gray-200 text-gray-400"
                        }`}
                                        >
                                            {isDone ? (
                                                <FaCheckCircle className="text-xl" />
                                            ) : (
                                                <Icon className="text-xl" />
                                            )}
                                        </div>

                                        <p
                                            className={`mt-4 text-xs md:text-sm font-medium text-center leading-tight
                        ${isDone || isActive ? "text-gray-900" : "text-gray-400"}`}
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
