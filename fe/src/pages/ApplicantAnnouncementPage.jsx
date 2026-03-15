import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout';
import { mockData } from '../data/mockData';
import { applicantSidebar } from '../data/navigation';

export default function ApplicantAnnouncementPage() {
  const mine = mockData.applicants.filter((item) => item.accountId === 'u-applicant');

  return (
    <DashboardLayout role="Applicant" title="Selection Result Announcement" subtitle="Pengumuman hasil seleksi akan muncul per calon siswa dan didukung pemberitahuan massal dari admin." sidebarItems={applicantSidebar}>
      <div className="grid xl:grid-cols-[1fr_.95fr] gap-8">
        <div className="space-y-5">
          {mine.map((item) => (
            <div key={item.id} className="bg-white rounded-[24px] p-6 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-900 text-xl">{item.fullName}</div>
                  <div className="text-sm text-slate-500">{item.track} • {item.schoolOrigin}</div>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold ${item.selectionStatus === 'Lolos' ? 'bg-blue-light text-blue-normal' : item.selectionStatus === 'Tidak Lolos' ? 'bg-red-50 text-red-600' : 'bg-yellow-light text-yellow-dark-active'}`}>{item.selectionStatus}</div>
              </div>
              <p className="text-slate-600 leading-7 mt-4">{item.selectionStatus === 'Lolos' ? 'Selamat, calon siswa dinyatakan lolos seleksi. Silakan ikuti tahapan daftar ulang sesuai jadwal.' : item.selectionStatus === 'Tidak Lolos' ? 'Calon siswa belum berhasil pada tahap seleksi ini. Silakan cek jalur lain jika tersedia.' : 'Hasil seleksi masih dalam proses. Pantau pengumuman secara berkala.'}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Pengumuman Admin</h2>
          <div className="space-y-4">
            {mockData.notifications.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div className="text-sm text-slate-500 mb-2">{item.date}</div>
                <div className="text-slate-600 leading-7">{item.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
