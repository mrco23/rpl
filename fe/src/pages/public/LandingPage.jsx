import React, { useEffect, useState } from "react";
import hero from "@assets/hero.png";
import PreviewFasilitas from "@components/features/PreviewFasilitas.jsx";
import QuotePage from "@components/features/Sambutan";
import PreviewPrestasi from "@components/features/PreviewPrestasi.jsx";
import PreviewBerita from "@components/features/PreviewBerita.jsx";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";

export default function LandingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await profileService.getLandingPageData();
      if (res.success) {
        setData(res.data);
      }
      // Jika gagal, biarkan data null — tiap section punya fallback sendiri
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="animate-pulse">
        <section className="relative w-full h-[80vh] bg-gray-600 rounded-b-3xl">
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
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] w-full max-w-6xl px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border text-center border-gray-100 rounded-lg py-8 px-8 shadow-md relative w-full h-40">
                  <div className="w-16 h-12 bg-gray-200 mx-auto rounded mt-2 mb-3"></div>
                  <div className="w-24 h-4 bg-gray-200 mx-auto rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-40 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="aspect-[4/3] bg-slate-200 rounded-2xl w-full"></div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="w-1/2 h-8 bg-slate-200 rounded"></div>
            <div className="w-full h-4 bg-slate-200 rounded"></div>
            <div className="w-full h-4 bg-slate-200 rounded"></div>
            <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
          </div>
        </div>

        <div className="py-20 mt-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="w-full aspect-[3/4] bg-slate-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-slate-200 rounded"></div>
            <div className="w-full h-4 bg-slate-200 rounded"></div>
            <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
            <div className="w-1/2 h-6 bg-slate-200 rounded mt-6"></div>
          </div>
        </div>
      </main>
    );
  }

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
      <section className="relative w-full h-[80vh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-b-3xl overflow-hidden brightness-40"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-start pt-32 h-full max-w-7xl mx-auto px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-semibold mb-4 leading-tight">
            SMP KATOLIK <br /> ST.RAFAEL MANADO
          </h1>
          <p className="text-base md:text-lg mb-5 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] w-full max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {stats.map((item, index) => (
              <div key={index} className="flex flex-col group">
                <Link to={item.path}>
                  <div
                    className="bg-white rounded-lg py-8 px-8 text-center shadow-md relative w-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
                  >
                    <span className="absolute top-3 right-4 text-blue-900 text-4xl opacity-100">
                      ✦
                    </span>

                    <h1 className="text-5xl font-bold text-blue-900">
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
      </section>

      <div className="mt-32 md:mt-40">
        <PreviewFasilitas data={fasilitas} />
      </div>

      <QuotePage data={kepala_sekolah} />
      <PreviewPrestasi data={prestasi} />
      <PreviewBerita data={berita} />
    </main>
  );
}
