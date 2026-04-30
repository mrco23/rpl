import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Eye } from 'lucide-react';
import AdminHeader from '@components/features/AdminHeader';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Toast from '../../components/ui/Toast.jsx';
import { getAllPendaftar, updateStatusMassal } from '../../services/adminPendaftarService.js';
import { filterStatus, PENDAFTAR_STATUS_UPDATE } from '../../constants/pendaftarStatus.js';

const INITIAL_TOAST = {
    show: false,
    message: '',
    type: 'success',
};

const WAVE_OPTIONS = [
    { value: '', label: 'Filter Gelombang' },
    { value: 'gelombang-1', label: 'Gelombang 1' },
    { value: 'gelombang-2', label: 'Gelombang 2' },
    { value: 'gelombang-3', label: 'Gelombang 3' },
];

const SKELETON_ROWS = 5;

const normalizeWaveName = (value = '') => value.toLowerCase().replace(/\s+/g, '-');

const getAddressText = (alamat) => {
    if (!alamat) return '-';

    return `${alamat.provinsi}, ${alamat.kota_kabupaten}, ${alamat.kecamatan}, ${alamat.kelurahan}, RT/RW: ${alamat.rt_rw}, Kode Pos: ${alamat.kode_pos}`;
};

const formatBirthDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const getStatusBadge = (status) => {
    switch (status) {
        case 'menunggu verifikasi':
            return (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Menunggu Verifikasi
                </span>
            );
        case 'terverifikasi':
            return (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Terverifikasi
                </span>
            );
        case 'perlu perbaikan':
            return (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold uppercase whitespace-nowrap">
                    Perlu Perbaikan
                </span>
            );
        case 'wawancara orang tua':
            return (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Wawancara Orang Tua
                </span>
            );
        case 'tidak lulus':
            return (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Tidak Lulus
                </span>
            );
        case 'lulus':
            return (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Lulus
                </span>
            );
        default:
            return (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold uppercase whitespace-nowrap">
                    {status?.replace(/_/g, ' ')}
                </span>
            );
    }
};

export default function AdminPendaftarPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [targetStatus, setTargetStatus] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [toastConfig, setToastConfig] = useState(INITIAL_TOAST);
    const [selectedStatus, setSelectedStatus] = useState('semua');
    const [selectedWave, setSelectedWave] = useState('');

    const showToast = useCallback((message, type = 'success') => {
        setToastConfig({
            show: true,
            message,
            type,
        });
    }, []);

    const closeToast = useCallback(() => {
        setToastConfig((prev) => ({
            ...prev,
            show: false,
        }));
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const openDetailModal = useCallback((item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }, []);

    const fetchData = useCallback(async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);

            const res = await getAllPendaftar();
            setData(res.data || []);
        } catch (error) {
            console.error(error);
            showToast('Gagal memuat data pendaftar', 'error');
        } finally {
            if (showLoader) setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredData = useMemo(() => {
        const normalizedSearchQuery = searchQuery.trim().toLowerCase();

        return data.filter((item) => {
            const name = item.nama_lengkap?.toLowerCase() || '';
            const nisn = item.nisn || '';
            const waveSlug = item.gelombang?.slug || '';
            const waveName = normalizeWaveName(item.gelombang?.nama);
            const status = item.status_pendaftaran || '';

            const matchSearch =
                !normalizedSearchQuery ||
                name.includes(normalizedSearchQuery) ||
                nisn.includes(searchQuery);

            const matchWave =
                !selectedWave ||
                waveSlug === selectedWave ||
                waveName === selectedWave;

            const matchStatus =
                selectedStatus === 'semua' || status === selectedStatus;

            return matchSearch && matchWave && matchStatus;
        });
    }, [data, searchQuery, selectedWave, selectedStatus]);

    const isAllSelected =
        filteredData.length > 0 &&
        selectedIds.length === filteredData.length;

    const isMassUpdateDisabled =
        selectedIds.length === 0 || !targetStatus || isUpdating;

    const handleSelectAll = useCallback(
        (event) => {
            if (event.target.checked) {
                setSelectedIds(filteredData.map((item) => item.id_pendaftar));
                return;
            }

            setSelectedIds([]);
        },
        [filteredData]
    );

    const handleSelectOne = useCallback((id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    }, []);

    const resetMassUpdateState = useCallback(() => {
        setSelectedIds([]);
        setTargetStatus('');
    }, []);

    const handleMassUpdate = useCallback(async () => {
        if (selectedIds.length === 0) {
            showToast('Pilih minimal satu pendaftar', 'error');
            return;
        }

        if (!targetStatus) {
            showToast('Pilih status tujuan', 'error');
            return;
        }

        try {
            setIsUpdating(true);
            await updateStatusMassal(selectedIds, targetStatus);

            showToast(
                'Status pendaftaran telah berhasil diperbarui secara massal.',
                'success'
            );
            resetMassUpdateState();
            await fetchData(false);
        } catch (error) {
            console.error(error);
            showToast('Gagal memperbarui status', 'error');
        } finally {
            setIsUpdating(false);
        }
    }, [fetchData, resetMassUpdateState, selectedIds, showToast, targetStatus]);

    return (
        <>
            <AdminHeader
                text="Data Pendaftar"
                subText="Pantau dan lihat informasi pendaftar siswa baru di sini."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl border border-[#d9e0ef] shadow-sm p-3 mb-6">
                    <h2 className="text-[18px] font-semibold text-gray-900 mb-5">
                        Filter Gelombang
                    </h2>

                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <select
                                className="w-full sm:w-auto sm:min-w-[200px] border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#2a479b]"
                                value={selectedWave}
                                onChange={(e) => setSelectedWave(e.target.value)}
                            >
                                {WAVE_OPTIONS.map((option) => (
                                    <option key={option.value || 'all'} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <div className="relative w-full sm:w-80">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Cari Nama atau NISN..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#253b80] bg-white shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <span className="text-sm font-medium text-blue-700">
                                {selectedIds.length} Terpilih
                            </span>
                            <select
                                value={targetStatus}
                                onChange={(e) => setTargetStatus(e.target.value)}
                                className="w-full sm:w-auto text-sm border border-gray-300 rounded px-2 py-2 focus:outline-none cursor-pointer"
                            >
                                <option value="">Pilih Status...</option>
                                {PENDAFTAR_STATUS_UPDATE.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleMassUpdate}
                                disabled={isMassUpdateDisabled}
                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#253b80] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#2646ae] transition-all ${isMassUpdateDisabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer'
                                    }`}
                            >
                                {isUpdating ? 'Memperbarui...' : 'Ubah Status Massal'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3 w-full">
                        <span className="text-sm font-medium text-gray-700 ml-1">
                            Filter Status:
                        </span>
                        <div className="w-full flex justify-start gap-3">
                            {filterStatus.map((status) => (
                                <button
                                    key={status.value}
                                    type="button"
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${selectedStatus === status.value
                                        ? 'bg-[#4c6288] text-white'
                                        : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                                        }`}
                                    onClick={() => setSelectedStatus(status.value)}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-[#f8fafc] border-b border-gray-200 text-sm font-bold text-gray-800">
                                <th className="p-4 w-12">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer w-4 h-4"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="p-4">NISN</th>
                                <th className="p-4">Nama Pendaftar</th>
                                <th className="p-4">Gelombang</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="p-4"><Skeleton className="h-4 w-4" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-3/4" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                                        <td className="p-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                                        <td className="p-4 flex justify-center"><Skeleton className="h-8 w-8 rounded" /></td>
                                    </tr>
                                ))
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        Tidak ada pendaftar ditemukan
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <tr
                                        key={item.id_pendaftar}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="cursor-pointer w-4 h-4"
                                                checked={selectedIds.includes(item.id_pendaftar)}
                                                onChange={() => handleSelectOne(item.id_pendaftar)}
                                            />
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 font-medium">
                                            {item.nisn || '-'}
                                        </td>
                                        <td className="p-4 text-sm text-gray-800 font-semibold">
                                            {item.nama_lengkap}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {item.gelombang?.nama || '-'}
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(item.status_pendaftaran)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openDetailModal(item)}
                                                    title="Lihat Detail Pendaftar"
                                                    className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={closeModal} title="Detail Pendaftar">
                {selectedItem && (
                    <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Nama Lengkap
                                </p>
                                <p className="font-semibold text-lg">
                                    {selectedItem.nama_lengkap}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    NISN
                                </p>
                                <p className="font-semibold text-lg">
                                    {selectedItem.nisn || '-'}
                                </p>
                            </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                Alamat
                            </p>
                            <p className="font-medium whitespace-pre-wrap text-sm">
                                {getAddressText(selectedItem.alamat)}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Tempat Lahir
                                </p>
                                <p className="font-medium">
                                    {selectedItem.tempat_lahir || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Tanggal Lahir
                                </p>
                                <p className="font-medium">
                                    {formatBirthDate(selectedItem.tanggal_lahir)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Gender
                                </p>
                                <p className="font-medium">
                                    {selectedItem.jenis_kelamin}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    No. HP
                                </p>
                                <p className="font-medium text-blue-600">
                                    {selectedItem.no_hp}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Asal Sekolah
                                </p>
                                <p className="font-medium">
                                    {selectedItem.asal_sekolah}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Email
                                </p>
                                <p className="font-medium break-all">
                                    {selectedItem.email || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Nama Wali
                                </p>
                                <p className="font-medium">
                                    {selectedItem.nama_wali || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Gelombang
                                </p>
                                <p className="font-medium">
                                    {selectedItem.gelombang?.nama || '-'}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t mt-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                Status Pendaftaran
                            </p>
                            <div className="inline-block">
                                {getStatusBadge(selectedItem.status_pendaftaran)}
                            </div>
                        </div>

                        {selectedItem.catatan_dokumen && (
                            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-2">
                                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                                    Catatan Dokumen / Perbaikan:
                                </p>
                                <p className="text-sm text-amber-900">
                                    {selectedItem.catatan_dokumen}
                                </p>
                            </div>
                        )}

                        <div className="pt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 font-bold transition-all cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            <Toast
                show={toastConfig.show}
                message={toastConfig.message}
                type={toastConfig.type}
                onClose={closeToast}
            />
        </>
    );
}