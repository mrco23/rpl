import React from 'react';
import { Link } from 'react-router';
import PublicLayout from '@components/layout/PublicLayout';

export default function NotFoundPage() {
  return (
    <PublicLayout>
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-7xl font-extrabold text-blue-normal mb-4">404</div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-slate-600 leading-8 mb-8">Rute yang Anda buka tidak tersedia atau membutuhkan hak akses berbeda.</p>
          <Link to="/" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold">Kembali ke Beranda</Link>
        </div>
      </main>
    </PublicLayout>
  );
}
