import React from "react";
import hero from "@assets/hero.png";
import { Link } from "react-router";

function SejarahPage() {
  return (
    <>
      <section className="relative h-[300px] overflow-hidden rounded-b-3xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-20 pt-60">
          <h1 className="text-white text-3xl md:text-4xl font-normal">
            Sejarah Sekolah
          </h1>
        </div>
      </section>

      {/* NAV TAB */}
      <div className=" px-20 py-5 text-sm text-gray-600 hidden sm:flex flex gap-10">
        <span className="text-black font-semibold">Tentang</span>
        <p className="font-semibold">{">"}</p>
        <Link to="/sejarah" className="text-blue-800 font-semibold">
          Sejarah Sekolah
        </Link>
        <Link to="/visi-misi" className="hover:text-blue-800 font-semibold">
          Visi Misi
        </Link>

        <Link to="/fasilitas" className="hover:text-blue-800 font-semibold">
          Fasilitas sekolah
        </Link>
      </div>

      {/* CONTENT */}
      <section className="px-6 md:px-16 py-10 text-center">
        <h2 className="text-4xl font-semibold mb-3">Sejarah Sekolah</h2>
        <p className="text-gray-600 mb-8 text-center text-3xl max-w-4xl mx-auto">
          SMP Katolik St. Rafael Manado bernaung di bawah Yayasan Pendidikan
          Katolik Keuskupan Manado (YPK-KM)
        </p>

        {/* BAGIAN ATAS (GRID 2 KOLOM) */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="w-full h-[200px] bg-black rounded-lg"></div>

          {/* Paragraf 1 */}
          <div className="text-left text-gray-600 text-xl leading-relaxed">
            <p>
              Yayasan ini merupakan lembaga resmi yang mengelola sekolah-sekolah
              Katolik di wilayah kerja Keuskupan Manado, yang meliputi Sulawesi
              Utara, Tengah, dan Gorontalo.
            </p>
          </div>
        </div>

        {/* PARAGRAF 2 (FULL WIDTH DI BAWAH) */}
        <div className="mt-10 w-full text-gray-900  text-2xl ">
          <p>
            Berdasarkan data dari Kementerian Pendidikan, sekolah ini memiliki
            SK Pendirian tertanggal 22 Desember 1946. Ini menunjukkan bahwa SMP
            St. Rafael telah ada sejak masa awal kemerdekaan Indonesia,
            menjadikannya salah satu sekolah dengan sejarah yang sangat tua di
            Manado.
          </p>
        </div>

        <p className="text-gray-500 mt-6 max-w-3xl text-xl mx-auto">
          Namun, sekolah ini memperbarui atau mempertegas status operasionalnya
          melalui SK yang diterbitkan pada 18 Juli 1985.
        </p>
      </section>

      {/* BLUE SECTION */}
      <section className="relative">
        <div className="flex">
          <div className="bg-blue-dark h-20 w-[70%] rounded-tr-[100px]"></div>
          <div className="bg-blue-dark h-20 w-[30%] rounded-tl-[100px]"></div>
        </div>

        <section className="bg-blue-dark text-white px-6 md:px-20 py-12">
          {/* curve atas */}

          {/* BAGIAN ATAS (FULL WIDTH) */}
          <div className="px-6 md:px-20">
            <p className=" md:text-4xl font-medium leading-loose text-center">
              St. Rafael didirikan untuk menyediakan pendidikan berkualitas yang
              mengedepankan nilai-nilai Kristiani (Katolik) serta pembentukan
              karakter (character building) bagi masyarakat di sekitar wilayah
              Manado.
            </p>
          </div>

          {/* BAGIAN BAWAH (TETAP DI TENGAH) */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-t border-white/30 mt-6 pt-4 text-md text-white/80">
              Berlandaskan nilai kasih, pelayanan, dan kejujuran, kami berupaya
              mendampingi setiap siswa untuk bertumbuh menjadi pribadi yang
              tidak hanya berpengetahuan luas, tetapi juga memiliki hati yang
              peduli dan berintegritas.
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default SejarahPage;
