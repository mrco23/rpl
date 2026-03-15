import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { TableWrapper } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminAchievementsPage() {
  return (
    <DashboardLayout role="Admin" title="Content Management Prestasi" subtitle="Tambah, edit, atau hapus konten prestasi pada halaman publik." sidebarItems={adminSidebar}>
      <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-8">
        <TableWrapper headers={['Judul', 'Deskripsi', 'Aksi']}>
          {mockData.achievements.map((item) => (
            <tr key={item.id} className="border-b border-slate-100">
              <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
              <td className="px-6 py-4 text-slate-600">{item.description}</td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="px-4 py-2 rounded-xl bg-blue-light text-blue-normal font-semibold">Edit</button><button className="px-4 py-2 rounded-xl bg-yellow-light text-yellow-dark-active font-semibold">Hapus</button></div></td>
            </tr>
          ))}
        </TableWrapper>
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Tambah Data Baru</h2>
          <form className="grid gap-5">
            <div><label className="block text-sm font-semibold mb-2">Judul</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Deskripsi</label><textarea rows="3" className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">URL Gambar</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><button type="button" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold">Simpan Data</button></div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
