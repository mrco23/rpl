import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { ImageCard, SectionTitle } from "@components/ui/ui";
import { newsApi } from "@services/siteContentService.js";

export default function NewsPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id) {
      newsApi.getPublicDetail(id).then(setItem).catch(() => setItem(null));
    } else {
      newsApi.getPublicList().then(setItems).catch(() => setItems([]));
    }
  }, [id]);

  if (item) {
    return (
      <PublicLayout>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <img src={item.gambar || "https://placehold.co/1200x700?text=Berita"} alt={item.judul} className="w-full h-[360px] object-cover rounded-[28px] mb-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%]" />
          <div className="inline-flex px-4 py-1 rounded-full bg-yellow-light text-yellow-dark font-semibold text-sm mb-4">Berita Sekolah</div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{item.judul}</h1>
          <p className="text-slate-600 leading-8 text-lg mb-8">{item.deskripsi}</p>
          <div className="text-slate-700 leading-8 text-lg whitespace-pre-line">{item.isi}</div>
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
          {items.map((news) => (
            <ImageCard key={news.id_berita} image={news.gambar} title={news.judul} description={news.deskripsi} extra={<div className="mt-5"><Link to={`/berita?id=${news.id_berita}`} className="text-blue-normal font-semibold">Baca selengkapnya</Link></div>} />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
