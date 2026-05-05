import { getImageUrl } from "../../utils/imageHelper.js";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2, Image as ImageIcon, UploadCloud, Tag, FileText as FileIcon, Star } from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import Modal from "../../components/ui/Modal.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import Toast from "../../components/ui/Toast.jsx";
import {
  getAllProgramUnggulan,
  createProgramUnggulan,
  updateProgramUnggulan,
  deleteProgramUnggulan,
} from "../../services/adminProgramService.js";

export default function AdminProgramUnggulanPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'detail'
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({ nama_pu: "", deskripsi: "" });
  const [formImage, setFormImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const res = await getAllProgramUnggulan();
      setPrograms(res.data || []);
    } catch (err) {
      console.error(err);
      setToastConfig({ show: true, message: "Gagal memuat daftar program unggulan", type: "error" });
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Fungsi khusus untuk menutup modal dan membersihkan semua state (Bug Fix)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFormData({ nama_pu: "", deskripsi: "" });
      setFormImage(null);
      setSelectedItem(null);
    }, 200);
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ nama_pu: "", deskripsi: "" });
    setFormImage(null);
    setSelectedItem(null); // Memastikan data lama tidak tertinggal
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      nama_pu: item.nama_pu || "",
      deskripsi: item.deskripsi || "",
    });
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item) => {
    setModalMode("detail");
    setSelectedItem(item);
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus program unggulan ini?")) return;
    try {
      await deleteProgramUnggulan(id);
      setToastConfig({ show: true, message: "Program unggulan berhasil dihapus!", type: "success" });
      fetchPrograms(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal menghapus program unggulan", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("nama_pu", formData.nama_pu);
      payload.append("deskripsi", formData.deskripsi);
      if (formImage) {
        payload.append("gambar_pu", formImage);
      }

      if (modalMode === "add") {
        await createProgramUnggulan(payload);
      } else if (modalMode === "edit") {
        await updateProgramUnggulan(selectedItem.id_program, payload);
      }

      handleCloseModal(); // Menutup dan membersihkan state
      setToastConfig({
        show: true,
        message: modalMode === "add" ? "Program unggulan berhasil ditambahkan!" : "Program unggulan berhasil diperbarui!",
        type: "success"
      });
      fetchPrograms(false);
    } catch (err) {
      console.error(err);
      setToastConfig({
        show: true,
        message: `Gagal ${modalMode === "add" ? "menambah" : "mengubah"} program unggulan`,
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPrograms = programs.filter((item) =>
    item.nama_pu?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Program Unggulan"
        subText="Kelola program-program unggulan sekolah di sini."
      />

      <div className="max-w-7xl mx-auto">
        {/* Toolbar: Pencarian & Tombol Buat */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari Program Unggulan ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#253b80] bg-white shadow-sm"
            />
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-white border border-[#253b80] text-[#253b80] hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            Buat
          </button>
        </div>

        {/* Tabel Program Unggulan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-1/3">Program</th>
                <th className="p-4 w-1/3">Deskripsi</th>
                <th className="p-4 w-1/3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="p-4">
                      <Skeleton className="h-4 w-3/4" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </td>
                  </tr>
                ))
              ) : filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    Tidak ada program unggulan ditemukan
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((item) => (
                  <tr
                    key={item.id_program}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-800 font-semibold truncate max-w-[250px]">
                      {item.nama_pu}
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium truncate max-w-[300px]">
                      {item.deskripsi}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Lihat */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          title="Lihat Detail"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Tombol Edit */}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Program"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDelete(item.id_program)}
                          title="Hapus Program"
                          className="p-1.5 border border-red-200 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
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
      </div>

      {/* Modal Reusable */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalMode === "add"
            ? "Tambah Program Unggulan"
            : modalMode === "edit"
              ? "Edit Program Unggulan"
              : "Detail Program Unggulan"
        }
      >
        {modalMode === "detail" ? (
          <div className="flex flex-col gap-6 w-full max-h-[80vh] overflow-y-auto pb-4 pr-2 custom-scrollbar">
            {/* Header Gambar */}
            <div className="w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative group">
              {selectedItem?.gambar_pu && !selectedItem.gambar_pu.includes('null') ? (
                <img
                  src={getImageUrl(selectedItem.gambar_pu)}
                  alt="Program Unggulan"
                  className="w-full h-56 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : (
                <div className="w-full h-56 flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={48} strokeWidth={1.5} className="mb-2 opacity-50" />
                  <span className="text-sm font-medium">Tidak ada gambar terlampir</span>
                </div>
              )}
              {/* Fallback element if image fails to load */}
              <div className="hidden w-full h-56 flex-col items-center justify-center text-slate-400 bg-slate-50">
                <ImageIcon size={48} strokeWidth={1.5} className="mb-2 opacity-50" />
                <span className="text-sm font-medium">Gambar gagal dimuat</span>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <Star size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Nama Program</span>
                </div>
                <h3 className="font-extrabold text-2xl text-gray-900 leading-tight">
                  {selectedItem?.nama_pu}
                </h3>
              </div>

              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-gray-500 border-b border-gray-100 pb-2">
                  <FileIcon size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Deskripsi Program</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pt-1">
                  {selectedItem?.deskripsi || "Tidak ada deskripsi."}
                </p>
              </div>
            </div>

            {/* Aksi Modal Detail */}
            <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 font-semibold transition-colors cursor-pointer text-sm"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto pb-4 pr-2 custom-scrollbar"
          >
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Nama Program <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama program unggulan..."
                value={formData.nama_pu}
                onChange={(e) =>
                  setFormData({ ...formData, nama_pu: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tuliskan deskripsi lengkap mengenai program ini..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 focus:border-[#253b80] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Media Gambar <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>

              {/* Area Preview dan Upload */}
              <div className="flex flex-col gap-3">
                {(formImage || (selectedItem?.gambar_pu && !selectedItem.gambar_pu.includes('null'))) && (
                  <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 group">
                    <img
                      src={
                        formImage
                          ? URL.createObjectURL(formImage)
                          : getImageUrl(selectedItem?.gambar_pu)
                      }
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.style.display = "none";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      {formImage ? 'Gambar Baru' : 'Gambar Saat Ini'}
                    </div>
                  </div>
                )}

                <label className="group flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#253b80] hover:bg-blue-50/50 transition-all bg-slate-50">
                  <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-[#253b80] transition-colors">
                    <UploadCloud size={28} className="mb-2" />
                    <p className="text-sm font-medium">
                      {formImage ? "Pilih gambar lain" : "Klik untuk mengunggah gambar"}
                    </p>
                    <span className="text-xs text-slate-400 mt-1">Format JPG, PNG, atau JPEG</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Aksi Modal Form */}
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
                disabled={submitting}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#253b80] rounded-lg hover:bg-[#1a2c66] shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Data"
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
          background-color: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
      `}} />
    </>
  );
}