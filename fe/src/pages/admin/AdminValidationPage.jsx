import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { TableWrapper } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminValidationPage() {
  return (
    <DashboardLayout role="Admin" title="Validasi Calon Siswa" subtitle="Admin dapat memperbarui status validasi secara langsung dari tabel operasional." sidebarItems={adminSidebar}>
      <TableWrapper headers={['Nama', 'Jalur', 'Asal Sekolah', 'Verifikasi', 'Seleksi', 'Update Status']}>
        {mockData.applicants.map((item) => (
          <tr key={item.id} className="border-b border-slate-100">
            <td className="px-6 py-4 font-semibold text-slate-900">{item.fullName}</td>
            <td className="px-6 py-4 text-slate-600">{item.track}</td>
            <td className="px-6 py-4 text-slate-600">{item.schoolOrigin}</td>
            <td className="px-6 py-4 text-slate-600">{item.verificationStatus}</td>
            <td className="px-6 py-4 text-slate-600">{item.selectionStatus}</td>
            <td className="px-6 py-4">
              <select defaultValue={item.verificationStatus} className="px-4 py-2 rounded-xl border border-slate-200">
                <option>Menunggu Verifikasi</option>
                <option>Terverifikasi</option>
                <option>Perlu Revisi</option>
              </select>
            </td>
          </tr>
        ))}
      </TableWrapper>
    </DashboardLayout>
  );
}
