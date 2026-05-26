import React, { useState, useEffect } from "react";
import {
    Plus,
    CalendarDays,
    Users,
    Trash2,
    CheckCircle2,
    Clock3,
    FileCheck,
    Loader2,
    CalendarPlus,
    XCircle,
    AlertTriangle
} from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import { waveApi } from "../../public-site/services/waveService.js";
import Skeleton from "../../../shared/components/Skeleton";
import Toast from "../../../shared/components/Toast.jsx";

function AdminGelombang() {
    const [loading, setLoading] = useState(true);
    const [dataGelombang, setDataGelombang] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        kuota: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        fetchGelombang();
    }, []);

    const fetchGelombang = async (showLoader = true) => {
        if (showLoader) setLoading(true);
        try {
            const res = await waveApi.getAdminList();
            setDataGelombang(res.data || []);
        } catch (error) {
            console.error("Gagal mengambil data gelombang:", error);
            setToastConfig({ show: true, message: "Gagal mengambil data gelombang", type: "error" });
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setTimeout(() => {
            setFormData({
                nama: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                kuota: "",
            });
        }, 200);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await waveApi.create(formData);
            handleCloseAddModal();
            setToastConfig({ show: true, message: "Gelombang berhasil ditambahkan!", type: "success" });
            fetchGelombang(false);
        } catch (error) {
            setToastConfig({ show: true, message: error.message || "Gagal menambah gelombang", type: "error" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            setSubmitting(true);
            await waveApi.remove(selectedDeleteId);
            setToastConfig({ show: true, message: "Gelombang berhasil dihapus!", type: "success" });
            fetchGelombang(false);
            setOpenDeleteModal(false);
            setSelectedDeleteId(null);
        } catch (error) {
            setToastConfig({ show: true, message: error.message || "Gagal menghapus gelombang", type: "error" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleExportExcel = async (id) => {
        try {
            setToastConfig({ show: true, message: "Mempersiapkan dokumen Excel...", type: "success" });
            const response = await waveApi.exportExcel(id);
            const blob = response?.data instanceof Blob ? response.data : response;
            const url = window.URL.createObjectURL(blob instanceof Blob ? blob : new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Export_Gelombang_${id}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setToastConfig({ show: true, message: "Berhasil mengunduh dokumen Excel!", type: "success" });
        } catch (error) {
            console.error("Gagal export Excel:", error);
            setToastConfig({ show: true, message: "Gagal mengekspor dokumen Excel", type: "error" });
        }
    };

    const handleAjukanValidasi = async (id) => {
        try {
            setToastConfig({ show: true, message: "Mengajukan validasi...", type: "success" });
            await waveApi.ajukanValidasi(id);
            setToastConfig({ show: true, message: "Validasi berhasil diajukan!", type: "success" });
            fetchGelombang(false);
        } catch (error) {
            console.error("Gagal mengajukan validasi:", error);
            setToastConfig({ show: true, message: error.message || "Gagal mengajukan validasi", type: "error" });
        }
    };

    const getStatus = (item) => {
        const now = new Date();
        const start = new Date(item.tanggal_mulai);
        const end = new Date(item.tanggal_selesai);
        end.setHours(23, 59, 59, 999);
        if (now >= start && now <= end) return "Aktif";
        if (now < start) return "Akan Datang";
        return "Selesai";
    };

    const getStatusStyle = (status) => {
        if (status === "Aktif") return "bg-green-100 text-green-700";
        if (status === "Selesai") return "bg-gray-200 text-gray-700";
        return "bg-yellow-100 text-yellow-700";
    };

    const getValidasiStyle = (status) => {
        if (status === "disetujui") return "bg-green-100 text-green-700";
        if (status === "menunggu_validasi") return "bg-yellow-100 text-yellow-700";
        return "bg-gray-200 text-gray-700";
    };

    const getValidasiLabel = (status) => {
        if (status === "disetujui") return "Disetujui";
        if (status === "menunggu_validasi") return "Menunggu Kepsek";
        return "Belum Diajukan";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };

    const progressWidth = (peserta, kuota) => {
        if (!kuota) return "0%";
        return `${Math.min(100, (peserta / (kuota || 1)) * 100)}%`;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <AdminHeader
                        text="Gelombang"
                        subText="Kelola periode pendaftaran calon peserta didik"
                    />

                    <button
                        onClick={() => setOpenAddModal(true)}
                        className="bg-[#2f4aa0] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#253b80] transition-colors shadow-sm cursor-pointer"
                    >
                        <Plus size={18} />
                        Tambah Gelombang
                    </button>
                </div>

                {/* INFO CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    <InfoCard
                        icon={<FileCheck size={20} />}
                        title="Total Gelombang"
                        value={dataGelombang.length}
                        desc="Gelombang"
                        color="text-blue-600"
                        bgIcon="bg-blue-100"
                    />
                    <InfoCard
                        icon={<CheckCircle2 size={20} />}
                        title="Gelombang Aktif"
                        value={dataGelombang.filter((g) => getStatus(g) === "Aktif").length}
                        desc="Aktif"
                        color="text-green-600"
                        bgIcon="bg-green-100"
                    />
                    <InfoCard
                        icon={<Clock3 size={20} />}
                        title="Akan Datang"
                        value={dataGelombang.filter((g) => getStatus(g) === "Akan Datang").length}
                        desc="Gelombang"
                        color="text-orange-500"
                        bgIcon="bg-orange-100"
                    />
                    <InfoCard
                        icon={<FileCheck size={20} />}
                        title="Selesai"
                        value={dataGelombang.filter((g) => getStatus(g) === "Selesai").length}
                        desc="Selesai"
                        color="text-gray-600"
                        bgIcon="bg-gray-100"
                    />
                </div>

                {/* WAVES CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {dataGelombang.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                            <CalendarDays size={48} className="mx-auto mb-3 opacity-20" />
                            <p>Belum ada data gelombang pendaftaran</p>
                        </div>
                    ) : (
                        dataGelombang.map((item) => {
                            const status = getStatus(item);
                            return (
                                <div
                                    key={item.id_gelombang}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-xl text-gray-900">{item.nama}</h3>
                                        <div className="flex flex-col gap-1 items-end">
                                            <span
                                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getStatusStyle(status)}`}
                                            >
                                                {status}
                                            </span>
                                            {status === "Selesai" && (
                                                <span
                                                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getValidasiStyle(item.status_validasi)}`}
                                                >
                                                    {getValidasiLabel(item.status_validasi)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <hr className="my-4 border-gray-100" />

                                    <div className="flex items-center gap-3 mb-3 text-sm font-medium text-gray-600">
                                        <div className="p-2 bg-blue-50 text-[#253b80] rounded-lg">
                                            <CalendarDays size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">Periode</p>
                                            <p>{formatDate(item.tanggal_mulai)} - {formatDate(item.tanggal_selesai)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-5 text-sm font-medium text-gray-600">
                                        <div className="p-2 bg-blue-50 text-[#253b80] rounded-lg">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">Pendaftar</p>
                                            <p>{item.totalPendaftar || 0} / <span className="text-gray-900 font-bold">{item.kuota}</span> Peserta</p>
                                        </div>
                                    </div>

                                    <div className="w-full h-2.5 bg-gray-100 rounded-full mb-5 mt-auto overflow-hidden">
                                        <div
                                            className="h-full bg-[#253b80] rounded-full transition-all duration-500 ease-out"
                                            style={{ width: progressWidth(item.totalPendaftar, item.kuota) }}
                                        ></div>
                                    </div>

                                    {status === "Akan Datang" && (
                                        <div className="grid grid-cols-1 gap-3 mt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedDeleteId(item.id_gelombang);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer duration-300"
                                            >
                                                <Trash2 size={16} /> Hapus
                                            </button>
                                        </div>
                                    )}
                                    {status === "Selesai" && (
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {(!item.status_validasi || item.status_validasi === "belum_diajukan") && (
                                                <>
                                                    <button
                                                        onClick={() => handleExportExcel(item.id_gelombang)}
                                                        className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                                                    >
                                                        <DownloadIcon /> Export Sementara
                                                    </button>
                                                    <button
                                                        onClick={() => handleAjukanValidasi(item.id_gelombang)}
                                                        className="bg-blue-50 text-[#253b80] hover:bg-[#253b80] hover:text-white border border-blue-200 hover:border-[#253b80] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                                                    >
                                                        <FileCheck size={16} /> Ajukan Validasi
                                                    </button>
                                                </>
                                            )}
                                            {item.status_validasi === "menunggu_validasi" && (
                                                <>
                                                    <button
                                                        onClick={() => handleExportExcel(item.id_gelombang)}
                                                        className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                                                    >
                                                        <DownloadIcon /> Export Sementara
                                                    </button>
                                                    <button
                                                        disabled
                                                        className="bg-gray-100 text-gray-500 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 cursor-not-allowed"
                                                    >
                                                        Menunggu Kepsek
                                                    </button>
                                                </>
                                            )}
                                            {item.status_validasi === "disetujui" && (
                                                <>
                                                    <button
                                                        onClick={() => handleExportExcel(item.id_gelombang)}
                                                        className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                                                    >
                                                        <DownloadIcon /> Export Final
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedDeleteId(item.id_gelombang);
                                                            setOpenDeleteModal(true);
                                                        }}
                                                        className="hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer duration-300"
                                                    >
                                                        <Trash2 size={16} /> Hapus
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ================= MODAL TAMBAH ================= */}
            {openAddModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col max-h-[90vh] zoom-in-95 animate-in duration-200">

                        {/* Modal Header */}
                        <div className="flex justify-between items-start p-6 border-b border-gray-100 rounded-t-3xl bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-50 text-[#253b80] rounded-2xl flex items-center justify-center shrink-0">
                                    <CalendarPlus size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Tambah Gelombang</h2>
                                    <p className="text-sm text-gray-500">Buat periode pendaftaran baru</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseAddModal}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            >
                                <XCircle size={28} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleAdd} className="flex flex-col p-6 overflow-y-auto custom-scrollbar gap-5">

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Nama Gelombang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Gelombang 1"
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Kuota Peserta <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Contoh: 150"
                                    min="1"
                                    value={formData.kuota}
                                    onChange={(e) => setFormData({ ...formData, kuota: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.tanggal_mulai}
                                        onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all text-gray-700"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Tanggal Selesai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.tanggal_selesai}
                                        onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all text-gray-700"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseAddModal}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-[#253b80] rounded-xl hover:bg-[#1a2c66] shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        "Simpan Gelombang"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= MODAL HAPUS ================= */}
            {openDeleteModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 text-center zoom-in-95 animate-in duration-200">
                        {/* ICON */}
                        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-50 mb-5 border-[6px] border-red-100">
                            <Trash2 size={32} className="text-red-600" />
                        </div>

                        {/* TITLE & DESC */}
                        <h3 className="text-gray-900 font-extrabold text-xl mb-2">
                            Hapus Gelombang?
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            Tindakan ini akan menghapus gelombang beserta <strong>seluruh data pendaftar</strong> di dalamnya secara permanen.
                        </p>

                        <div className="bg-yellow-50/80 text-yellow-800 p-4 rounded-xl text-sm text-left flex items-start gap-3 border border-yellow-200/60 mb-8">
                            <AlertTriangle size={18} className="shrink-0 text-yellow-600 mt-0.5" />
                            <p className="leading-relaxed">
                                Sangat disarankan untuk melakukan <strong className="font-bold">Export Excel</strong> terlebih dahulu untuk mencadangkan data pendaftaran.
                            </p>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                                className="flex-1 py-3 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={submitting}
                                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? <Loader2 size={16} className="animate-spin" /> : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toast
                show={toastConfig.show}
                message={toastConfig.message}
                type={toastConfig.type}
                onClose={() => setToastConfig({ ...toastConfig, show: false })}
            />

            {/* CSS Scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}} />
        </>
    );
}

// Sub-komponen InfoCard (Diperbarui UI-nya)
function InfoCard({ icon, title, value, desc, color, bgIcon }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
            <div className={`p-3 rounded-xl ${color} ${bgIcon}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
                <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
                    <span className="text-xs font-medium text-gray-400">{desc}</span>
                </div>
            </div>
        </div>
    );
}

// Icon Export
function DownloadIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m-6 4h6m-6 4h6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
        </svg>
    );
}

export default AdminGelombang;