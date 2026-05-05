import MoreButton from "../ui/MoreButton";
import { getImageUrl } from "../../utils/imageHelper";

export default function PreviewPrestasi({ data = [], loading }) {
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
        {loading ? (
          <div className="px-10 mb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[520px] animate-pulse"
              >
                {/* IMAGE SKELETON */}
                <div className="p-3 pb-0 overflow-hidden">
                  <div className="w-full aspect-4/3 bg-gray-200 rounded-xl" />
                </div>

                {/* CONTENT SKELETON */}
                <div className="p-4 space-y-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div> {/* Title */}
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div> {/* Subtitle */}
                  <div className="h-4 w-full bg-gray-200 rounded"></div> {/* Desc line 1 */}
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div> {/* Desc line 2 */}
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div> {/* Desc line 3 */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 mx-auto max-w-7xl gap-10">
            {data.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-sm overflow-hidden p-2 cursor-pointer sm:h-full md:h-80 lg:h-100 xl:h-109 mx-auto w-80 sm:w-130 md:w-60 lg:w-80 xl:w-90"
                data-aos={index == 0 ? "fade-up-right" : index == 1 ? "fade-up" : "fade-up-left"}
                data-aos-duration="800"
                data-aos-delay={Math.min(index * 80, 240)}
              >
                {/* IMAGE */}
                <div className="p-3 pb-0 overflow-hidden">
                  <img
                    src={getImageUrl(item.gambar)}
                    alt={item.nama_prestasi || "Prestasi"}
                    className="w-full aspect-5/3 object-cover rounded-2xl hover:scale-[1.01] transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-gray-800 font-semibold mb-2">Peraih: {item.peraih || "Siswa Sekolah"}</p>
                  <h3 className="text-blue-900 font-bold text-xl">{item.nama_prestasi}</h3>
                  <p className="text-sm text-gray-600 font-medium mt-4 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <MoreButton text={'Lihat Semua Prestasi'} to={'/prestasi'} />
      </div>
    </section>
  );
}