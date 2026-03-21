import PublicLayout from "@components/layout/PublicLayout.jsx";
import hero from "@assets/hero.jpg";
import AboutSection from "./AboutSection";
import QuotePage from "./QuotePage";
import AchievementsPage from "./AchievementsPage";
import NewsPage from "./NewsPage";

export default function LandingPage() {
    return (
        <PublicLayout>
            <main>
                <section className="relative w-full h-[80vh]">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{backgroundImage: `url(${hero})`}}
                    >
                        <div className="absolute inset-0 bg-black/40"></div>
                        {" "}
                        {/* overlay gelap */}
                    </div>

                    {/* Content */}
                    <div
                        className="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-6 text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            SMP KATOLIK <br/> ST.RAFAEL MANADO
                        </h1>
                        <p className="text-lg md:text-xl mb-6 max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation
                        </p>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                Daftar Sekarang
                            </button>
                            <button
                                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </div>
                </section>
                <AboutSection/>
                <QuotePage/>
                <AchievementsPage/>
                <NewsPage/>
            </main>
        </PublicLayout>
    );
}
