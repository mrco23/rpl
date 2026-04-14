import img from "@assets/prestasi.jpg"; // ganti dengan gambar asli nanti
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { Link } from "react-router";

export default function AchievementsPage() {
  const data = Array(6).fill({
    title: "Judul Prestasi",
    category: "Peraih Prestasi",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: img,
  });
  return (
    <PublicLayout>
      <section className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 px-6 md:px-10 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Prestasi siswa</h2>
      </section>
      <div className=" px-20 py-2 text-md text-gray-600 flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>

        <Link
          to="/ekstrakurikuler"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          ekstrakurikuler
        </Link>
        <Link
          to="/prestasi"
          className=" text-blue-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>
      {/* Card Grid */}
      <div className="px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
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
              <p className="text-xs text-blue-800 font-medium">{item.category}</p>
              <p className="text-sm text-blue-800  font-medium mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PublicLayout>
  );
}
