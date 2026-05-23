import React, { useState } from "react";
import hero from "../../../shared/assets/hero.webp";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { changePasswordService } from "../services/authService.js";
import { useNavigate, Link, useSearchParams } from "react-router";
import Modal from "../../../shared/components/Modal.jsx";
import { validateResetToken, resetPassword as resetPasswordApi } from "../../pendaftar/services/pendaftarService.js";
import { useEffect } from "react";

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

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isResetMode = !!token;

  const [accountInfo, setAccountInfo] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(isResetMode);

  const [formData, setFormData] = useState({
    nisn: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isResetMode) {
      handleValidateToken();
    }
  }, [token]);

  const handleValidateToken = async () => {
    try {
      setIsValidatingToken(true);
      const res = await validateResetToken(token);
      setAccountInfo(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Token tidak valid atau telah kadaluarsa");
    } finally {
      setIsValidatingToken(false);
    }
  };

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
    if (!isResetMode && (!formData.nisn || !formData.oldPassword)) {
      setError("NISN dan kata sandi lama wajib diisi");
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Kata sandi baru wajib diisi");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi baru tidak cocok");
      return;
    }

    // Password policy check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError("Kata sandi harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol");
      return;
    }

    setSubmitting(true);

    try {
      if (isResetMode) {
        await resetPasswordApi({
          token,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        });
      } else {
        await changePasswordService({
          nisn: formData.nisn,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error("ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Gagal mengubah kata sandi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {/* LEFT SIDE (Sama dengan LoginPage) */}
      <div className="hidden lg:flex w-1/2 min-h-screen relative overflow-hidden">
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
      <div className="flex w-full md:w-1/2 items-start justify-center px-14 pt-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-2xl p-9"
        >
          <h2 className="text-2xl text-center font-bold mb-2 text-slate-800">
            {isResetMode ? "Atur Ulang Kata Sandi" : "Ubah Kata Sandi"}
          </h2>

          {isResetMode && accountInfo && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
              <CheckCircle2 className="text-blue-600 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-gray-800">Akun ditemukan:</p>
                <p className="text-xs text-gray-600 mt-0.5">Nama: {accountInfo.nama}</p>
                <p className="text-xs text-gray-600">NISN: {accountInfo.nisn}</p>
              </div>
            </div>
          )}

          {isResetMode && isValidatingToken && (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500 animate-pulse">Memvalidasi token...</p>
            </div>
          )}

          {!isValidatingToken && (
            <>
              {/* NISN (Hanya jika bukan mode reset) */}
              {!isResetMode && (
                <div className="mb-5">
                  <label className="text-base font-medium text-slate-700">NISN</label>
                  <input
                    type="text"
                    name="nisn"
                    placeholder="Masukkan NISN"
                    value={formData.nisn}
                    onChange={handleChange}
                    className="w-full border border-blue-400 rounded-lg px-3 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                  />
                </div>
              )}

              {/* KATA SANDI LAMA (Hanya jika bukan mode reset) */}
              {!isResetMode && (
                <div className="mb-5">
                  <label className="text-base font-medium text-slate-700">Kata Sandi Lama</label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword.lama ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Masukkan kata sandi lama"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span
                      onClick={() => toggleShowPassword("lama")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
                    >
                      {showPassword.lama ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>
              )}

              {/* KATA SANDI BARU */}
              <div className="mb-5">
                <label className="text-base font-medium text-slate-700">Kata Sandi Baru</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword.baru ? "text" : "password"}
                    name="newPassword"
                    placeholder="Masukkan kata sandi baru"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span
                    onClick={() => toggleShowPassword("baru")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
                  >
                    {showPassword.baru ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Minimal 8 karakter, harus ada huruf besar, huruf kecil, angka, dan simbol.
                </p>
              </div>

              {/* KONFIRMASI KATA SANDI BARU */}
              <div className="mb-6">
                <label className="text-base font-medium text-slate-700">Konfirmasi Kata Sandi Baru</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword.konfirmasi ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Ulangi kata sandi baru"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                disabled={submitting || (isResetMode && !accountInfo)}
                className="w-full bg-blue-dark text-white py-3 rounded-lg hover:bg-blue-dark-hover cursor-pointer active:bg-blue-dark-active transition disabled:opacity-50"
              >
                {submitting ? "Memproses..." : isResetMode ? "Reset Kata Sandi" : "Simpan Perubahan"}
              </button>
            </>
          )}

          <div className="text-center border-t border-gray-100 pt-6 mt-4">
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
      <Modal open={success} onClose={() => { }} title="Berhasil">
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
