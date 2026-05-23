import MoreButton from "../../../shared/components/MoreButton";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";

export default function PreviewBerita({ data = [], loading }) {
  return (
    <section className="w-full py-20 font-sans mb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-gray-800">
            Berita Terbaru
          </h2>
          <p className="p-6 text-2xl">
            Ikuti Terus Perkembangan Aktivitas Sekolah Kami
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, 3).map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={Math.min(index * 80, 240)}
              >
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-xl text-gray-600">
            Belum ada berita terbaru.
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-12">
          <MoreButton text={'Lihat Semua Berita'} to={'/berita'} />
        </div>
      </div>
    </section >
  );
}

