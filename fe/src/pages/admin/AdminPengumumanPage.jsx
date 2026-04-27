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
  Loader2
} from "lucide-react";
import AdminHeader from "../../components/features/AdminHeader";
import Modal from "../../components/ui/Modal";
import Skeleton from "../../components/ui/Skeleton";
import {
  getAllPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman
} from "../../services/adminPengumumanService";
import { getAllPendaftar } from "../../services/adminPendaftarService";
import { PENDAFTAR_STATUS, STATUS_LABELS } from "../../constants/pendaftarStatus";
import { Search, Filter, CheckSquare, Square } from "lucide-react";


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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


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


  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getAllPengumuman();
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({ judul_pengumuman: '', deksripsi: '', recipients: [] });
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
      setSuccessMessage("Data berhasil dihapus!");
      setShowSuccessModal(true);
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await createPengumuman(formData);
        setSuccessMessage("PendaftarPengumumanPage berhasil ditambahkan!");
      } else {
        await updatePengumuman(selectedItem.id_pengumuman, formData);
        setSuccessMessage("PendaftarPengumumanPage berhasil diperbarui!");
      }
      setIsModalOpen(false);
      fetchNotifications();
      setShowSuccessModal(true);
    } catch (err) {
      alert("Gagal menyimpan data");
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
            Daftar PendaftarPengumumanPage
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
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Buat PendaftarPengumumanPage Baru' : modalMode === 'edit' ? 'Edit PendaftarPengumumanPage' : 'Detail PendaftarPengumumanPage'}
      >
        {modalMode === 'detail' ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl text-gray-800">{selectedItem?.judul_pengumuman}</h3>
              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(selectedItem?.tanggal_dibuat)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {formatTime(selectedItem?.tanggal_dibuat)}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{selectedItem?.deksripsi}</p>
            <div className="pt-6 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 font-bold text-sm transition-colors cursor-pointer">TUTUP</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Judul PendaftarPengumumanPage</label>
              <input
                type="text"
                required
                placeholder="Contoh: Hasil Seleksi Gelombang 1"
                value={formData.judul_pengumuman}
                onChange={(e) => setFormData({ ...formData, judul_pengumuman: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-[#253b80] focus:border-[#253b80] shadow-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Isi PendaftarPengumumanPage</label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan isi pengumuman di sini..."
                value={formData.deksripsi}
                onChange={(e) => setFormData({ ...formData, deksripsi: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-[#253b80] focus:border-[#253b80] shadow-sm transition-all resize-none"
              />
            </div>

            {/* RECIPIENTS SELECTION */}
            <div className="border-t pt-4">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Penerima PendaftarPengumumanPage</label>

              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari nama..."
                    className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    value={pendaftarSearch}
                    onChange={e => setPendaftarSearch(e.target.value)}
                  />
                </div>
                <select
                  className="text-xs border rounded-lg px-2 outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  value={pendaftarFilter}
                  onChange={e => setPendaftarFilter(e.target.value)}
                >
                  <option value="">Semua Status</option>
                  {PENDAFTAR_STATUS.map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s] || s}</option>
                  ))}
                </select>
              </div>

              <div className="max-h-48 overflow-y-auto border rounded-xl divide-y">
                {pendaftarList
                  .filter(p => !pendaftarFilter || p.status_pendaftaran === pendaftarFilter)
                  .filter(p => !pendaftarSearch || p.nama_lengkap.toLowerCase().includes(pendaftarSearch.toLowerCase()))
                  .map(p => {
                    const isSelected = formData.recipients.includes(p.id_pendaftar);
                    return (
                      <div
                        key={p.id_pendaftar}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          const newRecipients = isSelected
                            ? formData.recipients.filter(id => id !== p.id_pendaftar)
                            : [...formData.recipients, p.id_pendaftar];
                          setFormData({ ...formData, recipients: newRecipients });
                        }}
                      >
                        {isSelected ? <CheckSquare size={18} className="text-[#253b80]" /> : <Square size={18} className="text-gray-300" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{p.nama_lengkap}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{STATUS_LABELS[p.status_pendaftaran] || p.status_pendaftaran}</p>
                        </div>
                      </div>
                    );
                  })}
                {pendaftarList.length === 0 && <div className="p-4 text-center text-gray-400 text-sm">Tidak ada pendaftar</div>}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">* {formData.recipients.length} pendaftar dipilih</p>
            </div>

            <div className="pt-4 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
              >
                BATAL
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-2.5 text-sm font-bold text-white bg-[#253b80] rounded-xl hover:bg-[#1a2c66] transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {submitting ? 'MENYIMPAN...' : 'SIMPAN'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">BERHASIL!</h2>
            <p className="text-sm text-gray-500 mb-8">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#253b80] text-white rounded-xl font-bold hover:bg-[#1a2c66] transition-all cursor-pointer shadow-lg active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* NOTE */}
      <div className="mt-8 bg-blue-50 text-[#253b80] p-4 rounded-xl text-sm flex items-start gap-3 border border-blue-100 shadow-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p className="font-medium">
          PendaftarPengumumanPage yang sudah diunggah akan langsung terlihat oleh calon
          pendaftar pada halaman pengumuman di akun pendaftar masing-masing.
        </p>
      </div>
    </div>
  );
}

export default AdminPengumumanPage;
