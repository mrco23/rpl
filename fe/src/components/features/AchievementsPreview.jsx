import img from "@assets/prestasi.jpg";
import MoreButton from "../ui/MoreButton";

export default function AchievementsPreview({ data = [] }) {
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
                  src={item.gambar || img}
                  alt={item.nama_prestasi || "Prestasi"}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-blue-900 font-semibold text-xl">
                  {item.nama_prestasi}
                </h3>
                <p className="text-xs text-blue-800 font-medium">
                  Peraih Prestasi
                </p>
                <p className="text-sm text-blue-800 font-medium mt-2 leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <MoreButton text={'Lihat Semua Prestasi'} to={'/prestasi'} />
      </div>
    </section>
  );
}
