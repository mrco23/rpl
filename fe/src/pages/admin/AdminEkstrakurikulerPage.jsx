import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import AdminHeader from "../../components/features/AdminHeader";
import Modal from "../../components/ui/Modal.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import {
  getAllEkstrakurikuler,
  createEkstrakurikuler,
  updateEkstrakurikulerData,
  updateEkstrakurikulerImage,
  deleteEkstrakurikuler,
} from "../../services/adminEkskulService.js";

export default function AdminEkstrakurikulerPage() {
  const [ekskuls, setEkskuls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'detail'
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    nama_ekskul: "",
    p_jwb_ekskul: "",
    deskripsi: "",
  });
  const [formImage, setFormImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchEkskuls();
  }, []);

  const fetchEkskuls = async () => {
    try {
      setLoading(true);
      const res = await getAllEkstrakurikuler();
      // Backend returns { message, data }
      setEkskuls(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat daftar ekstrakurikuler");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ nama_ekskul: "", p_jwb_ekskul: "", deskripsi: "" });
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      nama_ekskul: item.nama_ekskul || "",
      p_jwb_ekskul: item.p_jwb_ekskul || "",
      deskripsi: item.deskripsi || "",
    });
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item) => {
    setModalMode("detail");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin data akan dihapus?")) return;
    try {
      await deleteEkstrakurikuler(id);
      // Sync state after deletion
      setEkskuls((prev) =>
        prev.filter((item) => item.id_ekstrakurikuler !== id),
      );
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
      if (modalMode === "add") {
        const payload = new FormData();
        payload.append("nama_ekskul", formData.nama_ekskul);
        payload.append("p_jwb_ekskul", formData.p_jwb_ekskul);
        payload.append("deskripsi", formData.deskripsi);
        if (formImage) {
          payload.append("gambar", formImage);
        }
        await createEkstrakurikuler(payload);
        setSuccessMessage("Data berhasil ditambahkan!");
      } else if (modalMode === "edit") {
        // Update text data
        await updateEkstrakurikulerData(
          selectedItem.id_ekstrakurikuler,
          formData,
        );

        // Update image if selected
        if (formImage) {
          const imgPayload = new FormData();
          imgPayload.append("gambar", formImage);
          await updateEkstrakurikulerImage(
            selectedItem.id_ekstrakurikuler,
            imgPayload,
          );
        }
        setSuccessMessage("Data berhasil diperbarui!");
      }

      setIsModalOpen(false);
      fetchEkskuls(); // Refresh to ensure data is synced
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert(`Gagal ${modalMode === "add" ? "menambah" : "mengubah"} data`);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredEkskuls = ekskuls.filter(
    (item) =>
      item.nama_ekskul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.p_jwb_ekskul?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Ekstrakurikuler"
        subText="Kelola kegiatan ekstrakurikuler sekolah di sini."
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
              placeholder="Cari Ekstrakurikuler ..."
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

        {/* Tabel Ekstrakurikuler */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-1/4">Ekstrakurikuler</th>
                <th className="p-4 w-1/3">Deskripsi</th>
                <th className="p-4 w-1/4">Pembina</th>
                <th className="p-4 text-center">Aksi</th>
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
                    <td className="p-4">
                      <Skeleton className="h-4 w-1/2" />
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </td>
                  </tr>
                ))
              ) : filteredEkskuls.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Tidak ada data ekstrakurikuler ditemukan
                  </td>
                </tr>
              ) : (
                filteredEkskuls.map((item) => (
                  <tr
                    key={item.id_ekstrakurikuler}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-800 font-semibold truncate max-w-[200px]">
                      {item.nama_ekskul}
                    </td>
                    <td className="p-4 text-sm text-gray-600 truncate max-w-[300px]">
                      {item.deskripsi}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      {item.p_jwb_ekskul}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          title="Lihat Detail"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Ekstrakurikuler"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id_ekstrakurikuler)}
                          title="Hapus Ekstrakurikuler"
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
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "Tambah Ekstrakurikuler"
            : modalMode === "edit"
              ? "Edit Ekstrakurikuler"
              : "Detail Ekstrakurikuler"
        }
      >
        {modalMode === "detail" ? (
          <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto pr-1">
            {selectedItem?.gambar_ekskul ? (
              <img
                src={selectedItem.gambar_ekskul}
                alt="Ekskul"
                className="w-full h-auto rounded-lg max-h-60 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                Gambar tidak ada
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg">{selectedItem?.nama_ekskul}</h3>
              <p className="text-sm text-[#253b80] font-semibold">
                Pembina: {selectedItem?.p_jwb_ekskul}
              </p>
            </div>
            <p className="text-sm whitespace-pre-wrap">
              {selectedItem?.deskripsi}
            </p>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-medium transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-h-[80vh] overflow-y-auto pr-1"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Ekstrakurikuler
              </label>
              <input
                type="text"
                required
                value={formData.nama_ekskul}
                onChange={(e) =>
                  setFormData({ ...formData, nama_ekskul: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pembina / Penanggung Jawab
              </label>
              <input
                type="text"
                required
                value={formData.p_jwb_ekskul}
                onChange={(e) =>
                  setFormData({ ...formData, p_jwb_ekskul: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                required
                rows={4}
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar (Opsional)
              </label>

              {/* PREVIEW */}
              {(formImage || selectedItem?.gambar_ekskul) && (
                <div className="mb-3">
                  <img
                    src={
                      formImage
                        ? URL.createObjectURL(formImage)
                        : selectedItem?.gambar_ekskul
                    }
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* CUSTOM FILE INPUT */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#253b80] hover:bg-blue-50 transition">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Plus size={20} />
                  <p className="text-sm mt-1">
                    {formImage ? "Ganti Gambar" : "Klik untuk upload"}
                  </p>
                  <span className="text-xs text-gray-400">PNG / JPG</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormImage(e.target.files[0])}
                  className="hidden"
                />
              </label>

              {/* NOTE */}
              {modalMode === "edit" &&
                selectedItem?.gambar_ekskul &&
                !formImage && (
                  <p className="text-xs text-gray-500 mt-2">
                    Kosongkan jika tidak ingin mengganti gambar.
                  </p>
                )}
            </div>
            <div className="pt-4 flex justify-end gap-3 ">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-6">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 bg-[#253b80] text-white rounded-lg font-semibold hover:bg-[#1a2c66] transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
