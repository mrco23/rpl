import React from 'react';
import { Link, useLocation } from 'react-router';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { TableWrapper } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { verifierSidebar } from '@data/navigation.js';

export default function VerifierDocumentsPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const candidate = mockData.applicants.find((item) => item.id === id);

  if (candidate) {
    return (
      <DashboardLayout role="Verifier" title="Detail Dokumen Siswa" subtitle="Tinjau metadata dokumen yang diunggah dan perbarui status verifikasi dengan akurat." sidebarItems={verifierSidebar}>
        <div className="grid xl:grid-cols-[1fr_.9fr] gap-8">
          <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{candidate.fullName}</h2>
            <div className="grid md:grid-cols-2 gap-5 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50"><span className="font-semibold">NISN:</span> {candidate.nisn}</div>
              <div className="p-4 rounded-2xl bg-slate-50"><span className="font-semibold">Asal Sekolah:</span> {candidate.schoolOrigin}</div>
              <div className="p-4 rounded-2xl bg-slate-50"><span className="font-semibold">Jalur:</span> {candidate.track}</div>
              <div className="p-4 rounded-2xl bg-slate-50"><span className="font-semibold">Status:</span> {candidate.verificationStatus}</div>
            </div>
            <div className="mt-8 space-y-4">
              {candidate.documents.map((doc) => (
                <div key={doc.name} className="p-5 rounded-2xl border border-slate-100 bg-blue-light">
                  <div className="font-semibold text-slate-900">{doc.name}</div>
                  <div className="text-sm text-slate-600">Tipe: {doc.type} • Diunggah: {doc.uploadedAt}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Update Hasil Verifikasi</h2>
            <form className="space-y-5">
              <div><label className="block text-sm font-semibold mb-2">Status</label><select defaultValue={candidate.verificationStatus} className="w-full px-5 py-4 rounded-2xl border border-slate-200"><option>Menunggu Verifikasi</option><option>Terverifikasi</option><option>Perlu Revisi</option></select></div>
              <div><label className="block text-sm font-semibold mb-2">Catatan</label><textarea rows="5" defaultValue={candidate.notes} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
              <button type="button" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold">Simpan Verifikasi</button>
            </form>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Verifier" title="Document Verification" subtitle="Lihat daftar calon siswa yang sudah mengunggah berkas dan buka detail untuk proses verifikasi." sidebarItems={verifierSidebar}>
      <TableWrapper headers={['Nama', 'Dokumen', 'Status', 'Catatan', 'Aksi']}>
        {mockData.applicants.map((item) => (
          <tr key={item.id} className="border-b border-slate-100">
            <td className="px-6 py-4 font-semibold text-slate-900">{item.fullName}</td>
            <td className="px-6 py-4 text-slate-600">{item.documents.length} file</td>
            <td className="px-6 py-4 text-slate-600">{item.verificationStatus}</td>
            <td className="px-6 py-4 text-slate-600">{item.notes}</td>
            <td className="px-6 py-4"><Link to={`/verifier/documents?id=${item.id}`} className="px-4 py-2 rounded-xl bg-blue-dark text-white font-semibold">Lihat Detail</Link></td>
          </tr>
        ))}
      </TableWrapper>
    </DashboardLayout>
  );
}
