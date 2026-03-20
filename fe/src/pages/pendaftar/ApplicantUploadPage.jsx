import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { mockData } from '@data/mockData';
import { applicantSidebar } from '@data/navigation.js';

export default function ApplicantUploadPage() {
  const mine = mockData.applicants.filter((item) => item.accountId === 'u-applicant');

  return (
    <DashboardLayout role="Applicant" title="Document Upload" subtitle="Unggah dokumen pendukung per calon siswa. Sistem ini menyimpan metadata file untuk simulasi proses." sidebarItems={applicantSidebar}>
      <div className="grid xl:grid-cols-[1fr_1fr] gap-8">
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Upload Dokumen</h2>
          <form className="space-y-5">
            <div><label className="block text-sm font-semibold mb-2">Pilih Calon Siswa</label><select className="w-full px-5 py-4 rounded-2xl border border-slate-200">{mine.map((item) => <option key={item.id}>{item.fullName}</option>)}</select></div>
            <div><label className="block text-sm font-semibold mb-2">Nama Dokumen</label><input className="w-full px-5 py-4 rounded-2xl border border-slate-200" placeholder="Contoh: SKL Final.pdf" /></div>
            <div><label className="block text-sm font-semibold mb-2">Jenis File</label><select className="w-full px-5 py-4 rounded-2xl border border-slate-200"><option>PDF</option><option>JPG</option><option>PNG</option></select></div>
            <button type="button" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold">Tambah Dokumen</button>
          </form>
        </div>
        <div className="space-y-5">
          {mine.map((item) => (
            <div key={item.id} className="bg-white rounded-[24px] p-6 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-bold text-slate-900 text-lg">{item.fullName}</div>
                  <div className="text-sm text-slate-500">{item.documents.length} dokumen</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${item.uploadCompleted ? 'bg-blue-light text-blue-normal' : 'bg-yellow-light text-yellow-dark-active'}`}>{item.uploadCompleted ? 'Lengkap' : 'Belum lengkap'}</div>
              </div>
              <div className="space-y-3">
                {item.documents.map((doc) => (
                  <div key={doc.name} className="p-4 rounded-2xl bg-slate-50 text-sm"><span className="font-semibold">{doc.name}</span><br /><span className="text-slate-500">{doc.type} • {doc.uploadedAt}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
