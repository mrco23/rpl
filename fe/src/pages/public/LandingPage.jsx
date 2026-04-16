import PublicLayout from "@components/layout/PublicLayout.jsx";
import hero from "@assets/hero.jpg";
import AboutPage from "./AboutPage";
import QuotePage from "./Sambutan";
import AchievementsPreview from "./AchievementsPreview";
import NewsPreview from "./NewsPreview";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  const stats = [
    { value: "10", label: "Program Unggulan" },
    { value: "10", label: "Fasilitas" },
    { value: "12", label: "Ekstrakurikuler" },
    { value: "25", label: "Prestasi" },
  ];

  return (
    <PublicLayout>
      <main>
        {/* HERO SECTION */}
        <section className="relative w-full h-[80vh]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-b-3xl overflow-hidden"
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
                className="bg-[#1d3890] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#172c73]  transition"
              >
                Daftar Sekarang
              </button>
              <button className="border border-gray-400 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#172c73]  transition">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Statistik Cards */}
          {/* Statistik Cards */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] w-full max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
              {stats.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* CARD */}
                  <div className="bg-white rounded-lg py-8 px-8 text-center shadow-lg relative w-full">
                    {/* Icon */}
                    <span className="absolute top-3 right-4 text-blue-900 text-5xl">
                      ✦
                    </span>

                    {/* Angka */}
                    <h1 className="text-5xl font-bold text-blue-900">
                      {item.value}
                    </h1>

                    {/* Label */}
                    <p className="text-blue-900 text-sm mt-2">{item.label}</p>
                  </div>

                  {/* GARIS FULL WIDTH (SAMA DENGAN CARD) */}
                  <div className="w-full h-1 bg-blue-900 rounded mt-3"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <div className="mt-32 md:mt-40">
          <AboutPage />
        </div>

        <QuotePage />
        <AchievementsPreview />
        <NewsPreview />
      </main>
    </PublicLayout>
  );
}
