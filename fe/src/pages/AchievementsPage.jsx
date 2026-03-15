import React, { useEffect, useState } from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { ImageCard, SectionTitle } from "@components/ui/ui";
import { achievementApi } from "@services/siteContentService.js";

export default function AchievementsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    achievementApi.getPublicList().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <PublicLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Prestasi Lengkap" title="Deretan Pencapaian yang Menginspirasi" description="Prestasi merupakan hasil dari kultur belajar yang disiplin, pendampingan yang kuat, dan semangat juang siswa." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item) => (
            <ImageCard key={item.id_prestasi} image={item.gambar} title={item.judul} description={item.deskripsi} />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
