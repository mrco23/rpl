import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getVisiMisi } from "../../services/profileService.js";

function VisiMisiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getVisiMisi();
      if (res.success && res.data) {
        setData(res.data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const parseMisi = (misiString) => {
    if (!misiString) return [];

    // Jika ada newline atau titik koma, pisahkan berdasarkan karakter tsb
    if (misiString.includes('\n') || misiString.includes(';')) {
      return misiString
        .split(/\n|;/)
        .map(s => s.trim())
        // Hilangkan format penomoran di awal string (misal: "1. ", "2) ")
        .map(s => s.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(Boolean);
    }

    // Jika format inline panjang seperti "1. Misi satu 2. Misi dua"
    const inlinePattern = /(?:^|\s+)\d+[\.\)]\s+/;
    if (inlinePattern.test(misiString)) {
      return misiString
        .split(inlinePattern)
        .map(s => s.trim())
        .filter(Boolean);
    }

    // Fallback: satu kalimat/paragraf utuh
    return [misiString.trim()].filter(Boolean);
  };

  const misiLines = parseMisi(data?.misi);

  return (
    <>
      <main>
        <section className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-10 mb-10">
          <h2 className="text-2xl font-medium translate-y-4">Visi dan Misi</h2>
        </section>
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="hidden sm:flex items-center gap-7 text-sm text-gray-500">
            {/* Tentang */}
            <Link to="/tentang" className="text-black font-semibold">
              Tentang
            </Link>

            <span className="mx-2">{">"}</span>

            {/* Sejarah */}
            <Link to="/sejarah" className="hover:text-blue-800 font-semibold">
              Sejarah Sekolah
            </Link>

            {/* Visi Misi (active) */}
            <span className="text-blue-800 font-semibold">Visi Misi</span>

            <Link to="/fasilitas" className="hover:text-blue-800 font-semibold">
              Fasilitas sekolah
            </Link>
          </div>
        </div>

        {/* VISI SECTION */}
        <section className="text-center py-20 px-6">
          <h2 className="text-5xl font-semibold mb-4">Visi</h2>
          {loading ? (
            <div className="max-w-3xl mx-auto space-y-3 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-full mx-auto" />
              <div className="h-6 bg-slate-200 rounded w-5/6 mx-auto" />
              <div className="h-6 bg-slate-200 rounded w-4/6 mx-auto" />
            </div>
          ) : (
            <p className="max-w-3xl text-3xl mx-auto text-black-700 leading-relaxed font-semibold">
              {data?.visi || "Data visi belum tersedia."}
            </p>
          )}
        </section>

        {/* MISI SECTION */}
        <section className="relative -mt-2">
          {/* Lengkungan (bagian atas Misi) */}
          <div className="flex">
            <div className="bg-blue-dark h-16 w-[70%] rounded-tr-[120px]"></div>
            <div className="bg-blue-dark h-16 w-[30%] rounded-tl-[120px]"></div>
          </div>

          {/* ISI MISI */}
          <div className="bg-blue-dark text-white pt-10 pb-16 px-6">
            <h2 className="text-5xl font-semibold text-center mb-12">Misi</h2>

            {loading ? (
              <div className="max-w-4xl ml-10 space-y-10 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-16">
                    <div className="w-16 h-16 bg-gray-500 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-500 rounded w-full" />
                      <div className="h-6 bg-gray-500 rounded w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : misiLines.length > 0 ? (
              <div className="max-w-full px-4 lg:px-10 ml-2 lg:ml-10 space-y-10">
                {misiLines.map((misi, i) => (
                  <div key={i} className="flex items-start gap-16">
                    <span className="text-5xl lg:text-7xl font-bold text-gray-300 w-16">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-2xl">{misi}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-full ml-10 space-y-10">
                {/* Fallback ke konten statis jika data kosong */}
                {[
                  "Membentuk peserta didik menjadi manusia yang seutuhnya, beriman, unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael",
                  "Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi",
                  "Mewujudkan lingkungan berwawasan IPTEK",
                  "Menciptakan sekolah sehat, bersih dan nyaman",
                ].map((misi, i) => (
                  <div key={i} className="flex items-start gap-16">
                    <span className="text-7xl font-bold text-gray-300 w-16">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-2xl">{misi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default VisiMisiPage;
