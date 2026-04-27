import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import extracurricularService from "@services/extracurricularService";
import CardSkeleton from "@components/features/CardSkeleton";

export default function EkstrakurikulerPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await extracurricularService.getEkstrakurikuler();
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
        <h2 className="text-2xl font-medium translate-y-4">Ekstrakurikuler</h2>
      </section>
      <div className="hidden px-20 py-2 text-md text-gray-600 sm:flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>

        <span className="text-blue-600  font-medium">Ekstrakurikuler</span>
        <Link
          to="/prestasi"
          className=" hover:text-blue-600 block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>
      <div className="px-20 py-6 text-gray-700">
        <section className="text-center max-w-7xl mx-auto px-6 mb-12 mt-10">
          <p className="text-gray-900 text-md leading-relaxed font-semibold">
            Melalui berbagai kegiatan yang menarik dan bermanfaat, siswa
            didorong untuk mengembangkan bakat, membangun kepercayaan diri,
            serta belajar bekerja sama dan berprestasi di berbagai bidang.
            Kegiatan ekstrakurikuler juga menjadi sarana bagi siswa untuk
            bertumbuh dalam nilai-nilai disiplin, tanggung jawab, kreativitas,
            dan kepemimpinan, sehingga mereka dapat berkembang menjadi pribadi
            yang aktif dan berkarakter.
          </p>
        </section>
        <h2 className="text-3xl font-medium font-serif mt-6 mb-4">
          Mari Jelajahi!
        </h2>
      </div>

      {/* Dynamic Data States */}
      {loading ? (
        <div className="px-20 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
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
          Belum ada data ekstrakurikuler.
        </div>
      ) : (
        <div className="px-20 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
          {/* Cards */}
          {data.map((item, index) => {
            const displayTitle = item.nama_ekskul || item.nama || "Tanpa Judul";
            const displayImage = item.gambar_ekskul || item.gambar || null;
            const displayDesc = item.deskripsi || "Tidak ada deskripsi";
            const displayPembina = item.p_jwb_ekskul || "-";

            return (
              <div key={index} className=" flex flex-col">
                {displayImage && (
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-lg font-semibold mb-2">{displayTitle}</h4>
                  <p className="text-gray-900 mb-4 flex-1">{displayDesc}</p>
                  <p className="text-black font-medium mb-1">
                    <span className="font-semibold text-blue-800">Pembina:</span>{" "}
                    {displayPembina}
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
