import React from "react";
import hero from "@assets/hero.png";
import NavbarAbout from "@components/common/NavbarAbout";

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
      <div className="py-8">
        <NavbarAbout location={"sejarah"} />
      </div>
      {/* NAV TAB */}


      {/* CONTENT */}
      <section className="px-6 md:px-16 py-10 text-center text-gray-900 flex flex-col gap-10 mb-5">
        <h2 className="text-4xl font-semibold">Sejarah Sekolah</h2>
        <div className="max-w-6xl mx-auto space-y-6 text-2xl flex flex-col gap-10">
          <p className="">
            SMP Katolik St. Rafael Manado bernaung di bawah Yayasan Pendidikan
            Katolik Keuskupan Manado (YPK-KM)
            Yayasan ini merupakan lembaga resmi yang mengelola sekolah-sekolah
            Katolik di wilayah kerja Keuskupan Manado, yang meliputi Sulawesi
            Utara, Tengah, dan Gorontalo.
          </p>

          {/* PARAGRAF 2 (FULL WIDTH DI BAWAH) */}
          <p>
            Berdasarkan data dari Kementerian Pendidikan, sekolah ini memiliki
            SK Pendirian tertanggal 22 Desember 1946. Ini menunjukkan bahwa SMP
            St. Rafael telah ada sejak masa awal kemerdekaan Indonesia,
            menjadikannya salah satu sekolah dengan sejarah yang sangat tua di
            Manado.
          </p>
          <p className="">
            Namun, sekolah ini memperbarui atau mempertegas status operasionalnya
            melalui SK yang diterbitkan pada 18 Juli 1985.
          </p>
        </div>
      </section>

      {/* BLUE SECTION */}
      <section className="relative">
        <div className="flex">
          <div className="bg-blue-dark h-12 w-[70%] rounded-tr-[100px]"></div>
          <div className="bg-blue-dark h-12 w-[30%] rounded-tl-[100px]"></div>
        </div>

        <section className="bg-blue-dark text-white px-6 md:px-25 py-12 w-full flex flex-col items-center">
          {/* curve atas */}

          {/* BAGIAN ATAS (FULL WIDTH) */}
          <div className="max-w-7xl">
            <p className=" text-2xl font-medium leading-loose text-center">
              St. Rafael didirikan untuk menyediakan pendidikan berkualitas yang
              mengedepankan nilai-nilai Kristiani (Katolik) serta pembentukan
              karakter (character building) bagi masyarakat di sekitar wilayah
              Manado.
            </p>
          </div>

          {/* BAGIAN BAWAH (TETAP DI TENGAH) */}
          <div className="max-w-6xl mx-auto text-center text-xl my-3">
            <div className="border-t border-white/30 mt-6 pt-4 text-md text-white/90">
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
