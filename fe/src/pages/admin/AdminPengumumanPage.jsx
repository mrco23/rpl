import React, { useState, useEffect } from "react";
import {
  Megaphone,
  CheckCircle,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Info,
  Calendar,
  Clock,
  ClipboardList,
  Plus,
  Loader2,
  Search,
  Filter,
  CheckSquare,
  Square,
  Users,
  Check
} from "lucide-react";
import AdminHeader from "../../components/features/AdminHeader";
import Modal from "../../components/ui/Modal";
import Skeleton from "../../components/ui/Skeleton";
import Toast from "../../components/ui/Toast";
import {
  getAllPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman
} from "../../services/adminPengumumanService";
import { getAllPendaftar } from "../../services/adminPendaftarService";
import { PENDAFTAR_STATUS, STATUS_LABELS } from "../../constants/pendaftarStatus";

function AdminPengumumanPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({ judul_pengumuman: '', deksripsi: '', recipients: [] });
  const [pendaftarList, setPendaftarList] = useState([]);
  const [pendaftarFilter, setPendaftarFilter] = useState('');
  const [pendaftarSearch, setPendaftarSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchNotifications();
    fetchPendaftar();
  }, []);

  const fetchPendaftar = async () => {
    try {
      const res = await getAllPendaftar();
      setPendaftarList(res.data || []);
    } catch (err) {
      console.error("Gagal ambil pendaftar:", err);
    }
  };

  const fetchNotifications = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const res = await getAllPengumuman();
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
      setToastConfig({ show: true, message: "Gagal memuat pengumuman", type: "error" });
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Fungsi pembersih modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFormData({ judul_pengumuman: '', deksripsi: '', recipients: [] });
      setSelectedItem(null);
      setPendaftarSearch('');
      setPendaftarFilter('');
    }, 200);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({ judul_pengumuman: '', deksripsi: '', recipients: [] });
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData({
      judul_pengumuman: item.judul_pengumuman || '',
      deksripsi: item.deksripsi || '',
      recipients: (item.pengumuman_pendaftar || []).map(rp => rp.id_pendaftar)
    });
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item) => {
    setModalMode('detail');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin data akan dihapus?")) return;
    try {
      await deletePengumuman(id);
      setNotifications(prev => prev.filter(item => item.id_pengumuman !== id));
      setToastConfig({ show: true, message: "Data berhasil dihapus!", type: "success" });
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal menghapus data", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await createPengumuman(formData);
        setToastConfig({ show: true, message: "Pengumuman berhasil ditambahkan!", type: "success" });
      } else {
        await updatePengumuman(selectedItem.id_pengumuman, formData);
        setToastConfig({ show: true, message: "Pengumuman berhasil diperbarui!", type: "success" });
      }
      handleCloseModal();
      fetchNotifications(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal menyimpan data", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  // Pagination Logic
  const totalItems = notifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = notifications.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  const stats = [
    {
      title: "Semua Pengumuman",
      value: notifications.length,
      icon: <Megaphone size={20} />,
      color: "bg-[#253b80] text-white",
    },
    {
      title: "Hari Ini",
      value: notifications.filter(n => new Date(n.tanggal_dibuat).toDateString() === new Date().toDateString()).length,
      icon: <Clock size={20} />,
      color: "bg-green-700 text-white",
    }
  ];

  // Helper List Pendaftar Berdasarkan Filter
  const filteredPendaftar = pendaftarList
    .filter(p => !pendaftarFilter || p.status_pendaftaran === pendaftarFilter)
    .filter(p => !pendaftarSearch || p.nama_lengkap.toLowerCase().includes(pendaftarSearch.toLowerCase()));

  // Logika "Pilih Semua" berdasarkan filter yang aktif
  const handleSelectAllFiltered = () => {
    const filteredIds = filteredPendaftar.map(p => p.id_pendaftar);
    const allSelected = filteredIds.every(id => formData.recipients.includes(id));

    if (allSelected) {
      // Hapus pilihan yang difilter dari recipients
      setFormData({
        ...formData,
        recipients: formData.recipients.filter(id => !filteredIds.includes(id))
      });
    } else {
      // Tambahkan yang difilter ke recipients (hindari duplikat)
      const newRecipients = [...new Set([...formData.recipients, ...filteredIds])];
      setFormData({ ...formData, recipients: newRecipients });
    }
  };

  const isAllFilteredSelected = filteredPendaftar.length > 0 && filteredPendaftar.every(p => formData.recipients.includes(p.id_pendaftar));

  // Helper gaya status
  const getBadgeStyle = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('menunggu')) return 'bg-orange-100 text-orange-700';
    if (s.includes('terverifikasi') || s.includes('lolos') || s.includes('lulus')) return 'bg-green-100 text-green-700';
    if (s.includes('perbaikan') || s.includes('ditolak')) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader
        text="Pengumuman PPDB"
        subText="Kelola informasi dan pengumuman untuk calon peserta didik baru."
      />

      {/* STAT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 transition-transform hover:-translate-y-1"
          >
            <div className={`p-3 rounded-lg ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="flex items-center gap-2 font-bold text-lg text-gray-800 uppercase tracking-tight">
            <ClipboardList size={20} className="text-[#253b80]" />
            Daftar Pengumuman
          </h2>
          <button
            onClick={handleOpenAdd}
            className="bg-[#253b80] hover:bg-[#1a2c66] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus size={18} />
            BUAT PENGUMUMAN
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white"><Skeleton className="h-4 w-1/4 mb-3" /><Skeleton className="h-6 w-1/2 mb-2" /><Skeleton className="h-4 w-full" /></div>
            ))
          ) : paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed text-gray-400">Belum ada pengumuman yang dibuat</div>
          ) : (
            paginatedData.map((item) => (
              <div
                key={item.id_pengumuman}
                className="shadow-sm border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center bg-white hover:border-[#253b80]/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#253b80] transition-colors">{item.judul_pengumuman}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2 max-w-3xl">{item.deksripsi}</p>

                  <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{formatDate(item.tanggal_dibuat)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                      <Clock size={14} className="text-gray-400" />
                      <span>{formatTime(item.tanggal_dibuat)}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION */}
                <div className="flex gap-2 md:flex-row lg:flex-col xl:flex-row  mt-4 md:mt-0">
                  <button
                    onClick={() => handleOpenDetail(item)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-500 hover:text-gray-800"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id_pengumuman)}
                    className="p-2 border border-red-100 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center md:justify-end gap-2 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold shadow-sm"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm cursor-pointer transition-all ${currentPage === i + 1
                  ? "bg-[#253b80] text-white"
                  : "border border-gray-300 bg-white hover:bg-gray-50 text-gray-600"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold shadow-sm"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Modal Reusable */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={modalMode === 'add' ? 'Buat Pengumuman Baru' : modalMode === 'edit' ? 'Edit Pengumuman' : 'Detail Pengumuman'}
      >
        {modalMode === 'detail' ? (
          <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar pb-4">
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <h3 className="font-extrabold text-2xl text-gray-900 leading-tight mb-2">{selectedItem?.judul_pengumuman}</h3>
              <div className="flex gap-4 mt-1 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#253b80]" /> {formatDate(selectedItem?.tanggal_dibuat)}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#253b80]" /> {formatTime(selectedItem?.tanggal_dibuat)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 border-b border-gray-100 pb-2">
                <FileText size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Isi Pengumuman</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap pt-1">{selectedItem?.deksripsi}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-gray-500 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Dikirim Kepada</span>
                </div>
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {selectedItem?.pengumuman_pendaftar?.length || 0} Pendaftar
                </span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 max-h-40 overflow-y-auto custom-scrollbar">
                {selectedItem?.pengumuman_pendaftar && selectedItem.pengumuman_pendaftar.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600 pl-2 space-y-1">
                    {selectedItem.pengumuman_pendaftar.map((p) => (
                      <li key={p.id_pendaftar}>{p.pendaftar?.nama_lengkap || 'Unknown'}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">Tidak ada pendaftar terpilih.</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={handleCloseModal} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 font-bold text-sm transition-colors cursor-pointer">Tutup Jendela</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar pb-4">

            {/* Informasi Utama */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                <FileText size={18} className="text-[#253b80]" />
                <h3 className="font-bold text-gray-800">Informasi Utama</h3>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Judul Pengumuman <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hasil Seleksi Gelombang 1"
                  value={formData.judul_pengumuman}
                  onChange={(e) => setFormData({ ...formData, judul_pengumuman: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Isi Pengumuman <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pesan pengumuman secara lengkap di sini..."
                  value={formData.deksripsi}
                  onChange={(e) => setFormData({ ...formData, deksripsi: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all resize-none custom-scrollbar"
                />
              </div>
            </div>

            {/* Target Penerima */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#253b80]" />
                  <h3 className="font-bold text-gray-800">Target Penerima <span className="text-red-500">*</span></h3>
                </div>
                <div className="text-xs font-bold bg-[#253b80]/10 text-[#253b80] px-3 py-1 rounded-full">
                  {formData.recipients.length} Dipilih
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari nama pendaftar..."
                    className="w-full bg-white pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
                    value={pendaftarSearch}
                    onChange={e => setPendaftarSearch(e.target.value)}
                  />
                </div>
                <select
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] bg-white transition-all min-w-[150px]"
                  value={pendaftarFilter}
                  onChange={e => setPendaftarFilter(e.target.value)}
                >
                  <option value="">Semua Status</option>
                  {PENDAFTAR_STATUS.map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s] || s}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between pt-1 pb-1">
                <span className="text-xs text-gray-500 font-medium italic">
                  Menampilkan {filteredPendaftar.length} pendaftar sesuai pencarian.
                </span>
                {filteredPendaftar.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAllFiltered}
                    className="text-xs font-bold text-[#253b80] hover:text-[#1a2c66] hover:underline cursor-pointer transition-all"
                  >
                    {isAllFilteredSelected ? "Batal Pilih Semua" : "Pilih Semua (Hasil Filter)"}
                  </button>
                )}
              </div>

              <div className="max-h-56 overflow-y-auto border border-gray-200 rounded-xl bg-slate-50 custom-scrollbar p-1.5 space-y-1">
                {filteredPendaftar.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 text-sm italic">
                    Tidak ada pendaftar yang cocok.
                  </div>
                ) : (
                  filteredPendaftar.map(p => {
                    const isSelected = formData.recipients.includes(p.id_pendaftar);
                    return (
                      <div
                        key={p.id_pendaftar}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${isSelected
                          ? "bg-blue-50/80 border-blue-200 shadow-sm"
                          : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
                          }`}
                        onClick={() => {
                          const newRecipients = isSelected
                            ? formData.recipients.filter(id => id !== p.id_pendaftar)
                            : [...formData.recipients, p.id_pendaftar];
                          setFormData({ ...formData, recipients: newRecipients });
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isSelected ? "bg-[#253b80] text-white" : "bg-gray-200 text-gray-500"
                          }`}>
                          {p.nama_lengkap.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold truncate ${isSelected ? "text-[#253b80]" : "text-gray-800"}`}>
                            {p.nama_lengkap}
                          </p>
                          <span className={`px-2 py-0.5 mt-1 inline-block rounded text-[9px] font-bold uppercase tracking-wider ${getBadgeStyle(p.status_pendaftaran)}`}>
                            {STATUS_LABELS[p.status_pendaftaran] || p.status_pendaftaran}
                          </span>
                        </div>
                        <div className="shrink-0 pr-1">
                          {isSelected ? (
                            <div className="bg-[#253b80] text-white p-0.5 rounded-full">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          ) : (
                            <Square size={18} className="text-gray-300" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting || formData.recipients.length === 0}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#253b80] rounded-lg hover:bg-[#1a2c66] shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Pengumuman"
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />

      {/* NOTE */}
      <div className="mt-8 bg-blue-50 text-[#253b80] p-4 rounded-xl text-sm flex items-start gap-3 border border-blue-100 shadow-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p className="font-medium">
          Pengumuman yang sudah diunggah akan langsung terlihat oleh calon
          pendaftar pada halaman pengumuman di akun pendaftar masing-masing.
        </p>
      </div>

      {/* CSS untuk Scrollbar Kustom Modal */}
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
    </div>
  );
}

export default AdminPengumumanPage;