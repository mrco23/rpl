import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import achievementService from "../../services/achievementService";
import CardSkeleton from "../../components/features/CardSkeleton";

export default function PrestasiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await achievementService.getPublicAchievements();
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
      <section className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-20 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Prestasi siswa</h2>
      </section>
      <div className=" px-20 py-2 text-md text-gray-600 hidden sm:flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>

        <Link
          to="/ekstrakurikuler"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Ekstrakurikuler
        </Link>
        <Link
          to="/prestasi"
          className=" text-blue-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>

      {/* State Renderings */}
      {loading ? (
        <div className="px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <div className="px-20 py-10 text-center flex flex-col items-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition"
          >
            Coba Lagi
          </button>
        </div>
      ) : data.length === 0 ? (
        <div className="px-20 py-10 text-center text-xl text-gray-600">
          Belum ada data prestasi.
        </div>
      ) : (
        <div className="px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {/* Card Grid */}
          {data.map((item, index) => {
            const displayTitle = item.judul_prestasi || item.nama_prestasi || "Tanpa Judul";
            const displayDesc = item.deskripsi || "Tidak ada deskripsi";
            const displayImage = item.gambar_prestasi || item.gambar || null;
            const displayKategori = item.kategori || "Peraih Prestasi";

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-full max-w-[420px]"
              >
                {/* Image */}
                <div className="p-3 pb-0">
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-full h-72 object-cover rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-blue-900 font-semibold text-xl">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-blue-800 font-medium">
                    {displayKategori}
                  </p>
                  <p className="text-sm text-blue-800 font-medium mt-2 leading-relaxed">
                    {displayDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
