import React, { useEffect, useState } from "react";
import hero from "@assets/hero.png";
import PreviewFasilitas from "@components/features/PreviewFasilitas.jsx";
import QuotePage from "@components/features/Sambutan";
import PreviewPrestasi from "@components/features/PreviewPrestasi.jsx";
import PreviewBerita from "@components/features/PreviewBerita.jsx";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import AOS from "aos";
import "aos/dist/aos.css"; // import CSS AOS

export default function LandingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      once: false
    });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await profileService.getLandingPageData();
      if (res.success) {
        setData(res.data);
      }
      setTimeout(() => setLoading(false), 1500);
      AOS.refresh()
    };
    fetchData();

  }, []);


  const total_data = data?.total_data || {};
  const fasilitas = data?.fasilitas || [];
  const prestasi = data?.prestasi || [];
  const berita = data?.berita || [];
  const kepala_sekolah = data?.kepala_sekolah || null;

  const stats = [
    { value: total_data?.program_unggulan?.toString() || "0", label: "Program Unggulan", path: "/program" },
    { value: total_data?.fasilitas?.toString() || "0", label: "Fasilitas", path: "/fasilitas" },
    { value: total_data?.ekstrakurikuler?.toString() || "0", label: "Ekstrakurikuler", path: "/ekstrakurikuler" },
    { value: total_data?.prestasi?.toString() || "0", label: "Prestasi", path: "/prestasi" },
  ];

  return (
    <main>
      {/* HERO SECTION */}
      {loading ? (<section className="relative w-full h-[80vh] bg-gray-600 rounded-b-3xl">
        <div className="relative z-10 flex flex-col justify-start pt-32 h-full max-w-7xl mx-auto px-8">
          <div className="w-1/2 h-12 md:h-16 bg-slate-200 rounded mb-4"></div>
          <div className="w-2/3 h-12 md:h-16 bg-slate-200 rounded mb-4"></div>
          <div className="w-full max-w-lg h-6 bg-slate-200 rounded mb-2"></div>
          <div className="w-3/4 max-w-md h-6 bg-slate-200 rounded mb-5"></div>
          <div className="flex gap-3">
            <div className="w-32 h-10 bg-slate-200 rounded-md"></div>
            <div className="w-40 h-10 bg-slate-200 rounded-md"></div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-80 md:bottom-[-100px] w-full max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border text-center border-gray-100 rounded-lg py-8 px-8 shadow-md relative w-full h-40">
                <div className="w-16 h-12 bg-gray-200 mx-auto rounded mt-2 mb-3"></div>
                <div className="w-24 h-4 bg-gray-200 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>) : (<section className="relative w-full h-[80vh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-b-3xl overflow-hidden brightness-40"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-start pt-24 md:pt-32 h-full max-w-7xl mx-auto px-6 sm:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            SMP KATOLIK <br className="hidden sm:block" /> ST. RAFAEL MANADO
          </h1>
          <p className="text-sm md:text-lg mb-8 max-w-4xl opacity-90 leading-relaxed">
            Mulai perjalanan pendidikan menengah Anda di SMP Katolik St. Rafael Manado. Kami menyediakan lingkungan belajar yang mendukung prestasi dan pertumbuhan karakter. Klik tombol di bawah untuk proses pendaftaran.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-dark px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-blue-dark-hover  transition"
            >
              Daftar Sekarang
            </button>
            <Link to="/panduan" className="border border-white px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-white hover:text-blue-dark transition">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
        {/* 4 cards */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-300px] md:bottom-[-150px] xl:bottom-[-150px] w-full max-w-6xl px-5 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4  gap-10 md:gap-10 lg:gap-10 xl:gap-24">
            {stats.map((item, index) => (
              <div key={index} className="flex flex-col mx-auto group w-50 lg:w-40 xl:w-50" data-aos={`${index === 0 ? "fade-up-right" : index > 0 && index < stats.length - 1 ? "fade-up" : index === stats.length - 1 ? "fade-up-left" : ""
                }`} data-aos-duration="500"
                data-aos-delay={index * 100}>
                <Link to={item.path}>
                  <div
                    className="bg-white rounded-lg py-6 sm:py-8 px-0 lg:px-8 text-center shadow-md relative w-full h-30 sm:h-38 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
                  >
                    <span className="absolute top-3 right-4 text-blue-900 text-4xl opacity-100">
                      ✦
                    </span>

                    <h1 className="text-3xl sm:text-5xl  font-bold text-blue-900">
                      {item.value}
                    </h1>

                    {/* Label */}
                    <p className="text-blue-900 font-medium text-sm mt-2">
                      {item.label}
                    </p>

                    <div
                      className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"
                    ></div>
                  </div>
                </Link>
                <div
                  className="w-full h-1 bg-blue-900 rounded mt-3 transition-all duration-300 group-hover:opacity-0 group-hover:scale-x-0"
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>)
      }


      {/* AKREDITASI SECTION */}
      <section className="max-w-5xl mx-auto px-6 mt-40 md:mt-60 relative">
        {loading ? (
          <div className="bg-white rounded-4xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 px-8 pt-16 pb-12 text-center relative animate-pulse">

            {/* Skeleton Badge */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-gray-200 rounded-full" />
            </div>

            {/* Skeleton Title */}
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4" />

            {/* Skeleton Paragraph */}
            <div className="space-y-2 max-w-4xl mx-auto">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-4xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 px-8 pt-16 w-140 mx-auto pb-12 text-center relative mt-100 xl:mt-90" data-aos="fade-up" data-aos-duration="800">
            {/* Badge Icon Akreditasi */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-4xl">
                🏅
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Terakreditasi {data.akreditasi_sekolah.akreditasi}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-4xl mx-auto font-medium">
              Nomor SK Akreditasi <span className="font-bold">{data.akreditasi_sekolah.nomor_sk_akreditasi}</span>
            </p>

          </div>
        )}
      </section>


      <div className="mt-0 md:mt-40">
        <PreviewFasilitas loading={loading} data={fasilitas} dataAos={"fade-up"} />
      </div>

      <QuotePage data={kepala_sekolah} loading={loading} />
      <PreviewPrestasi data={prestasi} loading={loading} />
      <PreviewBerita data={berita} loading={loading} />
    </main >
  );
}