import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminProfilePage() {
  const { profile } = mockData;

  return (
    <DashboardLayout role="Admin" title="School Profile CRUD" subtitle="Seluruh data profil sekolah pada halaman publik dapat diperbarui dari sini." sidebarItems={adminSidebar}>
      <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
        <form className="grid lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Nama Sekolah</label><input defaultValue={profile.schoolName} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Nama Kepala Sekolah</label><input defaultValue={profile.principalName} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">URL Logo</label><input defaultValue={profile.logo} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">URL Foto Kepala Sekolah</label><input defaultValue={profile.principalPhoto} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Visi</label><textarea rows="3" defaultValue={profile.vision} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Misi</label><textarea rows="3" defaultValue={profile.mission} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Sambutan Kepala Sekolah</label><textarea rows="4" defaultValue={profile.principalGreeting} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Alamat</label><input defaultValue={profile.address} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Telepon</label><input defaultValue={profile.phone} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Email</label><input defaultValue={profile.email} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Instagram</label><input defaultValue={profile.socialMedia.instagram} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">YouTube</label><input defaultValue={profile.socialMedia.youtube} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div><label className="block text-sm font-semibold mb-2">Facebook</label><input defaultValue={profile.socialMedia.facebook} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
          <div className="lg:col-span-2"><button type="button" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold">Simpan Perubahan</button></div>
        </form>
      </div>
    </DashboardLayout>
  );
}
