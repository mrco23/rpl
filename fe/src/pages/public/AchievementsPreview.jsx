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
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center gap-4 mb-12 px-2">
          {/* Garis kiri */}
          <div className="w-[3px] h-20 bg-blue-900 rounded"></div>

          {/* Judul */}
          <h2 className="text-3xl md:text-5xl font-medium text-gray-800">
            Prestasi Kami
          </h2>
        </div>

        <div className="px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {data.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-full max-w-[420px]"
            >
              {/* Image */}
              <div className="p-3 pb-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-blue-900 font-semibold text-xl">
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
        <div className="flex justify-center mt-10">
          <Link
            to="/prestasi"
            className="flex items-center gap-2 border-2 p-4 rounded-2xl hover:bg-gray-100"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
