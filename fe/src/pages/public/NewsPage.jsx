import img from "@assets/berita.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiCalendar } from "react-icons/fi";
import newsService from "../../services/newsService";
import CardSkeleton from "../../components/features/CardSkeleton";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await newsService.getAllNews();
      if (res.success) {
        setNews(res.data || []);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* HEADER BIRU */}
      <section className="w-full bg-[#1f3b9a] text-white rounded-b-3xl py-8 mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-medium translate-y-4">Berita</h2>
        </div>
      </section>
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-10 md:px-6">
          {/* State Renderings */}
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : error ? (
            <div className="py-10 text-center flex flex-col items-center">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-900 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition"
              >
                Coba Lagi
              </button>
            </div>
          ) : news.length === 0 ? (
            <div className="py-10 text-center text-xl text-gray-600">
              Belum ada berita.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {/* GRID */}
              {news.map((item, index) => {
                const dateRaw = item.tanggal_dibuat || item.created_at;
                const displayDate = dateRaw
                  ? new Date(dateRaw).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                  : "Tanggal tidak tersedia";

                return (
                  <Link to={`/berita/${item.id_berita || ''}`} key={item.id_berita || index}>
                    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
                      {/* IMAGE */}

                      <img
                        src={item.gambar_berita || item.gambar || img}
                        alt={item.judul_berita || item.judul || "Berita"}
                        className="w-full h-52 object-cover rounded-2xl"
                      />

                      {/* CONTENT */}
                      <div className="p-4">
                        {/* DATE + ICON */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <FiCalendar className="text-gray-400 text-[14px]" />
                          <span>{displayDate}</span>
                        </div>

                        {/* TITLE */}
                        <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2">
                          {item.judul_berita || item.judul || "Tanpa Judul"}
                        </h3>

                        {/* DESC */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.deskripsi || "Tidak ada deskripsi"}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* BUTTON */}
        </div>
      </section>
    </>
  );
}
