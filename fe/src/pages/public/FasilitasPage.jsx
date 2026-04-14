import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { Link } from "react-router";
import fasilitasImg from "@assets/fasilitas.jpg";

function FasilitasPage() {
  const fasilitas = [
    {
      title: "LAPANGAN SEKOLAH",
      desc: `Sekolah ini memiliki area olahraga yang sangat memadai untuk mendukung aktivitas fisik siswa. 
      Lapangan menjadi pusat kegiatan siswa dan sering digunakan untuk turnamen antar pelajar `,
      image: fasilitasImg,
    },
    {
      title: "PERPUSTAKAAN",
      desc: `Perpustakaan SM. Rafet didesain bukan hanya sebagai gudang buku, melainkan sebagai Learning center. 
      Suasana yang tenang dan koleksi buku yang selalu diperbarui (baik fisik maupun akses digital) menjadi poin plus bagi
      orang tua yang menginginkan anaknya memiliki minat baca tinggi  `,
      image: fasilitasImg,
    },
    {
      title: "LABORATORIUM KOMPUTER",
      desc: `dilengkapi dengan perangkat terkini dan koneksi internet yang stabil. Fasilitas ini bukan sekadar pajangan, 
      melainkan pusat pembelajaran literasi digital dan persiapan asesmen berbasis komputer yang sudah teruji`,
      image: fasilitasImg,
    },
    {
      title: "LABORATORIUM IPA (Sains)",
      desc: `Untuk mendukung kurikulum praktikum, Lab IPA di St. Rafael dilengkapi dengan peralatan eksperimen yang standar. 
      Ini memberikan pengalaman belajar langsung (hands-on learning) bagi siswa, sehingga teori sains tidak hanya sekedar hafalan di buku.`,
      image: fasilitasImg,
    },
    {
      title: "Lingkungan Sekolah",
      desc: `SMP St. Rafael menawarkan lingkungan yang bersih, rindang, dan tertata. Taman sekolah yang dirawat 
      dengan baik menciptakan atmosfer belajar yang sejuk, yang secara psikologis membantu fokus siswa dalam menyerap pelajaran.`,
      image: fasilitasImg,
    },
  ];
  return (
    <PublicLayout>
      <section className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 px-6 md:px-10 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">
          Fasilitas Sekolah
        </h2>
      </section>
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex items-center gap-7 text-sm text-gray-500">
          {/* Tentang */}
          <Link to="/tentang" className="text-black font-semibold">
            Tentang
          </Link>

          <span className="mx-2">{">"}</span>

          {/* Sejarah */}
          <Link to="/sejarah" className="hover:text-blue-800 font-semibold">
            Sejarah Sekolah
          </Link>

          {/* Visi Misi (active) */}

          <Link to="/visi-misi" className="hover:text-blue-800 font-semibold">
            Visi Misi
          </Link>

          <Link to="/fasilitas" className="text-blue-800 font-semibold">
            Fasilitas sekolah
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14 space-y-36">
        {fasilitas.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="w-full md:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-xl"
              />
            </div>

            {/* TEXT */}
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-xl   leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PublicLayout>
  );
}

export default FasilitasPage;
