import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import Modal from "../../components/ui/Modal.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import {
  getAllPrestasi,
  createPrestasi,
  updatePrestasi,
  deletePrestasi,
} from "../../services/adminAchievementService.js";

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'detail'
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    judul_prestasi: "",
    deskripsi: "",
    peraih_prestasi: "",
  });
  const [formImage, setFormImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await getAllPrestasi();
      setAchievements(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat daftar prestasi");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ judul_prestasi: "", deskripsi: "", peraih_prestasi: "" });
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      judul_prestasi: item.judul_prestasi || "",
      deskripsi: item.deskripsi || "",
      peraih_prestasi: item.peraih_prestasi || "",
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
    if (!window.confirm("Yakin ingin menghapus prestasi ini?")) return;
    try {
      await deletePrestasi(id);
      fetchAchievements();
    } catch (err) {
      alert("Gagal menghapus prestasi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("judul_prestasi", formData.judul_prestasi);
      payload.append("deskripsi", formData.deskripsi);
      payload.append("peraih_prestasi", formData.peraih_prestasi);
      if (formImage) {
        payload.append("gambar_prestasi", formImage);
      }

      if (modalMode === "add") {
        await createPrestasi(payload);
      } else if (modalMode === "edit") {
        await updatePrestasi(selectedItem.id_prestasi, payload);
      }
      setIsModalOpen(false);
      fetchAchievements();
    } catch (err) {
      console.error(err);
      alert(`Gagal ${modalMode === "add" ? "menambah" : "mengubah"} prestasi`);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAchievements = achievements.filter((item) =>
    item.judul_prestasi?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Prestasi"
        subText="Kelola data prestasi siswa dan sekolah di sini."
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
              placeholder="Cari Prestasi ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-white border border-[#253b80] text-[#253b80] hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            Buat
          </button>
        </div>

        {/* Tabel Prestasi */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-1/3">Prestasi</th>
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
              ) : filteredAchievements.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    Tidak ada prestasi ditemukan
                  </td>
                </tr>
              ) : (
                filteredAchievements.map((item) => (
                  <tr
                    key={item.id_prestasi}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-800 font-semibold">
                      <p className="max-w-[250px] truncate">
                        {item.judul_prestasi}
                      </p>
                      {item.peraih_prestasi && (
                        <p className="text-xs text-blue-600 font-normal mt-1 flex items-center gap-1">
                          Peraih: {item.peraih_prestasi}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-[300px] truncate font-medium">
                      {item.deskripsi}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Lihat */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          title="Lihat Detail"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Tombol Edit */}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Prestasi"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300"
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDelete(item.id_prestasi)}
                          title="Hapus Prestasi"
                          className="p-1.5 border border-red-200 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
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
            ? "Tambah Prestasi Baru"
            : modalMode === "edit"
              ? "Edit Prestasi"
              : "Detail Prestasi"
        }
      >
        {modalMode === "detail" ? (
          <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto">
            {selectedItem?.gambar_prestasi && (
              <img
                src={selectedItem.gambar_prestasi}
                alt="Prestasi"
                className="w-full h-auto rounded-lg max-h-60 object-cover"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {selectedItem?.judul_prestasi}
              </h3>
              {selectedItem?.peraih_prestasi && (
                <p className="text-sm font-semibold text-blue-700">
                  Peraih: {selectedItem.peraih_prestasi}
                </p>
              )}
            </div>
            <p className="whitespace-pre-wrap">{selectedItem?.deskripsi}</p>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-medium transition-colors"
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
                Judul Prestasi
              </label>
              <input
                type="text"
                required
                value={formData.judul_prestasi}
                onChange={(e) =>
                  setFormData({ ...formData, judul_prestasi: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Peraih Prestasi
              </label>
              <input
                type="text"
                required
                value={formData.peraih_prestasi}
                onChange={(e) =>
                  setFormData({ ...formData, peraih_prestasi: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar (Opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {modalMode === "edit" &&
                selectedItem?.gambar_prestasi &&
                !formImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Gambar saat ini sudah ada. Upload gambar baru untuk
                    mengganti.
                  </p>
                )}
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] transition-colors disabled:opacity-50"
              >
                {submitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
