import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2, UserCircle2 } from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";
import Modal from "../../components/ui/Modal.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import {
  getAllVerifikator,
  createVerifikator,
  updateVerifikator,
  deleteVerifikator,
} from "../../services/adminVerifikatorService.js";

export default function AdminToVerifikator() {
  const [verifiers, setVerifiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'detail'
  const [selectedVerifier, setSelectedVerifier] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchVerifiers();
  }, []);

  const fetchVerifiers = async () => {
    try {
      setLoading(true);
      const res = await getAllVerifikator();
      setVerifiers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data verifikator");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ nama: "", username: "", password: "" });
    setSelectedVerifier(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (verifier) => {
    setModalMode("edit");
    setSelectedVerifier(verifier);
    setFormData({
      nama: verifier.nama,
      username: verifier.username,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenDetail = (verifier) => {
    setModalMode("detail");
    setSelectedVerifier(verifier);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus akun verifikator ini?")) return;
    try {
      await deleteVerifikator(id);
      fetchVerifiers();
    } catch (err) {
      alert("Gagal menghapus verifikator");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === "add") {
        await createVerifikator(formData);
      } else if (modalMode === "edit") {
        const payload = { nama: formData.nama, username: formData.username };
        if (formData.password) payload.password = formData.password;
        await updateVerifikator(selectedVerifier.id_verifikator, payload);
      }
      setIsModalOpen(false);
      fetchVerifiers();
      setSuccessMessage(modalMode === "add" ? "Akun verifikator berhasil dibuat!" : "Akun verifikator berhasil diperbarui!");
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert(
        err.message ||
          `Gagal ${modalMode === "add" ? "menambah" : "mengubah"} verifikator`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVerifiers = verifiers.filter(
    (v) =>
      v.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.username?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Manajemen Akun Verifikator"
        subText="Kelola akun petugas yang bertugas memverifikasi dokumen pendaftar."
      />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Cari nama / username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded text-sm text-gray-800 pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#253b80] bg-white transition-shadow"
              />
            </div>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 bg-white border border-[#253b80] text-[#253b80] hover:bg-blue-50 px-4 py-2 rounded text-sm font-semibold transition-colors cursor-pointer"
            >
              <Plus size={16} strokeWidth={2.5} />
              Buat
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-semibold text-gray-700">
                  <th className="p-4 w-3/4">Akun Verifikator</th>
                  <th className="p-4 w-1/4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
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
                ) : filteredVerifiers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-gray-500">
                      Tidak ada verifikator ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredVerifiers.map((item) => (
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
                              {item.username}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.nama}
                            </span>
                          </div>
                        </div>
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
                            title="Edit Akun"
                            className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id_verifikator)}
                            title="Hapus Akun"
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
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "Buat Akun Verifikator"
            : modalMode === "edit"
              ? "Edit Akun Verifikator"
              : "Detail Akun Verifikator"
        }
      >
        {modalMode === "detail" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <UserCircle2
                size={64}
                className="text-gray-300"
                strokeWidth={1}
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {selectedVerifier?.nama}
                </h3>
                <p className="text-gray-500">@{selectedVerifier?.username}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  ID Petugas
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  {selectedVerifier?.id_verifikator}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Role Akses
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Petugas Verifikator
                </p>
              </div>
            </div>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap Petugas
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                placeholder="Contoh: Marcois Makalew"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username Login
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="contoh_user123"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {modalMode === "edit"
                  ? "Password Baru (Kosongkan jika tidak diubah)"
                  : "Password Akun"}
              </label>
              <input
                type="password"
                required={modalMode === "add"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="********"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
              />
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
        )}
      </Modal>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-6">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 bg-[#253b80] text-white rounded-lg font-semibold hover:bg-[#1a2c66] transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
