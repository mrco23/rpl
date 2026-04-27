import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import Modal from "../../components/ui/Modal.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import {
  getAllBerita,
  createBerita,
  updateBeritaData,
  updateBeritaImage,
  deleteBerita,
} from "../../services/adminNewsService.js";

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'detail'
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({ judul_berita: "", deskripsi: "" });
  const [formImage, setFormImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await getAllBerita();
      setNewsList(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat berita");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ judul_berita: "", deskripsi: "" });
    setFormImage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      judul_berita: item.judul_berita || "",
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
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;
    try {
      await deleteBerita(id);
      fetchNews();
    } catch (err) {
      alert("Gagal menghapus berita");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === "add") {
        const payload = new FormData();
        payload.append("judul_berita", formData.judul_berita);
        payload.append("deskripsi", formData.deskripsi);
        if (formImage) payload.append("gambar", formImage);

        await createBerita(payload);
      } else if (modalMode === "edit") {
        // Update Data Text (berdasarkan response model)
        await updateBeritaData(selectedItem.id_berita, {
          judul_berita: formData.judul_berita,
          deskripsi: formData.deskripsi,
        });

        // Update Image independently if changed
        if (formImage) {
          const payloadImg = new FormData();
          payloadImg.append("gambar", formImage);
          await updateBeritaImage(selectedItem.id_berita, payloadImg);
        }
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (err) {
      console.error(err);
      alert(`Gagal ${modalMode === "add" ? "menambah" : "mengubah"} berita`);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredNews = newsList.filter((item) =>
    item.judul_berita?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Berita"
        subText="Kelola seluruh berita sekolah di sini."
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
              placeholder="Cari Berita ..."
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

        {/* Tabel Berita */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-1/4">Berita</th>
                <th className="p-4 w-1/3">Deskripsi</th>
                <th className="p-4 w-1/4">Tanggal Dibuat</th>
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
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Tidak ada berita ditemukan
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr
                    key={item.id_berita}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-800 font-semibold truncate max-w-[200px]">
                      {item.judul_berita}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-semibold text-gray-600 truncate max-w-[300px]">
                      {item.deskripsi}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-semibold">
                      {item.tanggal_dibuat
                        ? new Date(item.tanggal_dibuat).toLocaleDateString(
                            "id-ID",
                          )
                        : "-"}
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
                          title="Edit Berita"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300"
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDelete(item.id_berita)}
                          title="Hapus Berita"
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
            ? "Tambah Berita Baru"
            : modalMode === "edit"
              ? "Edit Berita"
              : "Detail Berita"
        }
      >
        {modalMode === "detail" ? (
          <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto">
            {selectedItem?.gambar_berita && (
              <img
                src={selectedItem.gambar_berita}
                alt="Berita"
                className="w-full h-auto rounded-lg max-h-60 object-cover"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {selectedItem?.judul_berita}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedItem?.tanggal_dibuat
                  ? new Date(selectedItem.tanggal_dibuat).toLocaleDateString(
                      "id-ID",
                    )
                  : "-"}
              </p>
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
                Judul Berita
              </label>
              <input
                type="text"
                required
                value={formData.judul_berita}
                onChange={(e) =>
                  setFormData({ ...formData, judul_berita: e.target.value })
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
                rows={5}
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

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#253b80] transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {formImage ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(formImage)}
                      alt="preview"
                      className="mx-auto h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-600">{formImage.name}</p>
                    <p className="text-xs text-gray-400">
                      Klik untuk ganti gambar
                    </p>
                  </div>
                ) : modalMode === "edit" && selectedItem?.gambar_berita ? (
                  <div className="space-y-2">
                    <img
                      src={selectedItem.gambar_berita}
                      alt="existing"
                      className="mx-auto h-32 object-cover rounded-lg"
                    />
                    <p className="text-xs text-gray-500">
                      Gambar saat ini. Klik untuk mengganti.
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    <p className="font-medium">Klik atau drag gambar ke sini</p>
                    <p className="text-xs">PNG, JPG maksimal 2MB</p>
                  </div>
                )}
              </div>
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
