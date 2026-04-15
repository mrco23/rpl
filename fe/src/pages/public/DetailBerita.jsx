import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { requestAPI } from "../../services/api";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import img from "@assets/berita.jpg";

export default function NewsDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    requestAPI({
      method: "get",
      url: `/berita/${id}`,
    })
      .then((res) => {
        console.log("RESPONSE:", res.data);

        const result = res.data.data || res.data;
        setData(result);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <div className="text-center py-20">Loading...</div>;

  return (
    <PublicLayout>
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          {/* IMAGE */}
          <img
            src={data.gambar || img}
            alt={data.judul}
            className="w-full h-72 object-cover rounded-2xl mb-6"
          />

          {/* DATE */}
          <p className="text-sm text-gray-500 mb-2">
            {new Date(data.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* TITLE + GARIS KIRI */}
          <div className="flex items-start gap-3 mb-4">
            {/* GARIS */}
            <div className="w-1 bg-blue-600 rounded-full"></div>

            {/* JUDUL */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {data.judul}
            </h1>
          </div>

          {/* CONTENT */}
          <p className="text-gray-700 leading-relaxed text-justify">
            {data.isi}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
