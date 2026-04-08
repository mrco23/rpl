import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import labImg from "@assets/kepsek.jpg";

function Program() {
  return (
    <PublicLayout>
      <section className="w-full bg-blue-900 text-white rounded-b-3xl py-6 px-6 md:px-10 mb-10">
        <h2 className="text-2xl font-bold">Program Unggulan</h2>
      </section>
      <div className=" px-20 py-2 text-sm text-gray-600 flex gap-6 -mt-5">
        <span className="font-semibold">Tentang</span>
        <p className="font-semibold">{">"}</p>
        <span className="text-blue-600 font-medium">Sejarah Sekolah</span>
        <span className="hover:text-blue-600">Visi dan Misi</span>
        <span className="hover:text-blue-600">Sambutan Kepala Sekolah</span>
        <span className="hover:text-blue-600">Fasilitas Sekolah</span>
      </div>
      <section className="text-center max-w-3xl mx-auto px-6 mb-12 mt-10">
        <p className="text-gray-900 text-md leading-relaxed font-semibold">
          SMP Katolik St. Rafael Maumere, proses belajar tidak hanya berfokus
          pada penguasaan materi, tetapi juga pada pemahaman yang mendalam,
          pengembangan karakter, serta pembentukan pola pikir kritis dan
          kreatif.
        </p>
        <p>
          Melalui Penerapan Kurikukulum nasional dengan pendekatan pembelajaran
          mendalam, siswa diajak untuk aktif mengeksplorasi pengetahuan,
          berpikir secara reflektif, serta menghubungkan apa yang dipelajari
          dengan kehidupan-nyata.
        </p>
      </section>
      {/* Timeline */}

      <section className="relative max-w-5xl mx-auto px-6 pb-20 m-40">
        {/* Garis Tengah */}
        <div className="relative flex justify-center mb-20">
          {/* Garis tengah (full dari atas ke bawah) */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-300 -translate-x-1/2"></div>

          {/* Konten tengah */}
          <div className="text-center z-10">
            {/* Icon */}
            <div className="bg-blue-900 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3">
              🎓
            </div>

            {/* Judul */}
            <h3 className="font-bold text-blue-900">
              Pendidikan Karakter <br />
              Berbasis Nilai Kristiani
            </h3>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
              Pendidikan menekankan pembentukan karakter siswa yang tidak hanya
              cerdas secara akademis, tetapi juga memiliki integritas moral.
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="absolute right-0">
            <img
              src={labImg}
              alt="Program 1"
              className="w-56 rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative flex items-center mb-16">
          {/* Kiri */}
          <div className="w-1/2 pr-10 text-right">
            <h3 className="font-bold text-blue-900">
              Pembelajaran Aktif dan Menyenangkan
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Metode belajar interaktif yang membuat siswa lebih aktif.
            </p>
            <img src={labImg} alt="" className="mt-4 rounded-lg w-64 ml-auto" />
          </div>

          {/* Titik */}
          <div className="absolute left-1/2 -translate-x-1/2 bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-full z-10">
            👩‍🏫
          </div>

          {/* Kanan kosong */}
          <div className="w-1/2"></div>
        </div>

        {/* Item 3 */}
        <div className="relative flex items-center">
          {/* Kiri kosong */}
          <div className="w-1/2"></div>

          {/* Titik */}
          <div className="absolute left-1/2 -translate-x-1/2 bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-full z-10">
            💻
          </div>

          {/* Kanan */}
          <div className="w-1/2 pl-10">
            <h3 className="font-bold text-blue-900">
              Teknologi dalam Pembelajaran
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Memanfaatkan teknologi untuk meningkatkan kualitas belajar siswa.
            </p>
            <img src={labImg} alt="" className="mt-4 rounded-lg w-64" />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default Program;
