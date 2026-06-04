import React, { useState, useEffect } from "react";
import Modal from "../../../../../shared/components/Modal.jsx";

export default function EditKepsekModal({ isOpen, onClose, onSubmit, initialData }) {
  const [kepsekData, setKepsekData] = useState({
    nama_kepala_sekolah: "",
    kata_sambutan: "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setKepsekData({
        nama_kepala_sekolah: initialData.nama_kepala_sekolah || "",
        kata_sambutan: initialData.kata_sambutan || "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(kepsekData, () => {
      onClose();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Ubah Profil Kepala Sekolah">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala</label>
          <input
            type="text"
            required
            value={kepsekData.nama_kepala_sekolah}
            onChange={(e) => setKepsekData({ ...kepsekData, nama_kepala_sekolah: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sambutan</label>
          <textarea
            required
            rows={5}
            value={kepsekData.kata_sambutan}
            onChange={(e) => setKepsekData({ ...kepsekData, kata_sambutan: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="pt-4 flex justify-end gap-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
}
