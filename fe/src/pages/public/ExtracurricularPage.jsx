import React, { useEffect, useState } from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { ImageCard, SectionTitle } from "@components/ui/ui";
import { extracurricularApi } from "@services/siteContentService.js";

export default function ExtracurricularPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    extracurricularApi.getPublicList().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <PublicLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Ekstrakurikuler" title="Ruang Tumbuh Minat dan Bakat" description="Setiap siswa memiliki potensi unik. Program ekstrakurikuler dirancang untuk memperkuat kompetensi, karakter, dan jejaring sosial." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item) => (
            <ImageCard key={item.id_ekstrakurikuler} image={item.gambar} title={item.nama} description={`${item.deskripsi}<br><br><span class='font-semibold text-blue-normal'>Mentor:</span> ${item.mentor}<br><span class='font-semibold text-blue-normal'>Jadwal:</span> ${item.jadwal}`} />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
