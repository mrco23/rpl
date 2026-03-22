import React, { useState } from "react";
import PublicLayout from "@components/layout/PublicLayout";
import hero from "@assets/login.jpg";
import { Eye, EyeOff } from "lucide-react";
import { loginService } from "@services/authService.js";
import useAuth from "@contexts/useAuth.js";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [role, setRole] = useState("pendaftar");
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
      setError("identifier dan password wajib diisi");
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      // ✅ buat payload sesuai role
      let payload = {
        password,
        role,
      };

      if (role === "pendaftar") {
        payload.nisn = identifier;
      } else {
        payload.username = identifier;
      }

      const data = await loginService(payload);

      console.log(data);
      login(data);

      const userRole = data.role.toLowerCase();

      const roleRedirect = {
        admin: "/admin",
        verifikator: "/verifier",
        pendaftar: "/applicant",
      };

      navigate(roleRedirect[userRole] || "/");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout hideFooter>
      <div className="min-h-screen flex">
        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 min-h-screen relative overflow-hidden">
          {/* ✅ BACKGROUND IMAGE (BLUR) */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            style={{ backgroundImage: `url(${hero})` }}
          ></div>

          {/* ✅ OVERLAY GELAP */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* ✅ CONTENT (TIDAK BLUR) */}
          <div className="relative z-10 w-full flex flex-col justify-center p-16 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Satu Platform untuk Seluruh Proses Pendaftaran
            </h1>
            <p className="text-lg">
              Dirancang agar admin, verifikator, dan pendaftar bekerja lebih
              cepat dengan alur yang terstruktur.
            </p>
            <p className="mt-6 text-sm opacity-80">
              SMP Katolik St. Rafael Manado
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-6">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Masuk ke Akun</h2>

            {/* ROLE */}
            <div className="mb-4">
              <label className="text-sm">Masuk sebagai</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setIdentifier(e.target.value);
                }}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="pendaftar">Pendaftar</option>
                <option value="verifikator">Verifikator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-sm">
                {role === "pendaftar" ? "NISN" : "username  "}
              </label>
              <input
                type="text"
                required
                placeholder={
                  role === "pendaftar" ? "Masukkan NISN" : "Masukkan username"
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4 relative">
              <label className="text-sm">Kata Sandi</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
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
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              {submitting ? "Memproses..." : "Masuk"}
            </button>

            {/* REGISTER */}
            <p className="text-sm text-center mt-4">
              Belum punya akun?{" "}
              <span className="text-blue-600 cursor-pointer">
                Daftar disini
              </span>
            </p>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
