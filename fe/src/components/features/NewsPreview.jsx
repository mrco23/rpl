import img from "@assets/berita.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { FiCalendar } from "react-icons/fi";
import MoreButton from "../ui/MoreButton";

export default function NewsPreview({ data = [] }) {
  return (
    <section className="w-full py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-10">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-gray-800">
            Berita Terbaru
          </h2>
          <p className="p-6 text-2xl">Ikuti Terus Perkembangan Aktivitas Sekolah Kami</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {data.slice(0, 3).map((item, index) => (
            <Link to={`/berita/${item.id_berita || ''}`} key={index}>
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden p-2 cursor-pointer">
                {/* IMAGE */}

                <img
                  src={item.gambar || img}
                  alt={item.judul}
                  className="w-full aspect-[3.5/2.5] object-cover rounded-2xl"
                />

                {/* CONTENT */}
                <div className="p-4">
                  {/* DATE + ICON */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <FiCalendar className="text-gray-400 text-[14px]" />
                    <span>
                      {item.tanggal ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }) : "Tanggal tidak tersedia"}
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
        <MoreButton text={'Lihat Semua Berita'} to={'/berita'} />
      </div>
    </section>
  );
}
