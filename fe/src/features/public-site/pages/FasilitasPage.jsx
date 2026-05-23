import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import fasilitasService from "../services/fasilitasService";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarAbout from "../components/NavbarAbout";
import { getImageUrl } from "../../../shared/utils/imageHelper";

function FasilitasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      duration: 800,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
      const res = await fasilitasService.getFasilitas();
      setData(res.data);
        setTimeout(() => {
          AOS.refresh();
        }, 100);
    } catch (err) {
      setError(err.message);
    }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-clip">
      {/* Header Section */}
      <section className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-35 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">
          Fasilitas Sekolah
        </h2>
      </section>

      <NavbarAbout location="fasilitas" />

      {/* State Renderings */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-6 py-14 space-y-36">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* IMAGE SKELETON */}
              <div className="w-full md:w-1/2">
                <div className="w-full h-[350px] bg-slate-200 rounded-2xl animate-pulse shadow-sm"></div>
              </div>

              {/* TEXT SKELETON */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="w-3/4 h-10 bg-slate-200 rounded-lg animate-pulse mb-5"></div>
                <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-3"></div>
                <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-3"></div>
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
            className="px-6 py-2.5 bg-blue-dark text-white rounded-xl font-bold hover:bg-blue-dark-hover transition-colors shadow-sm cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-14 space-y-28 lg:space-y-40">
          {data.map((item, index) => {
            const displayTitle = item.nama_fasilitas || item.nama || "Tanpa Judul";
            const displayDesc = item.deskripsi || "Tidak ada deskripsi";
            const displayImage = item.gambar_fasilitas || item.gambar || null;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id_fasilitas || index}
                className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 ${!isEven ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* IMAGE - Masuk dari samping */}
                <div
                  className="w-full md:w-1/2"
                  data-aos={isEven ? "fade-right" : "fade-left"}
                >
                  <img
                    src={getImageUrl(displayImage)}
                    alt={displayTitle}
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Gambar+Tidak+Tersedia";
                    }}
                  />
                </div>

                {/* TEXT - Muncul dari bawah dengan sedikit jeda (stagger) */}
                <div
                  className="w-full md:w-1/2 flex flex-col justify-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    {displayTitle}
                  </h3>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    {displayDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FasilitasPage;