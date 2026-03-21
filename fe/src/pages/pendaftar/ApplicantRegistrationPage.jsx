import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout';
import { applicantSidebar } from '@data/navigation';

export default function ApplicantRegistrationPage() {
  return (
    <DashboardLayout role="Applicant" title="Registration Form" subtitle="Lengkapi biodata calon siswa dengan benar. Kesalahan data akan memperlambat verifikasi." sidebarItems={applicantSidebar}>
      <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
        <form className="grid lg:grid-cols-2 gap-5">
          <div><label className="block text-sm font-semibold mb-2">Nama Lengkap</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">NISN</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Jenis Kelamin</label><select className="w-full px-5 py-4 rounded-2xl border border-slate-200"><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div><label className="block text-sm font-semibold mb-2">Jalur Pendaftaran</label><select className="w-full px-5 py-4 rounded-2xl border border-slate-200"><option>Zonasi</option><option>Prestasi</option><option>Afirmasi</option><option>Perpindahan Tugas</option></select></div>
          <div><label className="block text-sm font-semibold mb-2">Tempat Lahir</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Tanggal Lahir</label><input type="date" className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Alamat</label><textarea rows="3" className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Asal Sekolah</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><button type="button" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold">Simpan Formulir</button></div>
        </form>
      </div>
    </DashboardLayout>
  );
}
