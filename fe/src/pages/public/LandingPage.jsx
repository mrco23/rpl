import PublicLayout from "@components/layout/PublicLayout.jsx";
import hero from "@assets/hero.jpg";
import AboutPage from "./AboutPage";
import QuotePage from "./Sambutan";
import AchievementsPreview from "./AchievementsPreview";
import NewsPreview from "./NewsPreview";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const stats = [
    { value: "10", label: "Program Unggulan", path: "/program" },
    { value: "10", label: "Fasilitas", path: "/fasilitas" },
    { value: "12", label: "Ekstrakurikuler", path: "/ekstrakurikuler" },
    { value: "25", label: "Prestasi", path: "/prestasi" },
  ];

  return (
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
              className="bg-blue-dark px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-blue-dark-hover  transition"
            >
              Daftar Sekarang
            </button>
            <Link to="/panduan" className="border border-white px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-white hover:text-blue-dark transition">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] w-full max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {stats.map((item) => (
              <div className="flex flex-col group">
                <Link to={item.path}>
                  <div
                    className="
      bg-white rounded-lg py-8 px-8 text-center shadow-md relative w-full
      cursor-pointer transition-all duration-300
      hover:shadow-xl hover:-translate-y-2
      overflow-hidden
    "
                  >
                    {/* Icon */}
                    <span className="absolute top-3 right-4 text-blue-900 text-4xl opacity-100">
                      ✦
                    </span>

                    {/* Angka */}
                    <h1 className="text-5xl font-bold text-blue-900">
                      {item.value}
                    </h1>

                    {/* Label */}
                    <p className="text-blue-900 font-medium text-sm mt-2">
                      {item.label}
                    </p>

                    {/* GARIS DALAM */}
                    <div
                      className="
        absolute bottom-0 left-0 w-full h-1 bg-blue-900
        
        transform scale-x-0 origin-left
        transition-all duration-300
        
        group-hover:scale-x-100
      "
                    ></div>
                  </div>
                </Link>

                {/* GARIS LUAR */}
                <div
                  className="
    w-full h-1 bg-blue-900 rounded mt-3
    
    transition-all duration-300
    group-hover:opacity-0
    group-hover:scale-x-0
  "
                ></div>
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
  );
}
