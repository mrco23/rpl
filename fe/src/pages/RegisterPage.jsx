import React from 'react';
import { Link } from 'react-router';
import AuthShell from '@components/ui/AuthShell';

export default function RegisterPage() {
  return (
    <AuthShell title="Registrasi Akun PPDB" subtitle="Satu akun dapat digunakan untuk mendaftarkan beberapa calon siswa dalam satu keluarga.">
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Orang Tua / Wali</label>
          <input className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Masukkan nama lengkap" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="nama@email.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input type="password" className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Minimal 6 karakter" />
        </div>
        <button type="button" className="w-full py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold text-lg">Buat Akun</button>
        <div className="text-sm text-slate-600">Sudah punya akun? <Link to="/login" className="text-blue-normal font-semibold">Login</Link></div>
      </form>
    </AuthShell>
  );
}
