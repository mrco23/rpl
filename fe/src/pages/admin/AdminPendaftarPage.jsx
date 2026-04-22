import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle } from 'lucide-react';
import AdminHeader from '@components/features/AdminHeader';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import { getAllPendaftar, updateStatusMassal } from '../../services/adminPendaftarService.js';
import { PENDAFTAR_STATUS, STATUS_LABELS } from '../../constants/pendaftarStatus.js';

export default function AdminPendaftarPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [targetStatus, setTargetStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [selectedWave, setSelectedWave] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllPendaftar();
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data pendaftar");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map(item => item.id_pendaftar));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleMassUpdate = async () => {
    if (selectedIds.length === 0) return alert("Pilih minimal satu pendaftar");
    if (!targetStatus) return alert("Pilih status tujuan");

    try {
      setIsUpdating(true);
      await updateStatusMassal(selectedIds, targetStatus);
      setShowSuccessModal(true);
      setSelectedIds([]);
      setTargetStatus('');
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredData = data.filter(item =>
    item.nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nisn?.includes(searchQuery)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'menunggu verifikasi':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Menunggu Verifikasi</span>;
      case 'terverifikasi':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Terverifikasi</span>;
      case 'perlu perbaikan':
      case 'unggah ulang':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold uppercase">{status}</span>;
      case 'tidak lulus':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Tidak Lulus</span>;
      case 'lulus':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Lulus</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold uppercase">{status?.replace('_', ' ')}</span>;
    }
  };

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


          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Kiri: Dropdown Gelombang */}
            <div className="flex items-center gap-3">
              <select
                className="min-w-[230px] border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#2a479b]"
                value={selectedWave}
                onChange={(e) => setSelectedWave(e.target.value)}
              >
                <option value="">Filter Gelombang</option>
                <option value="gelombang-1">Gelombang 1</option>
                <option value="gelombang-2">Gelombang 2</option>
                <option value="gelombang-3">Gelombang 3</option>
              </select>
            </div>

            {/* Kanan: Tombol Ubah Status Massal */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMassUpdate}
                disabled={selectedIds.length === 0 || !targetStatus || isUpdating}
                className={`inline-flex items-center justify-center gap-2 bg-[#253b80] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#2646ae] transition-all ${selectedIds.length === 0 || !targetStatus || isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                Ubah Status Massal
              </button>
            </div>
          </div>

          {/* Filter Status */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-sm font-medium text-gray-700">Filter Status:</span>

            {['Semua', 'Menunggu', 'Terverifikasi', 'Perlu Revisi', 'Diterima', 'Wawancara'].map((status, i) => (
              <button
                key={i}
                type="button"
                className={`px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer ${status === 'Semua'
                  ? 'bg-[#4c6288] text-white'
                  : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
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

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 w-full md:w-auto bg-blue-50 p-2 rounded-lg border border-blue-100">
              <span className="text-sm font-medium text-blue-700 ml-2">{selectedIds.length} Terpilih</span>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="">Pilih Status...</option>
                {PENDAFTAR_STATUS.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
              <button
                onClick={handleMassUpdate}
                disabled={isUpdating}
                className={`bg-[#253b80] text-white px-4 py-1 rounded text-sm font-medium hover:bg-opacity-90 transition-all cursor-pointer ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? 'Proses...' : 'Update Status'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4"
                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
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
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
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
                  <td colSpan={6} className="p-8 text-center text-gray-500">Tidak ada pendaftar ditemukan</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id_pendaftar} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="cursor-pointer w-4 h-4"
                        checked={selectedIds.includes(item.id_pendaftar)}
                        onChange={() => handleSelectOne(item.id_pendaftar)}
                      />
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{item.nisn || '-'}</td>
                    <td className="p-4 text-sm text-gray-800 font-semibold">{item.nama_lengkap}</td>
                    <td className="p-4 text-sm text-gray-600">{item.gelombang?.nama || '-'}</td>
                    <td className="p-4">{getStatusBadge(item.status_pendaftaran)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
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

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Pendaftar"
      >
        {selectedItem && (
          <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Nama Lengkap</p>
                <p className="font-semibold text-lg">{selectedItem.nama_lengkap}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">NISN</p>
                <p className="font-semibold text-lg">{selectedItem.nisn || '-'}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Alamat</p>
              <p className="font-medium whitespace-pre-wrap">
                {selectedItem.alamat ? (
                  `${selectedItem.alamat.provinsi}, ${selectedItem.alamat.kota_kabupaten}, ${selectedItem.alamat.kecamatan}, ${selectedItem.alamat.kelurahan}, RT/RW: ${selectedItem.alamat.rt_rw}, Kode Pos: ${selectedItem.alamat.kode_pos}`
                ) : (
                  '-'
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tempat Lahir</p>
                <p className="font-medium">{selectedItem.tempat_lahir || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tanggal Lahir</p>
                <p className="font-medium">
                  {selectedItem.tanggal_lahir ? new Date(selectedItem.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Gender</p>
                <p className="font-medium">{selectedItem.jenis_kelamin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">No. HP</p>
                <p className="font-medium text-blue-600">{selectedItem.no_hp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Asal Sekolah</p>
                <p className="font-medium">{selectedItem.asal_sekolah}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="font-medium">{selectedItem.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Nama Wali</p>
                <p className="font-medium">{selectedItem.nama_wali || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Gelombang</p>
                <p className="font-medium">{selectedItem.gelombang?.nama || '-'}</p>
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Status Pendaftaran</p>
              <div className="inline-block">{getStatusBadge(selectedItem.status_pendaftaran)}</div>
            </div>

            {selectedItem.catatan_dokumen && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-2">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Catatan Dokumen / Perbaikan:</p>
                <p className="text-sm text-amber-900">{selectedItem.catatan_dokumen}</p>
              </div>
            )}

            <div className="pt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 font-bold transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Berhasil"
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Status Diperbarui</h3>
          <p className="text-sm text-gray-600 mb-6">Status pendaftaran telah berhasil diperbarui secara massal.</p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-[#253b80] text-white py-2.5 rounded-lg font-bold hover:bg-opacity-90 transition-all cursor-pointer"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}
