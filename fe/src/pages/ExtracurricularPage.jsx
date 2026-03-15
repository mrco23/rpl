import React from 'react';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { ImageCard, SectionTitle } from '@components/ui/ui';
import { mockData } from '@data/mockData';

export default function ExtracurricularPage() {
  return (
    <PublicLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Ekstrakurikuler" title="Ruang Tumbuh Minat dan Bakat" description="Setiap siswa memiliki potensi unik. Program ekstrakurikuler dirancang untuk memperkuat kompetensi, karakter, dan jejaring sosial." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockData.extracurriculars.map((item) => (
            <ImageCard
              key={item.id}
              image={item.image}
              title={item.name}
              description={`${item.description}<br><br><span class='font-semibold text-blue-normal'>Mentor:</span> ${item.mentor}<br><span class='font-semibold text-blue-normal'>Jadwal:</span> ${item.schedule}`}
            />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
