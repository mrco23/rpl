import React, { useState, useEffect } from "react";
import { getBerandaSummary } from "../services/kepalaSekolahService";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import {
    Users,
    FileCheck,
    UserX,
    UserCheck,
    UserCog,
    ClipboardCheck,
    BookOpen,
    UserCircle,
    Calendar,
} from "lucide-react";

export default function BerandaKepalaSekolah() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await getBerandaSummary();
            setData(result);
        } catch (err) {
            setError("Gagal mengambil data beranda kepala sekolah.");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-red-500 font-medium mb-4">{error}</div>
                <button
                    onClick={fetchData}
                    className="px-4 py-2 bg-blue-dark text-white rounded-lg hover:bg-blue-dark-hover transition-colors cursor-pointer"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                Belum ada data yang tersedia.
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* 1. HEADER CARD BIRU */}
            <div className="bg-blue-dark text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                    <BookOpen size={250} />
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                        Beranda Kepala Sekolah
                    </h1>
                    <p className="text-blue-100 text-sm md:text-base max-w-xl">
                        Ringkasan Manajerial PPDB
                    </p>
                </div>
            </div>

            {/* 2. KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KpiCard
                    title="Total Pendaftar"
                    value={data.total_pendaftar}
                    icon={Users}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <KpiCard
                    title="Kuota Total"
                    value={data.kuota_total}
                    icon={ClipboardCheck}
                    color="text-indigo-600"
                    bg="bg-indigo-50"
                />
                <KpiCard
                    title="Lulus"
                    value={data.lulus}
                    icon={UserCheck}
                    color="text-green-600"
                    bg="bg-green-50"
                />
                <KpiCard
                    title="Tidak Lulus"
                    value={data.tidak_lulus}
                    icon={UserX}
                    color="text-red-600"
                    bg="bg-red-50"
                />

                <KpiCard
                    title="Menunggu Verifikasi"
                    value={data.menunggu_verifikasi}
                    icon={FileCheck}
                    color="text-yellow-600"
                    bg="bg-yellow-50"
                />
                <KpiCard
                    title="Terverifikasi"
                    value={data.terverifikasi}
                    icon={FileCheck}
                    color="text-teal-600"
                    bg="bg-teal-50"
                />
                <KpiCard
                    title="Perlu Perbaikan"
                    value={data.perlu_perbaikan}
                    icon={UserCog}
                    color="text-orange-600"
                    bg="bg-orange-50"
                />
                <KpiCard
                    title="Wawancara Ortu"
                    value={data.wawancara_orang_tua}
                    icon={UserCircle}
                    color="text-purple-600"
                    bg="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3. REKAP STATUS PENDAFTARAN */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 h-full">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">
                        Rekap Status Pendaftaran
                    </h2>
                    <div className="space-y-5">
                        <ProgressBar
                            label="Menunggu Verifikasi"
                            value={data.menunggu_verifikasi}
                            total={data.total_pendaftar}
                            color="bg-yellow-400"
                        />
                        <ProgressBar
                            label="Perlu Perbaikan"
                            value={data.perlu_perbaikan}
                            total={data.total_pendaftar}
                            color="bg-orange-400"
                        />
                        <ProgressBar
                            label="Terverifikasi"
                            value={data.terverifikasi}
                            total={data.total_pendaftar}
                            color="bg-teal-400"
                        />
                        <ProgressBar
                            label="Wawancara Orang Tua"
                            value={data.wawancara_orang_tua}
                            total={data.total_pendaftar}
                            color="bg-purple-400"
                        />
                        <ProgressBar
                            label="Lulus"
                            value={data.lulus}
                            total={data.total_pendaftar}
                            color="bg-green-500"
                        />
                        <ProgressBar
                            label="Tidak Lulus"
                            value={data.tidak_lulus}
                            total={data.total_pendaftar}
                            color="bg-red-500"
                        />
                    </div>
                </div>

                {/* 4. REKAP PER GELOMBANG */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 h-full">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">
                        Rekap Per Gelombang
                    </h2>

                    {data.gelombang && data.gelombang.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                                        <th className="pb-3 px-2 font-semibold">
                                            Gelombang
                                        </th>
                                        <th className="pb-3 px-2 font-semibold">
                                            Periode
                                        </th>
                                        <th className="pb-3 px-2 font-semibold text-center">
                                            Kuota
                                        </th>
                                        <th className="pb-3 px-2 font-semibold text-center">
                                            Pendaftar
                                        </th>
                                        <th className="pb-3 px-2 font-semibold text-center">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {data.gelombang.map((g, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-3 px-2 font-medium text-gray-800">
                                                {g.nama}
                                            </td>
                                            <td className="py-3 px-2 text-gray-600">
                                                {g.periode}
                                            </td>
                                            <td className="py-3 px-2 text-center text-gray-600">
                                                {g.kuota}
                                            </td>
                                            <td className="py-3 px-2 text-center text-gray-600">
                                                {g.total_pendaftar}
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                                                        g.status.toLowerCase() === "aktif"
                                                            ? "bg-green-100 text-green-700"
                                                            : g.status.toLowerCase() ===
                                                                "selesai"
                                                              ? "bg-gray-100 text-gray-700"
                                                              : "bg-blue-100 text-blue-700"
                                                    }`}
                                                >
                                                    {g.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
                            Belum ada data gelombang.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Komponen Pembantu
function KpiCard({ title, value, icon: Icon, color, bg }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value || 0}</h3>
            </div>
            <div className={`p-3 rounded-xl ${bg} ${color}`}>
                <Icon size={24} />
            </div>
        </div>
    );
}

function ProgressBar({ label, value, total, color }) {
    const percent = total > 0 ? Math.round(((value || 0) / total) * 100) : 0;

    return (
        <div>
            <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{value || 0}</span>
                    <span className="text-xs text-gray-500 ml-1">({percent}%)</span>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className={`${color} h-2 rounded-full`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}
