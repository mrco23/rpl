import img from "@assets/berita.jpg";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { requestAPI } from "../../services/api";
import { Link } from "react-router";

export default function NewsPreview() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    requestAPI({
      method: "get",
      url: "/berita",
    })
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-10">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Berita Terbaru
          </h2>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {news.slice(0, 3).map((item) => (
            <Link to={`/berita/${item.id_berita}`} key={item.id_berita}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">

                <img
                  src={item.gambar || img}
                  alt={item.judul}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </p>

                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <Link
            to="/berita"
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