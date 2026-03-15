import React from 'react';
import { Link, useLocation } from 'react-router';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { ImageCard, SectionTitle } from '@components/ui/ui';
import { mockData } from '@data/mockData';

export default function NewsPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const item = mockData.news.find((news) => news.id === id);

  if (item) {
    return (
      <PublicLayout>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <img src={item.image} alt={item.title} className="w-full h-[360px] object-cover rounded-[28px] mb-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%]" />
          <div className="inline-flex px-4 py-1 rounded-full bg-yellow-light text-yellow-dark font-semibold text-sm mb-4">Berita Sekolah</div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{item.title}</h1>
          <p className="text-slate-600 leading-8 text-lg mb-8">{item.description}</p>
          <div className="text-slate-700 leading-8 text-lg">{item.content}</div>
          <div className="mt-10"><Link to="/berita" className="px-6 py-3 rounded-2xl bg-blue-dark text-white font-semibold">Kembali ke Berita</Link></div>
        </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Semua Berita" title="Pusat Informasi dan Aktivitas Sekolah" description="Seluruh berita penting, agenda, pembaruan kegiatan, dan informasi PPDB tersedia dalam satu halaman terpusat." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockData.news.map((news) => (
            <ImageCard
              key={news.id}
              image={news.image}
              title={news.title}
              description={news.description}
              extra={<div className="mt-5"><Link to={`/berita?id=${news.id}`} className="text-blue-normal font-semibold">Baca selengkapnya</Link></div>}
            />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
