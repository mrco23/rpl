import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthShell from "@components/ui/AuthShell";
import { loginService } from "@services/authService.js";
import useAuth from "@contexts/useAuth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = await loginService({ username, password });
      login(data);
      navigate(data.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="Login Akun" subtitle="Masuk sesuai peran Anda untuk mengakses fitur dashboard.">
      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
          <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input type="password" className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm">{error}</div>}
        <button disabled={submitting} type="submit" className="w-full py-4 rounded-2xl bg-blue-dark text-white font-bold text-lg disabled:opacity-60">{submitting ? "Memproses..." : "Login"}</button>
        <div className="text-sm text-slate-600">Belum punya akun? <Link to="/register" className="text-blue-normal font-semibold">Daftar di sini</Link></div>
      </form>
    </AuthShell>
  );
}
