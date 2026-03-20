import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminNotificationsPage() {
  return (
    <DashboardLayout role="Admin" title="Mass Notification" subtitle="Fitur ini digunakan untuk mengirim pengumuman hasil seleksi atau pemberitahuan penting ke seluruh pendaftar." sidebarItems={adminSidebar}>
      <div className="grid xl:grid-cols-[1fr_1fr] gap-8">
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Buat Notifikasi Massal</h2>
          <form className="space-y-5">
            <div><label className="block text-sm font-semibold mb-2">Judul</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Contoh: Pengumuman Tahap 2" /></div>
            <div><label className="block text-sm font-semibold mb-2">Target</label><select className="w-full px-5 py-4 rounded-2xl border border-slate-200"><option>Semua Pendaftar</option><option>Yang Lolos</option><option>Yang Masih Diproses</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Pesan</label><textarea rows="5" className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Tuliskan isi notifikasi" /></div>
            <button type="button" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold">Kirim Notifikasi</button>
          </form>
        </div>
        <div className="space-y-4">
          {mockData.notifications.slice().reverse().map((item) => (
            <div key={item.id} className="bg-white rounded-[24px] p-6 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
              <div className="font-bold text-slate-900 text-lg">{item.title}</div>
              <div className="text-sm text-slate-500">{item.date} • {item.target}</div>
              <p className="text-slate-600 leading-7 mt-3">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
