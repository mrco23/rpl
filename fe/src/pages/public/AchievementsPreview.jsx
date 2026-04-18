import img from "@assets/prestasi.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function AchievementsPreview() {
  const data = Array(6).fill({
    id: 1,
    title: "Judul Prestasi",
    category: "Peraih Prestasi",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: img,
  });

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-10">
        {/* TITLE */}
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-[3px] h-20 bg-blue-900 rounded"></div>

          <h2 className="text-3xl md:text-5xl font-medium text-gray-800">
            Prestasi Kami
          </h2>
        </div>

        {/* CARD GRID */}
        <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          {data.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[520px] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="p-3 pb-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover rounded-xl transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-blue-900 font-semibold text-xl transition group-hover:text-blue-700">
                  {item.title}
                </h3>

                <p className="text-xs text-blue-800 font-medium">
                  {item.category}
                </p>

                <p className="text-sm text-blue-800 font-medium mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-6">
          <button className="px-5 py-2 border border-gray-400 text-gray-700 rounded-md flex items-center gap-2 mx-auto hover:bg-gray-100 hover:shadow-md transition duration-300">
            Lihat Semua
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}