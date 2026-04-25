import MoreButton from "../ui/MoreButton";

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
          <div className="px-10 mb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
            {data.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[520px] cursor-pointer transition-all duration-800 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
                data-aos={index == 0 ? "fade-up-right" : index == 1 ? "fade-up" : "fade-up-left"}
                data-aos-duration="800"
                data-aos-delay={index * 500}
              >
                {/* IMAGE */}
                <div className="p-3 pb-0 overflow-hidden">
                  <img
                    src={item.gambar || null}
                    alt={item.nama_prestasi || "Prestasi"}
                    className="w-full aspect-4/3 object-cover rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-blue-900 font-semibold text-xl">{item.nama_prestasi}</h3>
                  <p className="text-xs text-blue-800 font-medium">Peraih Prestasi</p>
                  <p className="text-sm text-blue-800 font-medium mt-2 leading-relaxed line-clamp-3">
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