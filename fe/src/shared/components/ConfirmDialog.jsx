import React from "react";
import Modal from "./Modal.jsx";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Aksi",
  message = "Apakah Anda yakin ingin melakukan aksi ini?",
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  confirmStyle = "bg-red-500 hover:bg-red-600 text-white",
}) {
  return (
    <Modal open={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors ${confirmStyle}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
