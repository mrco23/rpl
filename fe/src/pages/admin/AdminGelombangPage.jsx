import React, {useState, useEffect} from "react";
import {
    Plus,
    CalendarDays,
    Users,
    Eye,
    Trash2,
    CheckCircle2,
    Clock3,
    FileCheck,
    Search,
    X,
    Loader2,
} from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import {waveApi} from "@services/waveService.js";
import {deleteGelombang, createGelombang, updateGelombang, getSemuaGelombang, getGelombangById} from "@services/adminGelombangService.js";
import Skeleton from "@components/ui/Skeleton";

function AdminGelombang() {
    const [loading, setLoading] = useState(true);
    const [dataGelombang, setDataGelombang] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [selectedGelombang, setSelectedGelombang] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        kuota: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchGelombang();
    }, []);

    const fetchGelombang = async () => {
        setLoading(true);
        try {
            const res = await waveApi.getAdminList();
            // WaveService returns { message, data } because of my backend change
            setDataGelombang(res.data || []);
        } catch (error) {
            console.error("Gagal mengambil data gelombang:", error);
        } finally {
            setLoading(false);
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
            fetchGelombang();
        } catch (error) {
            alert(error.message || "Gagal menambah gelombang");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteGelombang(selectedDeleteId);
            fetchGelombang();
            setOpenDeleteModal(false);
            setSelectedDeleteId(null);
        } catch (error) {
            alert(error.message || "Gagal menghapus gelombang");
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
        return date.toLocaleDateString("id-ID", {day: "numeric", month: "short"});
    };

    const progressWidth = (peserta, kuota) => {
        if (!kuota) return "0%";
        return `${Math.min(100, (peserta / (kuota || 1)) * 100)}%`;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <Skeleton className="h-10 w-48"/>
                    <Skeleton className="h-10 w-32 rounded-lg"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    {Array.from({length: 4}).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-2xl"/>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({length: 3}).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-2xl"/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <AdminHeader
                        text="Gelombang"
                        subText="Kelola periode pendaftaran calon peserta didik"
                    />

                    <button
                        onClick={() => setOpenAddModal(true)}
                        className="bg-[#2f4aa0] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-[#253b80] cursor-pointer"
                    >
                        <Plus size={16}/>
                        Tambah Gelombang
                    </button>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    <InfoCard
                        icon={<FileCheck size={18}/>}
                        title="Total Gelombang"
                        value={dataGelombang.length}
                        desc="Gelombang"
                        color="text-blue-600"
                    />
                    <InfoCard
                        icon={<CheckCircle2 size={18}/>}
                        title="Gelombang Aktif"
                        value={dataGelombang.filter((g) => getStatus(g) === "Aktif").length}
                        desc="Aktif"
                        color="text-green-600"
                    />
                    <InfoCard
                        icon={<Clock3 size={18}/>}
                        title="Akan Datang"
                        value={
                            dataGelombang.filter((g) => getStatus(g) === "Akan Datang").length
                        }
                        desc="Gelombang"
                        color="text-indigo-500"
                    />
                    <InfoCard
                        icon={<FileCheck size={18}/>}
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

                                    <hr className="my-4"/>

                                    <div className="flex items-center gap-3 mb-4 text-gray-600">
                                        <CalendarDays size={18} className="text-[#2f4aa0]"/>
                                        {formatDate(item.tanggal_mulai)} -{" "}
                                        {formatDate(item.tanggal_selesai)}
                                    </div>

                                    <div className="flex items-center gap-3 mb-5 text-gray-600">
                                        <Users size={18} className="text-[#2f4aa0]"/>
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

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedGelombang(item);
                                                setOpenModal(true);
                                            }}
                                            className="border rounded-md py-2 flex justify-center hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                            <Eye size={16}/>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedDeleteId(item.id_gelombang);
                                                setOpenDeleteModal(true);
                                            }}
                                            className="border rounded-md py-2 flex justify-center hover:bg-red-50 cursor-pointer transition-colors"
                                        >
                                            <Trash2 size={16} className="text-red-500"/>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* MODAL TAMBAH */}
            {openAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-5">
                    <div className="bg-white w-full max-w-md rounded-8xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Tambah Gelombang</h2>
                            <button
                                onClick={() => setOpenAddModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                            >
                                <X size={20}/>
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
                                        setFormData({...formData, nama: e.target.value})
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
                                        setFormData({...formData, kuota: e.target.value})
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

            {openDeleteModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 text-center animate-fadeIn">
                        {/* ICON */}
                        <div
                            className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100 mb-4 shadow-inner">
                            <Trash2 size={20} className="text-red-500"/>
                        </div>

                        {/* TITLE */}
                        <h3 className="text-gray-800 font-semibold text-base">
                            Hapus gelombang
                        </h3>

                        {/* DESC */}
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            Data yang sudah dihapus tidak dapat dikembalikan
                        </p>

                        {/* BUTTON */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                                className="flex-1 py-2.5 rounded-xl text-sm bg-gray-100 hover:bg-gray-200 transition"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2.5 rounded-xl text-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Trash2 size={14}/>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DETAIL */}
            {openModal && selectedGelombang && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-5">
                    <div
                        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-xl flex flex-col">
                        {/* HEADER */}
                        <div className="flex justify-between items-start p-6 border-b">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedGelombang.nama}</h2>
                                <p className="text-gray-500 mt-1">
                                    {formatDate(selectedGelombang.tanggal_mulai)} -{" "}
                                    {formatDate(selectedGelombang.tanggal_selesai)} •{" "}
                                    {selectedGelombang.kuota} Kuota
                                </p>
                            </div>

                            <button
                                onClick={() => setOpenModal(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={24}/>
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 overflow-y-auto">
                            <div
                                className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-blue-800 font-semibold text-lg">
                                        {selectedGelombang.totalPendaftar || 0}
                                    </p>
                                    <p className="text-blue-600 text-sm">
                                        Total Pendaftar Terdaftar
                                    </p>
                                </div>
                                <Users className="text-blue-300" size={32}/>
                            </div>

                            <div className="text-center py-10 border rounded-xl border-dashed">
                                <p className="text-gray-400">
                                    Daftar rincian pendaftar per gelombang dapat dilihat di menu
                                    "Pendaftar"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function InfoCard({icon, title, value, desc, color}) {
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

function StatCard({title, value, color}) {
    return (
        <div className="bg-[#f8f9fc] rounded-2xl p-5 border">
            <p className="text-sm text-gray-500">{title}</p>

            <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
        </div>
    );
}

export default AdminGelombang;
