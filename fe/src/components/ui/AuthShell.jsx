import React from 'react';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { mockData } from '@data/mockData';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <PublicLayout hideFooter hideNav>
      <main className="min-h-screen grid lg:grid-cols-2">
        <section className="hidden lg:flex relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-dark-darker/92 to-blue-normal/75" />
          <div className="relative text-white p-14 flex flex-col justify-between">
            <div>
              <div className="inline-flex px-4 py-2 rounded-full bg-white/15 border border-white/20 mb-6">Portal PPDB Digital</div>
              <h2 className="text-5xl font-extrabold leading-tight mb-5">Satu Platform untuk Seluruh Proses Pendaftaran</h2>
              <p className="text-blue-light text-lg leading-8 max-w-xl">Dirancang agar admin, verifikator, dan orang tua siswa bekerja lebih cepat dengan alur yang jauh lebih tertata.</p>
            </div>
            <div className="text-blue-light">{mockData.profile.schoolName}</div>
          </div>
        </section>
        <section className="flex items-center justify-center px-4 py-12 bg-white">
          <div className="w-full max-w-xl bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h1>
              <p className="text-slate-600 leading-7">{subtitle}</p>
            </div>
            {children}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
