import React from 'react';
import { Link, useLocation } from 'react-router';
import { mockData } from '@data/mockData';

export default function DashboardLayout({ role, title, subtitle, sidebarItems, children }) {
  const location = useLocation();
  const user = mockData.users.find((item) => item.role === role.toLowerCase()) || mockData.users[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid lg:grid-cols-[280px_1fr] min-h-screen">
        <aside className="bg-blue-dark-darker text-white p-6 lg:p-8">
          <div className="mb-10">
            <div className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">{role}</div>
            <div className="font-extrabold text-2xl leading-tight">{mockData.profile.schoolName}</div>
          </div>
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                className={`block w-full text-left px-4 py-3 rounded-2xl font-medium transition hover:bg-white/10 ${location.pathname === item.route ? 'bg-yellow-normal text-yellow-dark-darker' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-10 p-4 rounded-2xl bg-white/10">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-blue-200 mb-4">{user.email}</div>
            <button className="w-full py-3 rounded-xl bg-yellow-normal text-yellow-dark-darker font-bold">Logout</button>
          </div>
        </aside>
        <main className="p-4 md:p-8 lg:p-10 overflow-x-hidden">
          <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-blue-normal mb-2">Dashboard {role}</div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h1>
                <p className="text-slate-600 leading-7">{subtitle}</p>
              </div>
              <Link to="/" className="px-6 py-3 rounded-2xl bg-blue-light text-blue-normal font-semibold">Kembali ke Website</Link>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
