import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { TableWrapper } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { applicantSidebar } from '@data/navigation.js';

export default function ApplicantStatusPage() {
  const mine = mockData.applicants.filter((item) => item.accountId === 'u-applicant');

  return (
    <DashboardLayout role="Applicant" title="Status Monitoring" subtitle="Pantau setiap tahapan proses agar Anda tahu bagian mana yang masih bermasalah." sidebarItems={applicantSidebar}>
      <TableWrapper headers={['Nama', 'Formulir', 'Upload', 'Verifikasi', 'Catatan']}>
        {mine.map((item) => (
          <tr key={item.id} className="border-b border-slate-100">
            <td className="px-6 py-4 font-semibold text-slate-900">{item.fullName}</td>
            <td className="px-6 py-4 text-slate-600">{item.formCompleted ? 'Selesai' : 'Belum'}</td>
            <td className="px-6 py-4 text-slate-600">{item.uploadCompleted ? 'Selesai' : 'Belum'}</td>
            <td className="px-6 py-4 text-slate-600">{item.verificationStatus}</td>
            <td className="px-6 py-4 text-slate-600">{item.notes}</td>
          </tr>
        ))}
      </TableWrapper>
    </DashboardLayout>
  );
}
