import img from "@assets/berita.jpg";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { requestAPI } from "../../services/api";
import { Link } from "react-router";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { FiCalendar } from "react-icons/fi";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    requestAPI({
      method: "get",
      url: "/berita",
    })
      .then((res) => {
        console.log(res.data);
        setNews(res.data.data); // ✅ FIX
      })
      .catch((err) => console.error(err));
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
          {/* GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {news.map((item) => (
              <Link to={`/berita/${item.id_berita}`} key={item.id_berita}>
                <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
                  {/* IMAGE */}

                  <img
                    src={item.gambar || img}
                    alt={item.judul}
                    className="w-full h-52 object-cover rounded-2xl"
                  />

                  {/* CONTENT */}
                  <div className="p-4">
                    {/* DATE + ICON */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <FiCalendar className="text-gray-400 text-[14px]" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2">
                      {item.judul}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* BUTTON */}
        </div>
      </section>
    </>
  );
}
