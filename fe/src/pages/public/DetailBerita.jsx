import { useParams } from "react-router";
import { useEffect, useState } from "react";
import newsService from "../../services/newsService";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import img from "@assets/berita.jpg";

export default function NewsDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await newsService.getNewsDetail(id);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setError(res.message || "Berita tidak ditemukan.");
      }
      setLoading(false);
    };

    if (id) {
      fetchData();
    } else {
      setError("ID Berita tidak valid.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <section className="w-full py-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* IMAGE SKELETON */}
          <div className="w-full h-72 bg-slate-200 rounded-2xl mb-6 animate-pulse"></div>

          {/* DATE SKELETON */}
          <div className="w-32 h-4 bg-slate-200 mb-2 rounded animate-pulse"></div>

          {/* TITLE & GAP SKELETON */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-1 bg-blue-600 rounded-full h-8"></div>
            <div className="w-3/4 h-8 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* CONTENT SKELETON */}
          <div className="space-y-4">
            <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return (
    <div className="text-center py-20 flex flex-col items-center">
      <p className="text-xl text-red-600 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-900 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition"
      >
        Coba Lagi
      </button>
    </div>
  );

  if (!data) return <div className="text-center py-20 text-gray-600">Berita tidak ditemukan.</div>;

  const displayTitle = data.judul_berita || data.judul || "Tanpa Judul";
  const displayImage = data.gambar_berita || data.gambar || img;
  const displayDesc = data.deskripsi || data.isi || "Tidak ada rincian berita.";
  const dateRaw = data.tanggal_dibuat || data.created_at;
  const displayDate = dateRaw
    ? new Date(dateRaw).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "Tanggal tidak tersedia";

  return (
    <>
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          {/* IMAGE */}
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-96 object-cover rounded-xl mb-6"
          />

          {/* DATE */}
          <p className="text-sm text-gray-500 mb-2">
            {displayDate}
          </p>

          {/* TITLE + GARIS KIRI */}
          <div className="flex items-start gap-3 mb-4">
            {/* GARIS */}
            <div className="w-1 bg-blue-600 rounded-full"></div>

            {/* JUDUL */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {displayTitle}
            </h1>
          </div>

          {/* CONTENT */}
          <p className="text-gray-700 leading-relaxed text-justify">
            {displayDesc}
          </p>
        </div>
      </section>
    </>
  );
}
