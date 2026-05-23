import React, { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type = "success", onClose, show }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
            type === "success" 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <p className="text-sm font-medium pr-6">{message}</p>
          <button 
            onClick={onClose}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
              type === "success" ? "hover:bg-green-100 text-green-600" : "hover:bg-red-100 text-red-600"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
