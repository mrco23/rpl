import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Jika menggunakan react-router-dom, pastikan import dari "react-router-dom"
import programService from "@services/programService";

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

  // Fungsi pembantu untuk merender ikon berdasarkan indeks
  const renderIcon = (index) => {
    const icons = ["🎓", "👩‍🏫", "💻", "🤝"]; // Sesuaikan dengan kebutuhan ikon Anda
    return icons[index % icons.length];
  };

  return (
    <>
      {/* Header Section */}
      <section className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-20 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Program Unggulan</h2>
      </section>

      {/* Breadcrumbs */}
      <div className="px-20 py-2 text-md text-gray-600 hidden sm:flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <span className="text-blue-600 font-medium">Program Unggulan</span>
        <Link
          to="/ekstrakurikuler"
          className="text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Ekstrakurikuler
        </Link>
        <Link
          to="/prestasi"
          className="hover:text-blue-600 font-medium block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>

      {/* Intro Text */}
      <section className="text-center max-w-5xl mx-auto px-6 mb-12 mt-14">
        <p className="text-gray-900 text-lg sm:text-2xl leading-relaxed font-semibold mb-6">
          SMP Katolik St. Rafael Manado, proses belajar tidak hanya berfokus
          pada penguasaan materi, tetapi juga pada pemahaman yang mendalam,
          pengembangan karakter, serta pembentukan pola pikir kritis dan
          kreatif.
        </p>
        <p className="text-md sm:text-xl text-gray-600 font-medium max-w-4xl mx-auto">
          Melalui Penerapan Kurikulum nasional dengan pendekatan pembelajaran
          mendalam, siswa diajak untuk aktif mengeksplorasi pengetahuan,
          berpikir secara reflektif, serta menghubungkan apa yang dipelajari
          dengan kehidupan nyata.
        </p>
      </section>

      <div className="block border-b border-gray-300 my-8 mx-auto w-4/5 max-w-4xl"></div>

      {/* Dynamic Content States */}
      {loading ? (
        <TimelineContainer>
          {[1, 2, 3].map((_, index) => (
            <TimelineSkeletonItem key={index} index={index} />
          ))}
        </TimelineContainer>
      ) : error ? (
        <section className="text-center py-20 pb-32 flex flex-col items-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 px-6 py-2 text-white rounded-md hover:bg-blue-800 transition"
          >
            Coba Lagi
          </button>
        </section>
      ) : data.length === 0 ? (
        <section className="text-center py-20 pb-32">
          <p className="text-xl text-gray-600">
            Belum ada data program unggulan.
          </p>
        </section>
      ) : (
        <TimelineContainer>
          {data.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              icon={renderIcon(index)}
            />
          ))}
        </TimelineContainer>
      )}
    </>
  );
}

// Sub-komponen untuk kontainer garis waktu
function TimelineContainer({ children }) {
  return (
    <section className="relative max-w-6xl mx-auto px-6 py-10 mb-20">
      {/* Garis vertikal utama di tengah */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 -translate-x-1/2 hidden md:block z-0"></div>
      <div className="flex flex-col gap-24 relative z-10">{children}</div>
    </section>
  );
}

// Sub-komponen untuk item data aktual
function TimelineItem({ item, index, icon }) {
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full">
      {/* Kolom Kiri (Gambar muncul di kiri untuk indeks ganjil) */}
      <div className="flex justify-center md:justify-end w-full">
        {!isEven && item.gambar_pu && (
          <img
            src={item.gambar_pu}
            alt={item.nama_pu}
            className="w-full max-w-[300px] object-cover rounded-sm"
          />
        )}
      </div>

      {/* Kolom Tengah (Ikon dan Teks) */}
      <div className="flex flex-col items-center text-center bg-white py-4 px-2">
        <div className="bg-white p-2 rounded-full inline-block mb-4">
          <div className="bg-blue-900 text-white w-14 h-14 flex items-center justify-center rounded-full text-2xl shadow-md">
            {icon}
          </div>
        </div>
        <h3 className="font-semibold text-blue-900 text-xl mb-3">
          {item.nama_pu}
        </h3>
        <p className="text-sm text-gray-800 leading-relaxed max-w-xs">
          {item.deskripsi}
        </p>
      </div>

      {/* Kolom Kanan (Gambar muncul di kanan untuk indeks genap) */}
      <div className="flex justify-center md:justify-start w-full">
        {isEven && item.gambar_pu && (
          <img
            src={item.gambar_pu}
            alt={item.nama_pu}
            className="w-full max-w-[300px] object-cover rounded-sm"
          />
        )}
      </div>
    </div>
  );
}

function TimelineSkeletonItem({ index }) {
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full">
      <div className="flex justify-center md:justify-end w-full">
        {!isEven && (
          <div className="w-full max-w-[300px] h-64 bg-slate-200 rounded-sm animate-pulse"></div>
        )}
      </div>

      <div className="flex flex-col items-center text-center bg-white py-4 px-2">
        <div className="bg-white p-2 rounded-full inline-block mb-4">
          <div className="bg-slate-200 w-14 h-14 rounded-full animate-pulse"></div>
        </div>
        <div className="w-40 h-6 bg-slate-200 animate-pulse rounded mb-3"></div>
        <div className="w-64 h-16 bg-slate-200 animate-pulse rounded"></div>
      </div>

      <div className="flex justify-center md:justify-start w-full">
        {isEven && (
          <div className="w-full max-w-[300px] h-64 bg-slate-200 rounded-sm animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

export default Program;