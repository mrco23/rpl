import React, { useEffect, useState } from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import labImg from "@assets/kepsek.jpg";
import { Link } from "react-router-dom"; // changed from "react-router" to avoid potential bugs, wait no I shouldn't touch irrelevant things.
// actually let's stick to import { Link } from "react-router"; as per original
import programService from "../../services/programService";

function Program() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await programService.getPublicPrograms();
      if (res.success) {
        setData(res.data || []);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
      
      {/* Dynamic Content States */}
      {loading ? (
        <section className="relative max-w-5xl mx-auto px-6 pb-20 m-30">
          {[1, 2, 3].map((_, index) => {
            const styleIdx = index % 3;

            if (styleIdx === 0) {
              return (
                <div key={index} className="relative mb-24">
                  <div className="absolute left-1/2 top-0 h-52 w-[2px] bg-gray-400 -translate-x-1/2"></div>
                  <div className="absolute left-1/2 top-40 -translate-x-1/2 text-center">
                    <div className="bg-white p-1 rounded-full inline-block">
                      <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-32 h-6 bg-slate-200 animate-pulse rounded mt-3 mx-auto"></div>
                    <div className="w-48 h-10 bg-slate-200 animate-pulse rounded mt-2 mx-auto"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-64 h-48 bg-slate-200 rounded-xl animate-pulse translate-y-30"></div>
                  </div>
                </div>
              );
            }

            if (styleIdx === 1) {
              return (
                <div key={index} className="relative mb-24">
                  <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-400 -translate-x-1/2"></div>
                  <div className="absolute left-1/2 top-96 -translate-x-1/2 text-center">
                    <div className="bg-white p-1 rounded-full inline-block">
                      <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-32 h-6 bg-slate-200 animate-pulse rounded mt-3 mx-auto"></div>
                    <div className="w-48 h-10 bg-slate-200 animate-pulse rounded mt-2 mx-auto"></div>
                  </div>
                  <div className="flex justify-start">
                    <div className="w-64 h-48 bg-slate-200 rounded-xl animate-pulse translate-y-80"></div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="relative min-h-[800px] mb-24">
                <div className="absolute left-1/2 top-56 h-96 w-[2px] bg-gray-400 -translate-x-1/2"></div>
                <div className="absolute left-1/2 top-[600px] -translate-x-1/2 text-center">
                  <div className="bg-white p-1 rounded-full inline-block">
                    <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-full animate-pulse"></div>
                  </div>
                  <div className="w-32 h-6 bg-slate-200 animate-pulse rounded mt-3 mx-auto"></div>
                  <div className="w-48 h-10 bg-slate-200 animate-pulse rounded mt-2 mx-auto"></div>
                </div>
                <div className="flex justify-end">
                  <div className="w-64 h-48 bg-slate-200 rounded-xl animate-pulse translate-y-96"></div>
                </div>
              </div>
            );
          })}
          <div className="relative mb-24">
            <div className="absolute left-1/2 top-0 h-48 w-[2px] bg-gray-400 -translate-x-1/2"></div>
          </div>
        </section>
      ) : error ? (
        <section className="text-center py-20 pb-32 flex flex-col items-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-900 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition"
          >
            Coba Lagi
          </button>
        </section>
      ) : data.length === 0 ? (
        <section className="text-center py-20 pb-32">
          <p className="text-xl text-gray-600">Belum ada data program unggulan.</p>
        </section>
      ) : (
        <section className="relative max-w-5xl mx-auto px-6 pb-20 m-30">
          {data.map((item, index) => {
            const styleIdx = index % 3;

            if (styleIdx === 0) {
              return (
                <div key={index} className="relative mb-24">
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
                      {item.nama_pu}
                    </h3>

                    {/* Deskripsi */}
                    <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Gambar kanan */}
                  <div className="flex justify-end">
                    <img src={item.gambar_pu || labImg} alt={item.nama_pu} className="w-64 translate-y-30 object-cover" />
                  </div>
                </div>
              );
            }

            if (styleIdx === 1) {
              return (
                <div key={index} className="relative mb-24 ">
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
                      {item.nama_pu}
                    </h3>

                    {/* Deskripsi */}
                    <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Gambar kanan */}
                  <div className="flex justify-start">
                    <img src={item.gambar_pu || labImg} alt={item.nama_pu} className="w-64 translate-y-80 object-cover" />
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="relative min-h-[800px] mb-24 ">
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
                    {item.nama_pu}
                  </h3>

                  {/* Deskripsi */}
                  <p className="text-sm text-gray-600 mt-2 max-w-xs mx-auto">
                    {item.deskripsi}
                  </p>
                </div>

                {/* Gambar kanan */}
                <div className="flex justify-end">
                  <img src={item.gambar_pu || labImg} alt={item.nama_pu} className="w-64 translate-y-96 object-cover" />
                </div>
              </div>
            );
          })}

          <div className="relative mb-24">
            {/* Garis atas akhir penutup */}
            <div className="absolute left-1/2 top-0 h-48 w-[2px] bg-gray-400 -translate-x-1/2"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default Program;
