import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { TableWrapper } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminAccountsPage() {
  const users = mockData.users.filter((user) => user.role !== 'admin');

  return (
    <DashboardLayout role="Admin" title="Account Management" subtitle="Buat akun verifier baru serta reset atau nonaktifkan akun setelah periode PPDB berakhir." sidebarItems={adminSidebar}>
      <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-8">
        <TableWrapper headers={['Nama', 'Email', 'Role', 'Status', 'Aksi']}>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-slate-100">
              <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
              <td className="px-6 py-4 text-slate-600">{user.email}</td>
              <td className="px-6 py-4 text-slate-600">{user.role}</td>
              <td className="px-6 py-4 text-slate-600">{user.active ? 'Aktif' : 'Nonaktif'}</td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="px-4 py-2 rounded-xl bg-blue-light text-blue-normal font-semibold">Reset Password</button><button className="px-4 py-2 rounded-xl bg-yellow-light text-yellow-dark-active font-semibold">Deactivate</button></div></td>
            </tr>
          ))}
        </TableWrapper>
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Buat Akun Verifier</h2>
          <form className="space-y-5">
            <div><label className="block text-sm font-semibold mb-2">Nama</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Email</label><input type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Password</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <button type="button" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold">Tambah Verifier</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
