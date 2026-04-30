import React, { useState, useEffect } from "react";
import {
    Plus,
    CalendarDays,
    Users,
    Trash2,
    CheckCircle2,
    Clock3,
    FileCheck,
    Search,
    X,
    Loader2,
} from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import { waveApi } from "@services/waveService.js";
import { deleteGelombang, createGelombang, updateGelombang, getSemuaGelombang, getGelombangById, exportExcelGelombang } from "@services/adminGelombangService.js";
import Skeleton from "@components/ui/Skeleton";
import Toast from "../../components/ui/Toast.jsx";

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

    const handleAdd = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await waveApi.create(formData);
            setOpenAddModal(false);
            setFormData({
                nama: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                kuota: "",
            });
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
            await deleteGelombang(selectedDeleteId);
            setToastConfig({ show: true, message: "Gelombang berhasil dihapus!", type: "success" });
            fetchGelombang(false);
            setOpenDeleteModal(false);
            setSelectedDeleteId(null);
        } catch (error) {
            setToastConfig({ show: true, message: error.message || "Gagal menghapus gelombang", type: "error" });
        }
    };

    const handleExportExcel = async (id) => {
        try {
            setToastConfig({ show: true, message: "Mempersiapkan dokumen Excel...", type: "success" });
            const response = await exportExcelGelombang(id);
            const url = window.URL.createObjectURL(new Blob([response]));
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

    const getStatus = (item) => {
        const now = new Date();
        const start = new Date(item.tanggal_mulai);
        const end = new Date(item.tanggal_selesai);
        if (now >= start && now <= end) return "Aktif";
        if (now < start) return "Akan Datang";
        return "Selesai";
    };

    const getStatusStyle = (status) => {
        if (status === "Aktif") return "bg-green-100 text-green-700";
        if (status === "Selesai") return "bg-gray-200 text-gray-700";
        return "bg-yellow-100 text-yellow-700";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
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
                <div className="flex justify-between items-center mb-6">
                    <AdminHeader
                        text="Gelombang"
                        subText="Kelola periode pendaftaran calon peserta didik"
                    />

                    <button
                        onClick={() => setOpenAddModal(true)}
                        className="bg-[#2f4aa0] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-[#253b80] cursor-pointer"
                    >
                        <Plus size={16} />
                        Tambah Gelombang
                    </button>
                </div>


                {/* INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    <InfoCard
                        icon={<FileCheck size={18} />}
                        title="Total Gelombang"
                        value={dataGelombang.length}
                        desc="Gelombang"
                        color="text-blue-600"
                    />
                    <InfoCard
                        icon={<CheckCircle2 size={18} />}
                        title="Gelombang Aktif"
                        value={dataGelombang.filter((g) => getStatus(g) === "Aktif").length}
                        desc="Aktif"
                        color="text-green-600"
                    />
                    <InfoCard
                        icon={<Clock3 size={18} />}
                        title="Akan Datang"
                        value={
                            dataGelombang.filter((g) => getStatus(g) === "Akan Datang").length
                        }
                        desc="Gelombang"
                        color="text-indigo-500"
                    />
                    <InfoCard
                        icon={<FileCheck size={18} />}
                        title="Selesai"
                        value={
                            dataGelombang.filter((g) => getStatus(g) === "Selesai").length
                        }
                        desc="Selesai"
                        color="text-blue-600"
                    />
                </div>

                {/* CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {dataGelombang.length === 0 ? (
                        <div
                            className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed text-gray-400">
                            Belum ada data gelombang
                        </div>
                    ) : (
                        dataGelombang.map((item) => {
                            const status = getStatus(item);
                            return (
                                <div
                                    key={item.id_gelombang}
                                    className="bg-white rounded-2xl shadow-md p-5 flex flex-col"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{item.nama}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(status)}`}
                                        >
                                            {status}
                                        </span>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="flex items-center gap-3 mb-4 text-gray-600">
                                        <CalendarDays size={18} className="text-[#2f4aa0]" />
                                        {formatDate(item.tanggal_mulai)} -{" "}
                                        {formatDate(item.tanggal_selesai)}
                                    </div>

                                    <div className="flex items-center gap-3 mb-5 text-gray-600">
                                        <Users size={18} className="text-[#2f4aa0]" />
                                        {item.totalPendaftar || 0}/{item.kuota} Peserta
                                    </div>

                                    <div className="w-full h-2 bg-gray-200 rounded-full mb-5 mt-auto">
                                        <div
                                            className="h-2 bg-[#2f4aa0] rounded-full transition-all"
                                            style={{
                                                width: progressWidth(item.totalPendaftar, item.kuota),
                                            }}
                                        ></div>
                                    </div>

                                    {/* Render buttons hanya jika status Selesai */}
                                    {status === "Selesai" && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => handleExportExcel(item.id_gelombang)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m-6 4h6m-6 4h6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
                                                </svg>
                                                Export Excel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedDeleteId(item.id_gelombang);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                                Hapus
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* MODAL TAMBAH */}
            {openAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-5">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Tambah Gelombang</h2>
                            <button
                                onClick={() => setOpenAddModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Gelombang
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Gelombang 1"
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.nama}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nama: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.tanggal_mulai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tanggal_mulai: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Selesai
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.tanggal_selesai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tanggal_selesai: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kuota Peserta
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Contoh: 100"
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.kuota}
                                    onChange={(e) =>
                                        setFormData({ ...formData, kuota: e.target.value })
                                    }
                                />
                            </div>
                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-[#2f4aa0] text-white py-2 rounded-lg font-semibold hover:bg-[#253b80] cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? "Menyimpan..." : "Tambah Gelombang"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL HAPUS */}
            {openDeleteModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 text-center animate-fadeIn">
                        {/* ICON */}
                        <div
                            className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100 mb-4 shadow-inner">
                            <Trash2 size={24} className="text-red-600" />
                        </div>

                        {/* TITLE & DESC (Diperbarui) */}
                        <h3 className="text-gray-900 font-bold text-lg">
                            Hapus Data Gelombang?
                        </h3>

                        <div className="text-sm text-gray-500 mt-2 mb-2 leading-relaxed">
                            <p>
                                Tindakan ini akan menghapus gelombang beserta <strong>seluruh data pendaftar</strong> di dalamnya secara permanen.
                            </p>
                            <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg mt-3 text-xs text-left flex gap-2 border border-yellow-200">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p>Sangat disarankan untuk melakukan <b>Export Excel</b> terlebih dahulu untuk mencadangkan data pendaftaran.</p>
                            </div>
                        </div>


                        {/* BUTTON */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                            >
                                <Trash2 size={16} />
                                Ya, Hapus
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
        </>
    );
}

function InfoCard({ icon, title, value, desc, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex gap-3 mb-3">
                <div className={color}>{icon}</div>
                <h4 className="text-sm text-gray-500">{title}</h4>
            </div>

            <div className="flex gap-2 items-end">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-sm text-gray-500 pb-1">{desc}</span>
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-[#f8f9fc] rounded-2xl p-5 border">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
        </div>
    );
}

export default AdminGelombang; 