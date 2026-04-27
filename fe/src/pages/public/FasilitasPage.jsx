import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import fasilitasService from "@services/fasilitasService";
import AOS from "aos";
import "aos/dist/aos.css";

function FasilitasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      once: false
    });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await fasilitasService.getFasilitas();
      if (res.success) {
        setTimeout(() => setData(res.data), 1000)
        AOS.refresh();
      } else {
        setError(res.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 px-6 md:px-35 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">
          Fasilitas Sekolah
        </h2>
      </section>
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="hidden sm:flex flex items-center gap-7 text-sm text-gray-500">
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

      {/* State Renderings */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-6 py-14 space-y-36">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* IMAGE SKELETON */}
              <div className="w-full md:w-1/2">
                <div className="w-full h-[300px] bg-slate-200 rounded-xl animate-pulse"></div>
              </div>

              {/* TEXT SKELETON */}
              <div className="w-full md:w-1/2">
                <div className="w-3/4 h-10 bg-slate-200 rounded animate-pulse mb-4"></div>
                <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-5/6 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-dark text-white rounded-md hover:bg-blue-dark-hover transition"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-14 space-y-36">
          {data.map((item, index) => {
            const displayTitle = item.nama_fasilitas || item.nama || "Tanpa Judul";
            const displayDesc = item.deskripsi || "Tidak ada deskripsi";
            const displayImage = item.gambar_fasilitas || item.gambar || null;

            return (
              <div
                data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                data-aos-duration="500"
                data-aos-delay={index * 100}
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* IMAGE */}
                <div className="w-full md:w-1/2">
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-full h-[300px] object-cover rounded-xl"
                  />
                </div>

                {/* TEXT */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-4xl font-semibold mb-2">{displayTitle}</h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
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

export default FasilitasPage;
