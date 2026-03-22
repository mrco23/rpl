import img from "@assets/berita.jpg";
import { ArrowRight } from "lucide-react";
import PublicLayout from "@components/layout/PublicLayout";

export default function NewsPage() {
  const news = [
    {
      title: "Kegiatan Belajar Mengajar Tatap Muka Dimulai",
      date: "12 Jan 2025",
      desc: "Sekolah kembali membuka kegiatan belajar secara langsung dengan protokol kesehatan.",
      img: img,
    },
    {
      title: "Siswa Raih Juara Olimpiade",
      date: "10 Jan 2025",
      desc: "Prestasi membanggakan diraih oleh siswa dalam kompetisi tingkat nasional.",
      img: img,
    },
    {
      title: "Workshop Digital Learning",
      date: "5 Jan 2025",
      desc: "Guru mengikuti pelatihan untuk meningkatkan kualitas pembelajaran digital.",
      img: img,
    },
    {
      title: "Kegiatan Ekstrakurikuler Aktif Kembali",
      date: "2 Jan 2025",
      desc: "Berbagai kegiatan ekstrakurikuler kembali berjalan dengan antusias siswa.",
      img: img,
    },
    {
      title: "Perayaan Natal Sekolah",
      date: "25 Des 2024",
      desc: "Seluruh warga sekolah merayakan Natal bersama dengan penuh sukacita.",
      img: img,
    },
    {
      title: "Lomba Antar Kelas",
      date: "20 Des 2024",
      desc: "Kegiatan lomba antar kelas berlangsung meriah dan penuh semangat.",
      img: img,
    },
  ];

  return (
    <PublicLayout>
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-10 md:px-10">
          {/* TITLE */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Berita Terbaru
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Ikuti terus aktivitas perkembangan sekolah kami
            </p>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover gap"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 group border-2 p-4 rounded-2xl">
              Lihat Semua
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
