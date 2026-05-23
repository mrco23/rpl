import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Power, PowerOff, UserCircle2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import Modal from "../../../shared/components/Modal.jsx";
import Skeleton from "../../../shared/components/Skeleton.jsx";
import Toast from "../../../shared/components/Toast.jsx";
import {
  getKepalaSekolahList,
  createKepalaSekolah,
  updateKepalaSekolah,
  updateStatusKepalaSekolah,
} from "../services/adminKepalaSekolahService.js";

export default function KepalaSekolahPage() {
  const [kepsek, setKepsek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit'
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchKepsek();
  }, []);

  const fetchKepsek = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const res = await getKepalaSekolahList();
      setKepsek(res.data || []);
    } catch (err) {
      console.error(err);
      setToastConfig({ show: true, message: "Gagal memuat data Kepala Sekolah", type: "error" });
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ nama: "", username: "", password: "" });
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({
      nama: user.nama,
      username: user.username,
      password: "", // Jangan tampilkan password lama
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (user) => {
    const newStatus = !user.status_aktif;
    if (!window.confirm(`Yakin ingin ${newStatus ? 'mengaktifkan' : 'menonaktifkan'} akun Kepala Sekolah ini?`)) return;
    try {
      await updateStatusKepalaSekolah(user.id_kepala_sekolah, newStatus);
      setToastConfig({ show: true, message: `Akun berhasil di${newStatus ? 'aktifkan' : 'nonaktifkan'}!`, type: "success" });
      fetchKepsek(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal mengubah status Kepala Sekolah", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === "add") {
        await createKepalaSekolah(formData);
      } else if (modalMode === "edit") {
        const payload = { nama: formData.nama, username: formData.username };
        if (formData.password) payload.password = formData.password;
        await updateKepalaSekolah(selectedUser.id_kepala_sekolah, payload);
      }
      setIsModalOpen(false);
      setToastConfig({
        show: true,
        message: modalMode === "add" ? "Akun Kepala Sekolah berhasil dibuat!" : "Akun Kepala Sekolah berhasil diperbarui!",
        type: "success"
      });
      fetchKepsek(false);
    } catch (err) {
      console.error(err);
      setToastConfig({
        show: true,
        message: err.message || `Gagal ${modalMode === "add" ? "menambah" : "mengubah"} akun`,
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredKepsek = kepsek.filter(
    (k) =>
      k.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.username?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AdminHeader
        text="Manajemen Kepala Sekolah"
        subText="Kelola akun akses laporan dan monitoring bagi Kepala Sekolah."
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
              Buat Akun
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-semibold text-gray-700">
                  <th className="p-4 w-1/2">Akun Kepala Sekolah</th>
                  <th className="p-4 w-1/4">Status</th>
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
                      <td className="p-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </td>
                      <td className="p-4 flex justify-center gap-2 mt-4">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </td>
                    </tr>
                  ))
                ) : filteredKepsek.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      Tidak ada akun Kepala Sekolah ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredKepsek.map((item) => (
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
                              {item.username}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.nama}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.status_aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {item.status_aktif ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Akun"
                            className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300 cursor-pointer"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            onClick={() => handleToggleStatus(item)}
                            title={item.status_aktif ? "Nonaktifkan Akun" : "Aktifkan Akun"}
                            className={`p-1.5 border rounded transition-colors cursor-pointer ${
                              item.status_aktif 
                                ? "border-orange-200 text-orange-500 hover:bg-orange-50 hover:text-orange-700" 
                                : "border-green-200 text-green-500 hover:bg-green-50 hover:text-green-700"
                            }`}
                          >
                            {item.status_aktif ? <PowerOff size={16} /> : <Power size={16} />}
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
            ? "Buat Akun Kepala Sekolah"
            : "Edit Akun Kepala Sekolah"
        }
      >
        {modalMode ? (<form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
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
              placeholder="contoh_kepsek"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#253b80] focus:border-[#253b80]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {modalMode === "edit"
                ? "Password Baru (Kosongkan jika tidak diubah)"
                : "Password"}
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
        </form>) : (<></>)}
      </Modal>

      <Toast 
        show={toastConfig.show} 
        message={toastConfig.message} 
        type={toastConfig.type} 
        onClose={() => setToastConfig({ ...toastConfig, show: false })} 
      />
    </>
  );
}
