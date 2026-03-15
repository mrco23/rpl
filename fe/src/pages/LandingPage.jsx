import React from 'react';
import { Link } from 'react-router';
import PublicLayout from '@components/layout/PublicLayout.jsx';
import { ImageCard, SectionTitle } from '@components/ui/ui';
import { mockData } from '@data/mockData';

export default function LandingPage() {
  const { profile, achievements, news } = mockData;

  return (
    <PublicLayout>
      <main>
        <section className="relative min-h-[88vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-dark-darker/90 via-blue-dark/78 to-blue-normal/48" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center min-h-[88vh]">
            <div className="max-w-3xl text-white">
              <div className="inline-flex px-4 py-2 rounded-full bg-white/15 border border-white/20 mb-6">Pendaftaran Peserta Didik Baru 2026</div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Masa Depan Hebat Dimulai dari Sekolah yang Tepat</h1>
              <p className="text-blue-light text-lg leading-8 mb-8 max-w-2xl">Platform PPDB modern untuk membantu orang tua, calon siswa, admin, dan verifikator mengelola proses pendaftaran secara cepat, transparan, dan terstruktur.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold text-lg shadow-[0_20px_45px_var(--color-blue-normal)_/12%]">Daftar PPDB Sekarang</Link>
                <Link to="/panduan" className="px-7 py-4 rounded-2xl border border-white/30 bg-white/10 font-semibold">Lihat Panduan</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle eyebrow="Sambutan Kepala Sekolah" title="Komitmen Kami untuk Pendidikan Berkualitas" description="Kami menghadirkan lingkungan belajar yang aman, inspiratif, dan unggul untuk membangun generasi yang siap menghadapi tantangan masa depan." />
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-[28px] overflow-hidden shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
            <div className="h-full min-h-[360px]"><img src={profile.principalPhoto} alt="kepala sekolah" className="w-full h-full object-cover" /></div>
            <div className="p-8 md:p-12">
              <div className="text-blue-normal font-bold text-xl mb-2">{profile.principalName}</div>
              <div className="text-slate-500 mb-5">Kepala Sekolah</div>
              <p className="text-slate-600 leading-8">{profile.principalGreeting}</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-light py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Prestasi" title="Capaian yang Membanggakan" description="Sekolah kami terus menorehkan prestasi akademik dan non akademik di tingkat daerah hingga nasional." />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {achievements.slice(0, 3).map((item) => (
                <ImageCard key={item.id} image={item.image} title={item.title} description={item.description} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/prestasi" className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-semibold">Selengkapnya</Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Berita Sekolah" title="Informasi Terbaru dan Agenda Penting" description="Ikuti perkembangan sekolah, pembaruan PPDB, dan berbagai aktivitas inspiratif dari lingkungan sekolah." />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item) => (
                <ImageCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  extra={<div className="mt-5"><Link to={`/berita?id=${item.id}`} className="text-blue-normal font-semibold">Baca selengkapnya</Link></div>}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/berita" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold">Selengkapnya</Link>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
