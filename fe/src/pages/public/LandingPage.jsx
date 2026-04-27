import React, { useEffect, useState, useMemo, useCallback } from "react";
import hero from "@assets/hero.png";
import PreviewFasilitas from "@components/features/PreviewFasilitas.jsx";
import QuotePage from "@components/features/Sambutan";
import PreviewPrestasi from "@components/features/PreviewPrestasi.jsx";
import PreviewBerita from "@components/features/PreviewBerita.jsx";
import { useNavigate, Link } from "react-router-dom";
import profileService from "../../services/profileService";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Sub-components extracted to prevent re-render of static skeletons ────────

const HeroSkeleton = () => (
  <section className="relative w-full h-[80vh] bg-gray-600 rounded-b-3xl">
    <div className="relative z-10 flex flex-col justify-start pt-32 h-full max-w-7xl mx-auto px-8">
      <div className="w-1/2 h-12 md:h-16 bg-slate-200 rounded mb-4" />
      <div className="w-2/3 h-12 md:h-16 bg-slate-200 rounded mb-4" />
      <div className="w-full max-w-lg h-6 bg-slate-200 rounded mb-2" />
      <div className="w-3/4 max-w-md h-6 bg-slate-200 rounded mb-5" />
      <div className="flex gap-3">
        <div className="w-32 h-10 bg-slate-200 rounded-md" />
        <div className="w-40 h-10 bg-slate-200 rounded-md" />
      </div>
    </div>
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-80 md:bottom-[-100px] w-full max-w-6xl px-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border text-center border-gray-100 rounded-lg py-8 px-8 shadow-md relative w-full h-40"
          >
            <div className="w-16 h-12 bg-gray-200 mx-auto rounded mt-2 mb-3" />
            <div className="w-24 h-4 bg-gray-200 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AkreditasiSkeleton = () => (
  <div className="bg-white rounded-4xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 px-8 pt-16 pb-12 text-center relative animate-pulse">
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
      <div className="w-full h-full bg-gray-200 rounded-full" />
    </div>
    <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4" />
    <div className="space-y-2 max-w-4xl mx-auto">
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  </div>
);

// AOS direction helper — defined outside component to avoid recreation
const getAosDirection = (index, total) => {
  if (index === 0) return "fade-up-right";
  if (index === total - 1) return "fade-up-left";
  return "fade-up";
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Init AOS once on mount
  useEffect(() => {
    AOS.init({ easing: "ease-in-out", once: false });
  }, []);

  // Fetch data — no artificial delay, refresh AOS after state settles
  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await profileService.getLandingPageData();
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh AOS after loading state changes (after paint)
  useEffect(() => {
    if (!loading) {
      // Defer to next frame so DOM is fully painted before AOS measures elements
      requestAnimationFrame(() => AOS.refresh());
    }
  }, [loading]);

  // Memoize derived values — recalculated only when `data` changes
  const total_data = useMemo(() => data?.total_data ?? {}, [data]);
  const fasilitas = useMemo(() => data?.fasilitas ?? [], [data]);
  const prestasi = useMemo(() => data?.prestasi ?? [], [data]);
  const berita = useMemo(() => data?.berita ?? [], [data]);
  const kepala_sekolah = useMemo(() => data?.kepala_sekolah ?? null, [data]);

  const stats = useMemo(
    () => [
      {
        value: total_data?.program_unggulan?.toString() ?? "0",
        label: "Program Unggulan",
        path: "/program",
      },
      {
        value: total_data?.fasilitas?.toString() ?? "0",
        label: "Fasilitas",
        path: "/fasilitas",
      },
      {
        value: total_data?.ekstrakurikuler?.toString() ?? "0",
        label: "Ekstrakurikuler",
        path: "/ekstrakurikuler",
      },
      {
        value: total_data?.prestasi?.toString() ?? "0",
        label: "Prestasi",
        path: "/prestasi",
      },
    ],
    [total_data]
  );

  // Memoize navigate handler to avoid passing new function reference on each render
  const handleRegister = useCallback(() => navigate("/register"), [navigate]);

  return (
    <main>
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      {loading ? (
        <HeroSkeleton />
      ) : (
        <section className="relative w-full h-[80vh]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-b-3xl overflow-hidden brightness-40"
            style={{ backgroundImage: `url(${hero})` }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col justify-start pt-24 md:pt-32 h-full max-w-7xl mx-auto px-6 sm:px-8 text-white">
            <h1 className="text-2xl md:text-6xl font-bold mb-4 leading-tight">
              SMP KATOLIK <br className="hidden sm:block" /> ST. RAFAEL MANADO
            </h1>
            <p className="text-sm md:text-lg mb-8 max-w-4xl opacity-90 leading-relaxed">
              Mulai perjalanan pendidikan menengah Anda di SMP Katolik St. Rafael
              Manado. Kami menyediakan lingkungan belajar yang mendukung prestasi
              dan pertumbuhan karakter. Klik tombol di bawah untuk proses
              pendaftaran.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleRegister}
                className="bg-blue-dark px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-blue-dark-hover transition"
              >
                Daftar Sekarang
              </button>
              <Link
                to="/panduan"
                className="border border-white px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-white hover:text-blue-dark transition"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-250px] sm:bottom-[-300px] md:bottom-[-120px] lg:bottom-[-130px] xl:bottom-[-150px] w-full max-w-6xl px-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:px-20 md:px-0 md:gap-5 lg:gap-10 xl:gap-24">
              {stats.map((item, index) => (
                <div
                  key={item.path}
                  className="flex flex-col mx-auto group w-30 sm:w-50 md:w-35 lg:w-40 xl:w-50"
                  data-aos={getAosDirection(index, stats.length)}
                  data-aos-duration="500"
                  data-aos-delay={index * 100}
                >
                  <Link to={item.path}>
                    <div className="bg-white rounded-lg py-6 sm:py-8 px-0 lg:px-8 text-center shadow-md relative w-full h-30 sm:h-38 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                      <span className="absolute top-3 right-4 text-blue-900 sm:text-2xl md:text-4xl opacity-100">
                        ✦
                      </span>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
                        {item.value}
                      </h1>
                      <p className="text-blue-900 font-medium text-sm mt-2">
                        {item.label}
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100" />
                    </div>
                  </Link>
                  <div className="w-full h-1 bg-blue-900 rounded mt-3 transition-all duration-300 group-hover:opacity-0 group-hover:scale-x-0" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AKREDITASI SECTION ───────────────────────────────────────────── */}
      <section className="w-full mx-auto sm:px-0 px-6 mt-40 md:mt-60 relative">
        {loading ? (
          <AkreditasiSkeleton />
        ) : (
          <div
            className="bg-white rounded-4xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 px-4 xl:px-8 pt-16 w-75 sm:w-97 lg:w-130 xl:w-140 mx-auto pb-12 text-center relative mt-100 sm:mt-65 lg:mt-70 xl:mt-90"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-4xl">
                🏅
              </div>
            </div>
            <h2 className="text-lg xl:text-3xl font-bold text-slate-800 mb-4">
              Terakreditasi {data.akreditasi_sekolah.akreditasi}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto font-medium">
              Nomor SK Akreditasi{" "}
              <span className="font-bold">
                {data.akreditasi_sekolah.nomor_sk_akreditasi}
              </span>
            </p>
          </div>
        )}
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────────────────────── */}
      <div className="mt-0 md:mt-40">
        <PreviewFasilitas loading={loading} data={fasilitas} dataAos="fade-up" />
      </div>

      <QuotePage data={kepala_sekolah} loading={loading} />
      <PreviewPrestasi data={prestasi} loading={loading} />
      <PreviewBerita data={berita} loading={loading} />
    </main>
  );
}