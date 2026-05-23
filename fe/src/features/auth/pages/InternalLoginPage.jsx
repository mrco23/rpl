import React, { useState } from "react";
import hero from "../../../shared/assets/hero.webp";
import { Eye, EyeOff } from "lucide-react";
import {
  loginAdminService,
  loginVerifikatorService,
  loginKepalaSekolahService,
} from "../services/authService.js";
import useAuth from "../contexts/useAuth.js";
import { useNavigate, Link } from "react-router";

export default function InternalLoginPage() {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Username dan password wajib diisi");
      setSubmitting(false);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      let payload = {
        username: identifier,
        password,
      };

      let data;
      if (role === "verifikator") {
        data = await loginVerifikatorService(payload);
      } else if (role === "admin") {
        data = await loginAdminService(payload);
      } else if (role === "kepala_sekolah") {
        data = await loginKepalaSekolahService(payload);
      }

      console.log(data);

      const token = data?.token;
      let finalRole = data?.role;

      if (!token) {
        setError("Token tidak ditemukan atau invalid.");
        setSubmitting(false);
        return;
      }

      const decodeJwtRole = (jwtBlob) => {
        try {
          const payloadB64 = jwtBlob.split(".")[1];
          if (!payloadB64) return null;
          const decodedStr = atob(
            payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
          );
          return JSON.parse(decodedStr)?.role || null;
        } catch (e) {
          console.error("Gagal mendecode token:", e);
          return null;
        }
      };

      if (!finalRole && token) {
        finalRole = decodeJwtRole(token);
      }

      if (!finalRole) {
        finalRole = role;
      }

      // Melanjutkan ke auth context dan redirect
      login({ ...data, role: finalRole, token });

      const roleRedirect = {
        admin: "/admin",
        verifikator: "/verifikator",
        kepala_sekolah: "/kepala-sekolah",
      };

      navigate(roleRedirect[finalRole] || "/");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 h-full relative overflow-hidden">
        {/* ✅ BACKGROUND IMAGE (BLUR) */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 brightness-50"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* ✅ OVERLAY GELAP */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* ✅ CONTENT (TIDAK BLUR) */}
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

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-start justify-center px-4 lg:px-14 pt-8">
        <form
          onSubmit={handleLogin}
          className="w-130 max-w-xl rounded-2xl p-9"
        >
          <h2 className="text-3xl text-center font-bold mb-4">Akses Internal</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Akun internal dikelola oleh admin sekolah.</p>

          {/* TAB ROLE */}
          <div className="flex w-full bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                role === "admin"
                  ? "bg-blue-dark text-white shadow"
                  : "bg-blue-light text-blue-dark hover:bg-gray-200"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole("verifikator")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                role === "verifikator"
                  ? "bg-blue-dark text-white shadow"
                  : "bg-blue-light text-blue-dark hover:bg-gray-200"
              }`}
            >
              Verifikator
            </button>
            <button
              type="button"
              onClick={() => setRole("kepala_sekolah")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                role === "kepala_sekolah"
                  ? "bg-blue-dark text-white shadow"
                  : "bg-blue-light text-blue-dark hover:bg-gray-200"
              }`}
            >
              Kepala Sekolah
            </button>
          </div>

          {/* USERNAME */}
          <div className="mb-5">
            <label className="text-sm">Nama Pengguna</label>
            <input
              type="text"
              required
              placeholder="Masukkan Nama Pengguna"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-2 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-base">Kata Sandi</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 bg-blue-dark text-white py-3 rounded-lg hover:bg-blue-dark-hover cursor-pointer active:bg-blue-dark-active transition"
          >
            {submitting ? "Memproses..." : "Masuk Akses Internal"}
          </button>

          <div className="mt-3 text-center border-t border-gray-100 pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-dark transition-all duration-300 font-medium group"
            >
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-dark transition-colors">
                ←
              </span>
              Kembali ke Beranda
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
