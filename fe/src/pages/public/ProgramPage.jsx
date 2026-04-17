import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import labImg from "@assets/kepsek.jpg";
import { Link } from "react-router";

function Program() {
  return (
    <>
      <section className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 px-6 md:px-20 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Program Unggulan</h2>
      </section>
      <div className=" px-20 py-2 text-md text-gray-600 flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <span className="text-blue-600 font-medium">Program Unggulan</span>
        <Link
          to="/ekstrakurikuler"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Ekstrakurikuler
        </Link>
        <Link
          to="/prestasi"
          className=" hover:text-blue-600 font-medium block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>
      <section className="text-center max-w-7xl mx-auto px-6 mb-12 mt-14">
        <p className="text-gray-900 text-3xl leading-relaxed font-semibold">
          SMP Katolik St. Rafael Manado, proses belajar tidak hanya berfokus
          pada penguasaan materi, tetapi juga pada pemahaman yang mendalam,
          pengembangan karakter, serta pembentukan pola pikir kritis dan
          kreatif.
        </p>
        <p className="text-2xl text-gray-600 font-medium">
          Melalui Penerapan Kurikulum nasional dengan pendekatan pembelajaran
          mendalam, siswa diajak untuk aktif mengeksplorasi pengetahuan,
          berpikir secara reflektif, serta menghubungkan apa yang dipelajari
          dengan kehidupan-nyata.
        </p>
      </section>
      <br />
      <div className="block border-b-2 border-gray-400 my-2 mx-auto w-6xl "></div>{" "}
      {/* Timeline */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20 m-30">
        {/* item 1 */}
        <div className="relative mb-24">
          {/* Garis atas */}
          <div className="absolute left-1/2 top-0 h-52 w-[2px] bg-gray-400 -translate-x-1/2"></div>

          {/* Konten tengah */}
          <div className="absolute left-1/2 top-40 -translate-x-1/2 text-center">
            {/* Icon */}
            <div className="bg-white p-1 rounded-full inline-block">
              <div className="bg-blue-900 text-white w-12 h-12 flex items-center justify-center rounded-full">
                🎓
              </div>
            </div>

            {/* Judul */}
            <h3 className="font-semibold text-blue-900 mt-3">
              Pendidikan Karakter <br />
              Berbasis Nilai Kristiani
            </h3>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
              Pendidikan menekankan pembentukan karakter siswa yang tidak hanya
              cerdas secara akademis, tetapi juga memiliki integritas moral yang
              kuat sesuai dengan nilai-nilai katolik( disiplin, kejujuran, dan
              kasih)
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="flex justify-end">
            <img src={labImg} alt="Program" className="w-64 translate-y-30" />
          </div>
        </div>

        {/* item 2 */}
        <div className="relative mb-24 ">
          {/* Garis atas */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-400 -translate-x-1/2"></div>

          {/* Konten tengah */}
          <div className="absolute left-1/2 top-96 -translate-x-1/2 text-center">
            {/* Icon */}
            <div className="bg-white p-1 rounded-full inline-block">
              <div className="bg-blue-900 text-white w-12 h-12 flex items-center justify-center rounded-full">
                👩‍🏫
              </div>
            </div>

            {/* Judul */}
            <h3 className="font-semibold text-blue-900 mt-3">
              Kedisiplinan yang <br />
              Ketat dan Nilai Terukur
            </h3>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
              Sekolah ini dikenal di Manado sebagai institusi yang sangat
              mengedepankan kedisiplinan. Hal ini mencakup: Ketepatan waktu
              kehadiran, kerapian, berseragam, kepatuhan tata krama terhadap
              guru dan sesama siswa
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="flex justify-start">
            <img src={labImg} alt="Program" className="w-64 translate-y-80" />
          </div>
        </div>

        {/* item 3 */}
        <div className="relative min-h-[800px] mb-24 ">
          {/* Garis atas */}
          <div className="absolute left-1/2 top-56 h-96 w-[2px] bg-gray-400 -translate-x-1/2"></div>

          {/* Konten tengah */}
          <div className="absolute left-1/2 top-[600px] -translate-x-1/2 text-center">
            {/* Icon */}
            <div className="bg-white p-1 rounded-full inline-block">
              <div className="bg-blue-900 text-white w-12 h-12 flex items-center justify-center rounded-full">
                💻
              </div>
            </div>

            {/* Judul */}
            <h3 className="font-semibold text-blue-900 mt-3">
              Pendidikan Karakter <br />
              Berbasis Nilai Kristiani
            </h3>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
              Pendidikan menekankan pembentukan karakter siswa yang tidak hanya
              cerdas secara akademis, tetapi juga memiliki integritas moral yang
              kuat sesuai dengan nilai-nilai katolik( disiplin, kejujuran, dan
              kasih)
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="flex justify-end">
            <img src={labImg} alt="Program" className="w-64 translate-y-96" />
          </div>
        </div>

        <div className="relative mb-24">
          {/* Garis atas */}
          <div className="absolute left-1/2 top-0 h-48 w-[2px] bg-gray-400 -translate-x-1/2"></div>
        </div>
      </section>
    </>
  );
}

export default Program;
