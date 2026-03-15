import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthShell from '@components/ui/AuthShell';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@school.id' && password === 'admin123') {
      navigate('/admin');
    } else if (email === 'verifier@school.id' && password === 'verifier123') {
      navigate('/verifier');
    } else if (email === 'applicant@school.id' && password === 'applicant123') {
      navigate('/applicant');
    } else {
      alert('Email atau password salah (Gunakan akun demo di bawah)');
    }
  };

  return (
    <AuthShell title="Login Akun" subtitle="Masuk sesuai peran Anda untuk mengakses fitur dashboard.">
      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-5 py-4 rounded-2xl border border-slate-200" 
            placeholder="Masukkan email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full px-5 py-4 rounded-2xl border border-slate-200" 
            placeholder="Masukkan password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full py-4 rounded-2xl bg-blue-dark text-white font-bold text-lg">Login</button>
        <div className="text-sm text-slate-600">Belum punya akun? <Link to="/register" className="text-blue-normal font-semibold">Daftar di sini</Link></div>
        <div className="text-xs text-slate-500 bg-yellow-light rounded-2xl p-4 leading-6">Demo akun:<br />Admin: admin@school.id / admin123<br />Verifier: verifier@school.id / verifier123<br />Pendaftar: applicant@school.id / applicant123</div>
      </form>
    </AuthShell>
  );
}
