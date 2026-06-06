import React, { useState, useEffect } from "react";
import {
    getValidasiGelombang,
    setujuiValidasiGelombang,
} from "../services/kepalaSekolahService.js";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Toast from "../../../shared/components/Toast.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import StatItem from "../components/StatItem.jsx";
import {
    CheckCircle2,
    FileCheck,
    Users,
    UserCheck,
    UserX,
    Clock,
    CalendarDays,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

export default function ValidasiGelombangPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [confirmModal, setConfirmModal] = useState({ show: false, item: null });
    const [isApproving, setIsApproving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getValidasiGelombang();
            setData(res || []);
        } catch (err) {
            console.error("Gagal mengambil data validasi:", err);
            setToast({
                show: true,
                message: "Gagal mengambil data validasi",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const confirmSetujui = (item) => {
        setConfirmModal({ show: true, item });
    };

    const handleSetujui = async () => {
        const id = confirmModal.item?.id_gelombang;
        if (!id) return;

        try {
            setIsApproving(true);
            setToast({ show: true, message: "Menyetujui ...", type: "info" });
            await setujuiValidasiGelombang(id);
            setConfirmModal({ show: false, item: null });
            setToast({
                show: true,
                message: "gelombang berhasil disetujui!",
                type: "success",
            });
            fetchData();
        } catch (err) {
            console.error("Gagal menyetujui Gelombang:", err);
            setToast({
                show: true,
                message: "Gagal menyetujui Gelombang",
                type: "error",
            });
        } finally {
            setIsApproving(false);
        }
    };

    const formatLongDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-10 space-y-6">
            {/* HERO HEADER — konsisten dengan BerandaKepalaSekolah */}
            <div className="bg-blue-dark text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                    <ShieldCheck size={240} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FileCheck size={20} className="opacity-80" />
                            <span className="text-sm font-medium opacity-80 uppercase tracking-wider">
                                Kepala Sekolah
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold">
                            Validasi Gelombang
                        </h1>
                        <p className="text-blue-100 text-sm mt-1 max-w-xl">
                            Periksa dan setujui rekap gelombang yang telah selesai sebelum
                            admin menghapus data.
                        </p>
                    </div>
                    {data.length > 0 && (
                        <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center shrink-0">
                            <p className="text-3xl font-black">{data.length}</p>
                            <p className="text-xs font-semibold opacity-80 uppercase tracking-wide mt-0.5">
                                Menunggu Validasi
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* EMPTY STATE */}
            {data.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">
                        Semua Bersih!
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Tidak ada gelombang yang menunggu validasi saat ini.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {data.map((item) => {
                        const lulusPercent =
                            item.totalPendaftar > 0
                                ? Math.round(
                                      (item.totalLulus / item.totalPendaftar) * 100,
                                  )
                                : 0;

                        return (
                            <div
                                key={item.id_gelombang}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                            >
                                {/* Card Header */}
                                <div className="p-5 border-b border-gray-100 flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 border border-yellow-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                <Clock size={9} />
                                                Menunggu Validasi
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg text-gray-900 leading-tight truncate my-2">
                                            {item.nama}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
                                            <CalendarDays size={13} />
                                            <span>
                                                {formatLongDate(item.tanggal_mulai)} –{" "}
                                                {formatLongDate(item.tanggal_selesai)}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Kuota utilization ring area — simple text version */}
                                    <div className="text-right shrink-0">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {item.totalPendaftar}
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium">
                                            dari {item.kuota} kuota
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="px-5 py-4 grid grid-cols-3 gap-3">
                                    <StatItem
                                        icon={UserCheck}
                                        label="Lulus"
                                        value={item.totalLulus}
                                        iconClass="text-green-800"
                                        valueClass="text-green-800"
                                        bgClass="bg-green-50"
                                    />
                                    <StatItem
                                        icon={UserX}
                                        label="Tidak Lulus"
                                        value={item.totalTidakLulus}
                                        iconClass="text-red-800"
                                        valueClass="text-red-800"
                                        bgClass="bg-red-50"
                                    />
                                    <StatItem
                                        icon={Clock}
                                        label="Belum Final"
                                        value={item.totalBelumFinal}
                                        iconClass="text-yellow-800"
                                        valueClass="text-yellow-800"
                                        bgClass="bg-yellow-50"
                                    />
                                </div>

                                {/* Progress Bar Kelulusan */}
                                <div className="px-5 pb-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium mt-2">
                                        <span>Tingkat Kelulusan</span>
                                        <span className="font-bold text-gray-700">
                                            {lulusPercent}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full transition-all"
                                            style={{ width: `${lulusPercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="px-5 pb-5 mt-auto">
                                    <button
                                        onClick={() => confirmSetujui(item)}
                                        className="w-full bg-blue-dark text-white px-4 py-3 cursor-pointer rounded-lg text-sm font-semibold hover:bg-blue-dark-hover transition flex justify-center items-center gap-2"
                                    >
                                        <CheckCircle2 size={18} />
                                        Setujui Gelombang
                                        <ChevronRight
                                            size={16}
                                            className="ml-auto opacity-60"
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* CONFIRM MODAL */}
            <Modal
                open={confirmModal.show}
                onClose={() => setConfirmModal({ show: false, item: null })}
                title="Konfirmasi Persetujuan"
            >
                <div className="space-y-4">
                    {confirmModal.item && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="text-sm font-semibold text-blue-800">
                                {confirmModal.item.nama}
                            </p>
                            <p className="text-xs text-blue-600 mt-0.5">
                                {formatLongDate(confirmModal.item.tanggal_mulai)} –{" "}
                                {formatLongDate(confirmModal.item.tanggal_selesai)}
                            </p>
                            <div className="flex gap-4 mt-3 text-xs text-blue-700">
                                <span>
                                    <strong>{confirmModal.item.totalPendaftar}</strong>{" "}
                                    pendaftar
                                </span>
                                <span>
                                    <strong>{confirmModal.item.totalLulus}</strong> lulus
                                </span>
                            </div>
                        </div>
                    )}
                    <p className="text-gray-600 text-sm">
                        Setelah disetujui, admin dapat melanjutkan proses penghapusan data
                        gelombang ini. Tindakan ini{" "}
                        <strong>tidak dapat dibatalkan</strong>.
                    </p>
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            onClick={() => setConfirmModal({ show: false, item: null })}
                            disabled={isApproving}
                            className="px-4 py-2 cursor-pointer rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSetujui}
                            disabled={isApproving}
                            className="bg-[#2f4aa0] px-4 py-2 cursor-pointer rounded-md text-sm font-medium text-white hover:bg-[#253b80] transition flex items-center gap-2 disabled:opacity-70"
                        >
                            <CheckCircle2 size={16} />
                            {isApproving ? "Menyetujui..." : "Ya, Setujui"}
                        </button>
                    </div>
                </div>
            </Modal>

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
}
