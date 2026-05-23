import React, { useState, useEffect } from "react";
import Modal from "../../../../../shared/components/Modal.jsx";

export default function EditInfoModal({ isOpen, onClose, onSubmit, initialData }) {
  const [infoData, setInfoData] = useState({
    nama_sekolah: "",
    visi: "",
    misi: "",
    akreditasi: "",
    nomor_sk_akreditasi: "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setInfoData({
        nama_sekolah: initialData.nama_sekolah || "",
        visi: initialData.visi || "",
        misi: initialData.misi || "",
        akreditasi: initialData.akreditasi || "",
        nomor_sk_akreditasi: initialData.nomor_sk_akreditasi || "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(infoData, () => {
      onClose();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Ubah Informasi Sekolah">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
          <input
            type="text"
            required
            value={infoData.nama_sekolah}
            onChange={(e) => setInfoData({ ...infoData, nama_sekolah: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
          <textarea
            required
            rows={4}
            value={infoData.visi}
            onChange={(e) => setInfoData({ ...infoData, visi: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
          <textarea
            required
            rows={4}
            value={infoData.misi}
            onChange={(e) => setInfoData({ ...infoData, misi: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-center w-full gap-5">
          <div className="w-1/6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
            <select
              value={infoData.akreditasi}
              onChange={(e) => setInfoData({ ...infoData, akreditasi: e.target.value })}
              className="w-full text-center font-bold border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SK Akreditasi</label>
            <input
              type="text"
              value={infoData.nomor_sk_akreditasi}
              onChange={(e) => setInfoData({ ...infoData, nomor_sk_akreditasi: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
            />
          </div>
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
