import React, { useState, useEffect } from "react";
import Modal from "../../../../../shared/components/Modal.jsx";

export default function EditKontakModal({ isOpen, onClose, onSubmit, initialData }) {
  const [kontakData, setKontakData] = useState({
    no_telpon: "",
    email: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    youtube: "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setKontakData({
        no_telpon: initialData.no_telpon || "",
        email: initialData.email || "",
        whatsapp: initialData.whatsapp || "",
        instagram: initialData.instagram || "",
        tiktok: initialData.tiktok || "",
        facebook: initialData.facebook || "",
        youtube: initialData.youtube || "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(kontakData, () => {
      onClose();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Ubah Kontak Web Sekolah">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
            <input
              type="text"
              required
              value={kontakData.no_telpon}
              onChange={(e) => setKontakData({ ...kontakData, no_telpon: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="text"
              value={kontakData.whatsapp}
              onChange={(e) => setKontakData({ ...kontakData, whatsapp: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Contoh: 0812..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Publik</label>
          <input
            type="email"
            required
            value={kontakData.email}
            onChange={(e) => setKontakData({ ...kontakData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (Link)</label>
            <input
              type="text"
              value={kontakData.instagram}
              onChange={(e) => setKontakData({ ...kontakData, instagram: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="www.instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TikTok (Link)</label>
            <input
              type="text"
              value={kontakData.tiktok}
              onChange={(e) => setKontakData({ ...kontakData, tiktok: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="www.tiktok.com/@..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook (Link)</label>
            <input
              type="text"
              value={kontakData.facebook}
              onChange={(e) => setKontakData({ ...kontakData, facebook: e.target.value })}
              placeholder="www.facebook.com/..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube (Link)</label>
            <input
              type="text"
              value={kontakData.youtube}
              onChange={(e) => setKontakData({ ...kontakData, youtube: e.target.value })}
              placeholder="www.youtube.com/channel/..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="pt-4 flex justify-end gap-3">
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
