import React, { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Edit2,
    Power,
    PowerOff,
    UserCircle2,
    Trash2,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import Modal from "../../../shared/components/Modal.jsx";
import Skeleton from "../../../shared/components/Skeleton.jsx";
import Toast from "../../../shared/components/Toast.jsx";
import Pagination from "../../public-site/components/Pagination.jsx";

import {
    getAllVerifikator,
    createVerifikator,
    updateVerifikator,
    updateStatusVerifikator,
    deleteVerifikator,
} from "../services/adminVerifikatorService.js";

import {
    getKepalaSekolahList,
    createKepalaSekolah,
    updateKepalaSekolah,
    updateStatusKepalaSekolah,
    deleteKepalaSekolah,
} from "../services/adminKepalaSekolahService.js";

export default function AkunInternalPage() {
    const [verifiers, setVerifiers] = useState([]);
    const [kepsek, setKepsek] = useState([]);

    const [loadingVerifiers, setLoadingVerifiers] = useState(true);
    const [loadingKepsek, setLoadingKepsek] = useState(true);

    const [searchQueryVerifier, setSearchQueryVerifier] = useState("");
    const [searchQueryKepsek, setSearchQueryKepsek] = useState("");

    const [pageVerifier, setPageVerifier] = useState(1);
    const [pageKepsek, setPageKepsek] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // 'add', 'edit'
    const [modalType, setModalType] = useState("verifikator"); // 'verifikator', 'kepsek'
    const [selectedAccount, setSelectedAccount] = useState(null);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({
        open: false,
        title: "",
        message: "",
        confirmLabel: "",
        confirmClass: "",
        isDanger: false,
        onConfirm: null,
    });
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        password: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await Promise.all([fetchVerifiers(), fetchKepsek()]);
    };

    const fetchVerifiers = async (showLoader = true) => {
        try {
            if (showLoader) setLoadingVerifiers(true);
            const res = await getAllVerifikator();
            setVerifiers(res.data || []);
        } catch (err) {
            console.error(err);
            setToastConfig({
                show: true,
                message: "Gagal memuat data verifikator",
                type: "error",
            });
        } finally {
            if (showLoader) setLoadingVerifiers(false);
        }
    };

    const fetchKepsek = async (showLoader = true) => {
        try {
            if (showLoader) setLoadingKepsek(true);
            const res = await getKepalaSekolahList();
            setKepsek(res.data || []);
        } catch (err) {
            console.error(err);
            setToastConfig({
                show: true,
                message: "Gagal memuat data Kepala Sekolah",
                type: "error",
            });
        } finally {
            if (showLoader) setLoadingKepsek(false);
        }
    };

    const handleOpenAdd = (type) => {
        setModalType(type);
        setModalMode("add");
        setFormData({ nama: "", username: "", password: "" });
        setSelectedAccount(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (type, account) => {
        setModalType(type);
        setModalMode("edit");
        setSelectedAccount(account);
        setFormData({
            nama: account.nama,
            username: account.username,
            password: "",
        });
        setIsModalOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModal((prev) => ({ ...prev, open: false, onConfirm: null }));
        setConfirmLoading(false);
    };

    const handleConfirmAction = async () => {
        if (!confirmModal.onConfirm) return;
        setConfirmLoading(true);
        try {
            await confirmModal.onConfirm();
        } finally {
            setConfirmLoading(false);
            closeConfirmModal();
        }
    };

    const handleToggleStatus = (type, account) => {
        const newStatus = !account.status_aktif;
        const label = newStatus ? "mengaktifkan" : "menonaktifkan";
        setConfirmModal({
            open: true,
            title: newStatus ? "Aktifkan Akun?" : "Nonaktifkan Akun?",
            message: `Yakin ingin ${label} akun "${account.nama}"?`,
            confirmLabel: newStatus ? "Ya, Aktifkan" : "Ya, Nonaktifkan",
            confirmClass: newStatus
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white",
            isDanger: false,
            onConfirm: async () => {
                try {
                    if (type === "verifikator") {
                        await updateStatusVerifikator(account.id_verifikator, newStatus);
                        await fetchVerifiers(false);
                    } else {
                        await updateStatusKepalaSekolah(
                            account.id_kepala_sekolah,
                            newStatus,
                        );
                        await fetchKepsek(false);
                    }
                    setToastConfig({
                        show: true,
                        message: `Akun berhasil di${newStatus ? "aktifkan" : "nonaktifkan"}!`,
                        type: "success",
                    });
                } catch (err) {
                    setToastConfig({
                        show: true,
                        message: "Gagal mengubah status akun",
                        type: "error",
                    });
                }
            },
        });
    };

    const handleDelete = (type, account) => {
        if (account.status_aktif) {
            setToastConfig({
                show: true,
                message: "Akun yang masih aktif tidak dapat dihapus.",
                type: "error",
            });
            return;
        }
        setConfirmModal({
            open: true,
            title: "Hapus Akun Permanen?",
            message: `Akun "${account.nama}" akan dihapus secara permanen dan tidak dapat dikembalikan.`,
            confirmLabel: "Ya, Hapus Permanen",
            confirmClass: "bg-red-600 hover:bg-red-700 text-white",
            isDanger: true,
            onConfirm: async () => {
                try {
                    if (type === "verifikator") {
                        await deleteVerifikator(account.id_verifikator);
                        await fetchVerifiers(false);
                    } else {
                        await deleteKepalaSekolah(account.id_kepala_sekolah);
                        await fetchKepsek(false);
                    }
                    setToastConfig({
                        show: true,
                        message: `Akun berhasil dihapus!`,
                        type: "success",
                    });
                } catch (err) {
                    setToastConfig({
                        show: true,
                        message: err.response?.data?.message || "Gagal menghapus akun",
                        type: "error",
                    });
                }
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modalMode === "add" || (modalMode === "edit" && formData.password)) {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
            if (!passwordRegex.test(formData.password)) {
                setToastConfig({
                    show: true,
                    message:
                        "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol.",
                    type: "error",
                });
                return;
            }
        }

        setSubmitting(true);
        try {
            if (modalType === "verifikator") {
                if (modalMode === "add") {
                    await createVerifikator(formData);
                } else {
                    const payload = { nama: formData.nama, username: formData.username };
                    if (formData.password) payload.password = formData.password;
                    await updateVerifikator(selectedAccount.id_verifikator, payload);
                }
                fetchVerifiers(false);
            } else {
                if (modalMode === "add") {
                    await createKepalaSekolah(formData);
                } else {
                    const payload = { nama: formData.nama, username: formData.username };
                    if (formData.password) payload.password = formData.password;
                    await updateKepalaSekolah(selectedAccount.id_kepala_sekolah, payload);
                }
                fetchKepsek(false);
            }

            setIsModalOpen(false);
            setToastConfig({
                show: true,
                message: `Akun ${modalType === "verifikator" ? "Verifikator" : "Kepala Sekolah"} berhasil ${modalMode === "add" ? "dibuat" : "diperbarui"}!`,
                type: "success",
            });
        } catch (err) {
            console.error(err);
            setToastConfig({
                show: true,
                message:
                    err.message ||
                    `Gagal ${modalMode === "add" ? "menambah" : "mengubah"} akun`,
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    // Pagination & Filtering logic for Verifiers
    const filteredVerifiers = verifiers.filter(
        (v) =>
            v.nama?.toLowerCase().includes(searchQueryVerifier.toLowerCase()) ||
            v.username?.toLowerCase().includes(searchQueryVerifier.toLowerCase()),
    );
    const verifiersTotalPages = Math.ceil(filteredVerifiers.length / ITEMS_PER_PAGE);
    const paginatedVerifiers = filteredVerifiers.slice(
        (pageVerifier - 1) * ITEMS_PER_PAGE,
        pageVerifier * ITEMS_PER_PAGE,
    );

    // Pagination & Filtering logic for Kepsek
    const filteredKepsek = kepsek.filter(
        (k) =>
            k.nama?.toLowerCase().includes(searchQueryKepsek.toLowerCase()) ||
            k.username?.toLowerCase().includes(searchQueryKepsek.toLowerCase()),
    );
    const kepsekTotalPages = Math.ceil(filteredKepsek.length / ITEMS_PER_PAGE);
    const paginatedKepsek = filteredKepsek.slice(
        (pageKepsek - 1) * ITEMS_PER_PAGE,
        pageKepsek * ITEMS_PER_PAGE,
    );

    return (
        <>
            <AdminHeader
                text="Akun Internal"
                subText="Kelola akun verifikator dan kepala sekolah."
            />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* TABEL VERIFIKATOR */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Akun Verifikator
                    </h2>
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-80">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Cari nama / username..."
                                value={searchQueryVerifier}
                                onChange={(e) => {
                                    setSearchQueryVerifier(e.target.value);
                                    setPageVerifier(1);
                                }}
                                className="w-full border border-gray-300 rounded-lg text-sm text-gray-800 pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-dark bg-white transition-shadow"
                            />
                        </div>
                        <button
                            onClick={() => handleOpenAdd("verifikator")}
                            className="flex items-center gap-2 bg-white border border-blue-dark text-blue-dark hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shrink-0"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            Tambah Verifikator
                        </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead>
                                <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-semibold text-gray-700">
                                    <th className="p-4 w-1/2">Nama / Username</th>
                                    <th className="p-4 w-1/4">Status</th>
                                    <th className="p-4 w-1/4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingVerifiers ? (
                                    Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-24" />
                                                        <Skeleton className="h-3 w-32" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 flex justify-center gap-2 mt-4">
                                                <Skeleton className="h-8 w-8 rounded" />
                                                <Skeleton className="h-8 w-8 rounded" />
                                                <Skeleton className="h-8 w-8 rounded" />
                                            </td>
                                        </tr>
                                    ))
                                ) : paginatedVerifiers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            Tidak ada verifikator ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedVerifiers.map((item) => (
                                        <tr
                                            key={item.id_verifikator}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <UserCircle2
                                                        size={40}
                                                        className="text-gray-300 shrink-0"
                                                        strokeWidth={1.5}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-800">
                                                            {item.nama}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {item.username}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.status_aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                                >
                                                    {item.status_aktif
                                                        ? "Aktif"
                                                        : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenEdit(
                                                                "verifikator",
                                                                item,
                                                            )
                                                        }
                                                        title="Edit Akun"
                                                        className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                "verifikator",
                                                                item,
                                                            )
                                                        }
                                                        title={
                                                            item.status_aktif
                                                                ? "Nonaktifkan Akun"
                                                                : "Aktifkan Akun"
                                                        }
                                                        className={`p-1.5 border rounded transition-colors cursor-pointer ${
                                                            item.status_aktif
                                                                ? "border-orange-200 text-orange-500 hover:bg-orange-50 hover:text-orange-700"
                                                                : "border-green-200 text-green-500 hover:bg-green-50 hover:text-green-700"
                                                        }`}
                                                    >
                                                        {item.status_aktif ? (
                                                            <PowerOff size={16} />
                                                        ) : (
                                                            <Power size={16} />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                "verifikator",
                                                                item,
                                                            )
                                                        }
                                                        disabled={item.status_aktif}
                                                        title="Hapus Akun"
                                                        className={`p-1.5 border rounded transition-colors ${
                                                            item.status_aktif
                                                                ? "border-gray-200 text-gray-300 opacity-50 cursor-not-allowed"
                                                                : "border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                                        }`}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {verifiersTotalPages > 1 && (
                        <Pagination
                            currentPage={pageVerifier}
                            totalPages={verifiersTotalPages}
                            onPageChange={setPageVerifier}
                        />
                    )}
                </div>

                {/* TABEL KEPALA SEKOLAH */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Akun Kepala Sekolah
                    </h2>
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-80">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Cari nama / username..."
                                value={searchQueryKepsek}
                                onChange={(e) => {
                                    setSearchQueryKepsek(e.target.value);
                                    setPageKepsek(1);
                                }}
                                className="w-full border border-gray-300 rounded-lg text-sm text-gray-800 pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-dark bg-white transition-shadow"
                            />
                        </div>
                        <button
                            onClick={() => handleOpenAdd("kepsek")}
                            className="flex items-center gap-2 bg-white border border-blue-dark text-blue-dark hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shrink-0"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            Tambah Kepala Sekolah
                        </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead>
                                <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-semibold text-gray-700">
                                    <th className="p-4 w-1/2">Nama / Username</th>
                                    <th className="p-4 w-1/4">Status</th>
                                    <th className="p-4 w-1/4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingKepsek ? (
                                    Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-24" />
                                                        <Skeleton className="h-3 w-32" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Skeleton className="h-6 w-16 rounded-full" />
                                            </td>
                                            <td className="p-4 flex justify-center gap-2 mt-4">
                                                <Skeleton className="h-8 w-8 rounded" />
                                                <Skeleton className="h-8 w-8 rounded" />
                                            </td>
                                        </tr>
                                    ))
                                ) : paginatedKepsek.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            Tidak ada akun Kepala Sekolah ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedKepsek.map((item) => (
                                        <tr
                                            key={item.id_kepala_sekolah}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <UserCircle2
                                                        size={40}
                                                        className="text-gray-300 shrink-0"
                                                        strokeWidth={1.5}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-800">
                                                            {item.nama}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {item.username}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.status_aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                                >
                                                    {item.status_aktif
                                                        ? "Aktif"
                                                        : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenEdit("kepsek", item)
                                                        }
                                                        title="Edit Akun"
                                                        className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                "kepsek",
                                                                item,
                                                            )
                                                        }
                                                        title={
                                                            item.status_aktif
                                                                ? "Nonaktifkan Akun"
                                                                : "Aktifkan Akun"
                                                        }
                                                        className={`p-1.5 border rounded transition-colors cursor-pointer ${
                                                            item.status_aktif
                                                                ? "border-orange-200 text-orange-500 hover:bg-orange-50 hover:text-orange-700"
                                                                : "border-green-200 text-green-500 hover:bg-green-50 hover:text-green-700"
                                                        }`}
                                                    >
                                                        {item.status_aktif ? (
                                                            <PowerOff size={16} />
                                                        ) : (
                                                            <Power size={16} />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete("kepsek", item)
                                                        }
                                                        disabled={item.status_aktif}
                                                        title="Hapus Akun"
                                                        className={`p-1.5 border rounded transition-colors ${
                                                            item.status_aktif
                                                                ? "border-gray-200 text-gray-300 opacity-50 cursor-not-allowed"
                                                                : "border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                                        }`}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {kepsekTotalPages > 1 && (
                        <Pagination
                            currentPage={pageKepsek}
                            totalPages={kepsekTotalPages}
                            onPageChange={setPageKepsek}
                        />
                    )}
                </div>
            </div>

            {/* MODAL FORM AKUN */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={
                    modalMode === "add"
                        ? `Buat Akun ${modalType === "verifikator" ? "Verifikator" : "Kepala Sekolah"}`
                        : `Edit Akun ${modalType === "verifikator" ? "Verifikator" : "Kepala Sekolah"}`
                }
            >
                {modalMode ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nama}
                                onChange={(e) =>
                                    setFormData({ ...formData, nama: e.target.value })
                                }
                                placeholder="Contoh: Budi Santoso"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-dark focus:border-blue-dark"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                placeholder="contoh_user"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-dark focus:border-blue-dark"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {modalMode === "edit" ? "Password Baru" : "Password Akun"}
                            </label>
                            <input
                                type="password"
                                required={modalMode === "add"}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                placeholder="********"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-dark focus:border-blue-dark"
                            />
                            {modalMode === "edit" && (
                                <p className="text-xs text-gray-500 mt-1 font-medium">
                                    Kosongkan jika tidak ingin mengubah kata sandi.
                                </p>
                            )}
                            <p className="text-xs text-blue-600 mt-4 font-medium">
                                Kata sandi minimal 6 karakter, mengandung huruf kecil,
                                huruf besar, angka, dan simbol.
                            </p>
                        </div>
                        <div className="pt-4 flex justify-end gap-3 border-t">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {submitting ? "Menyimpan..." : "Simpan Akun"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <></>
                )}
            </Modal>

            {/* MODAL KONFIRMASI */}
            {confirmModal.open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    aria-modal="true"
                >
                    <div
                        className="fixed inset-0 bg-slate-950/55 transition-opacity"
                        aria-hidden="true"
                        onClick={!confirmLoading ? closeConfirmModal : undefined}
                    />
                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-7 z-10">
                        {/* Ikon */}
                        <div
                            className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4 border-4 ${
                                confirmModal.isDanger
                                    ? "bg-red-50 border-red-100"
                                    : "bg-orange-50 border-orange-100"
                            }`}
                        >
                            <AlertTriangle
                                size={26}
                                className={
                                    confirmModal.isDanger
                                        ? "text-red-600"
                                        : "text-orange-500"
                                }
                            />
                        </div>
                        {/* Judul */}
                        <h3 className="text-center text-lg font-extrabold text-gray-900 mb-2">
                            {confirmModal.title}
                        </h3>
                        {/* Pesan */}
                        <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
                            {confirmModal.message}
                        </p>
                        {/* Tombol */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={closeConfirmModal}
                                disabled={confirmLoading}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmAction}
                                disabled={confirmLoading}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-sm ${confirmModal.confirmClass}`}
                            >
                                {confirmLoading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    confirmModal.confirmLabel
                                )}
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
