import React from 'react';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { ImageCard, SectionTitle } from '@components/ui/ui';
import { mockData } from '@data/mockData';

export default function FacilitiesPage() {
  return (
    <PublicLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Fasilitas Sekolah" title="Lingkungan Belajar yang Siap Mendukung Prestasi" description="Fasilitas yang memadai memperkuat pengalaman belajar, eksplorasi, dan pembentukan budaya sekolah yang produktif." />
        <div className="grid md:grid-cols-2 gap-8">
          {mockData.facilities.map((item) => (
            <ImageCard key={item.id} image={item.image} title={item.title} description={item.description} />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
