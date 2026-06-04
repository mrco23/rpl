import { Link } from "react-router";
import { formatMediumDate } from "../../../shared/utils/dateHelper";
import { getImageUrl } from "../../../shared/utils/imageHelper";

export default function NewsCard({ item, variant = "overlay" }) {
  const id = item.id_berita;
  const title = item.judul_berita || item.judul || "Tanpa Judul";
  const description = item.deskripsi || "Tidak ada deskripsi";
  const imageRaw = item.gambar_berita || item.gambar;
  const dateRaw = item.tanggal_dibuat || item.tanggal || item.created_at;
  const displayDate = dateRaw ? formatMediumDate(dateRaw) : "Tanggal tidak tersedia";

  const imageUrl = imageRaw ? getImageUrl(imageRaw) : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/berita/${id || ''}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="aspect-4/5 w-full bg-slate-800 flex items-center justify-center text-sm text-slate-300">
            Gambar belum tersedia
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>

        <div className="absolute left-0 top-0 p-5 pointer-events-none">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
            Berita Sekolah
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <p className="mb-2 text-xs font-medium text-slate-200">
            {displayDate}
          </p>

          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white">
            {title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-200">
            {description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Baca Selengkapnya
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
