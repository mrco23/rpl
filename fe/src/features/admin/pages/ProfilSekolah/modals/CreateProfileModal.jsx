import React, { useState } from "react";
import Modal from "../../../../../shared/components/Modal.jsx";

export default function CreateProfileModal({ isOpen, onClose, onSubmit }) {
  const [createData, setCreateData] = useState({
    nama_sekolah: "",
    visi: "",
    misi: "",
    nama_kepala_sekolah: "",
    kata_sambutan: "",
    akreditasi: "",
    nomor_sk_akreditasi: "",
  });
  const [createImage, setCreateImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(createData, createImage, () => {
      onClose();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Buat Profil Sekolah">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
          <input
            type="text"
            required
            value={createData.nama_sekolah}
            onChange={(e) => setCreateData({ ...createData, nama_sekolah: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
          <textarea
            required
            rows={3}
            value={createData.visi}
            onChange={(e) => setCreateData({ ...createData, visi: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
          <textarea
            required
            rows={3}
            value={createData.misi}
            onChange={(e) => setCreateData({ ...createData, misi: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
          />
        </div>
        <div className="border-t pt-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah</label>
          <input
            type="text"
            required
            value={createData.nama_kepala_sekolah}
            onChange={(e) => setCreateData({ ...createData, nama_kepala_sekolah: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sambutan</label>
          <textarea
            required
            rows={4}
            value={createData.kata_sambutan}
            onChange={(e) => setCreateData({ ...createData, kata_sambutan: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
          />
        </div>
        <div className="flex items-center justify-center w-full gap-5">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
            <select
              required
              value={createData.akreditasi}
              onChange={(e) => setCreateData({ ...createData, akreditasi: e.target.value })}
              className="w-full text-center font-bold border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SK Akreditasi</label>
            <input
              type="text"
              required
              value={createData.nomor_sk_akreditasi}
              onChange={(e) => setCreateData({ ...createData, nomor_sk_akreditasi: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto Kepala Sekolah (Logo)</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setCreateImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
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
            Simpan Profil
          </button>
        </div>
      </form>
    </Modal>
  );
}
