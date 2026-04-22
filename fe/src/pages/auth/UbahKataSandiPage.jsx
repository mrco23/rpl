import React, { useState } from "react";
import hero from "@assets/hero.png";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { changePasswordService } from "@services/authService.js";
import { useNavigate, Link } from "react-router";
import Modal from "../../components/ui/Modal.jsx";

export default function UbahKataSandiPage() {
  const [showPassword, setShowPassword] = useState({
    lama: false,
    baru: false,
    konfirmasi: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    nisn: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend Validation
    if (!formData.nisn || !formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi baru tidak cocok");
      return;
    }

    setSubmitting(true);

    try {
      await changePasswordService({
        nisn: formData.nisn,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setSuccess(true);
    } catch (err) {
      console.error("ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Gagal mengubah kata sandi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      {/* LEFT SIDE (Sama dengan LoginPage) */}
      <div className="hidden md:flex w-1/2 min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 brightness-50"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 w-full flex flex-col justify-center p-16 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Satu Platform untuk Seluruh Proses Pendaftaran
          </h1>
          <p className="text-lg">
            Dirancang agar admin, verifikator, dan pendaftar bekerja lebih cepat
            dengan alur yang terstruktur.
          </p>
          <p className="mt-6 text-sm opacity-80">
            SMP Katolik St. Rafael Manado
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form Ubah Kata Sandi) */}
      <div className="flex w-full md:w-1/2 items-start justify-center px-14 pt-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-9"
        >
          <h2 className="text-4xl text-center font-bold mb-8 text-slate-800">Ubah Kata Sandi</h2>

          {/* NISN */}
          <div className="mb-5">
            <label className="text-lg font-medium text-slate-700">NISN</label>
            <input
              type="text"
              name="nisn"
              placeholder="Masukkan NISN"
              value={formData.nisn}
              onChange={handleChange}
              className="w-full border border-blue-400 rounded-lg px-3 py-3 mt-1
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          {/* KATA SANDI LAMA */}
          <div className="mb-5">
            <label className="text-lg font-medium text-slate-700">Kata Sandi Lama</label>
            <div className="relative mt-1">
              <input
                type={showPassword.lama ? "text" : "password"}
                name="oldPassword"
                placeholder="Masukkan kata sandi lama"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-3
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => toggleShowPassword("lama")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword.lama ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* KATA SANDI BARU */}
          <div className="mb-5">
            <label className="text-lg font-medium text-slate-700">Kata Sandi Baru</label>
            <div className="relative mt-1">
              <input
                type={showPassword.baru ? "text" : "password"}
                name="newPassword"
                placeholder="Masukkan kata sandi baru"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-3
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => toggleShowPassword("baru")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword.baru ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* KONFIRMASI KATA SANDI BARU */}
          <div className="mb-6">
            <label className="text-lg font-medium text-slate-700">Konfirmasi Kata Sandi Baru</label>
            <div className="relative mt-1">
              <input
                type={showPassword.konfirmasi ? "text" : "password"}
                name="confirmPassword"
                placeholder="Ulangi kata sandi baru"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-3
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => toggleShowPassword("konfirmasi")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword.konfirmasi ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#253b80] text-white py-3.5 rounded-xl hover:bg-blue-800 cursor-pointer active:scale-[0.98] transition-all font-semibold text-lg shadow-lg shadow-blue-900/20"
          >
            {submitting ? "Memproses..." : "Simpan Perubahan"}
          </button>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#253b80] transition-all duration-300 font-medium group"
            >
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-[#253b80] transition-colors">
                ←
              </span>
              Kembali ke Login
            </Link>
          </div>
        </form>
      </div>

      {/* MODAL SUKSES */}
      <Modal open={success} onClose={() => {}} title="Berhasil">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Kata Sandi Diperbarui</h3>
          <p className="text-slate-600 mb-8 max-w-sm">
            Kata sandi Anda telah berhasil diubah. Silakan gunakan kata sandi baru Anda untuk masuk ke sistem.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#253b80] text-white py-3 rounded-xl hover:bg-blue-800 transition-colors cursor-pointer font-bold"
          >
            OK, Ke Halaman Login
          </button>
        </div>
      </Modal>
    </div>
  );
}
