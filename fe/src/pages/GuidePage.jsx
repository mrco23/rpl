import React from 'react';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { SectionTitle } from '@components/ui/ui';
import { mockData } from '@data/mockData';

export default function GuidePage() {
  return (
    <PublicLayout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Panduan Website" title="Cara Menggunakan Sistem PPDB" description="Alur sistem dibuat sederhana, tetapi pengguna tetap perlu memahami urutan proses agar tidak salah langkah." />
        <div className="space-y-5">
          {mockData.guideSteps.map((step, index) => (
            <div key={step} className="flex gap-5 items-start p-6 rounded-[24px] bg-white border border-slate-100 shadow-[0_20px_45px_var(--color-blue-normal)_/12%]">
              <div className="w-12 h-12 rounded-2xl bg-blue-dark text-white flex items-center justify-center font-bold text-lg shrink-0">{index + 1}</div>
              <div>
                <div className="font-bold text-slate-900 text-lg mb-1">Langkah {index + 1}</div>
                <p className="text-slate-600 leading-8">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
