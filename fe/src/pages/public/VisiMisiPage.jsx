import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { Link } from "react-router";

function VisiMisiPage() {
  return (
    <PublicLayout>
      <main>
        <section className="w-full bg-blue-900 text-white rounded-b-3xl py-6 px-6 md:px-10 mb-8">
          <h2 className="text-xl md:text-2xl font-bold">Visi dan Misi</h2>
        </section>
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="flex items-center gap-7 text-sm text-gray-500">
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
            <span className="text-blue-800 font-semibold">Visi dan Misi</span>

            <Link to="/fasilitas" className="hover:text-blue-800 font-semibold">
              Fasilitas sekolah
            </Link>
          </div>
        </div>
        <section className="text-center py-16 px-6">
          <h2 className="text-4xl font-semibold mb-4">Visi</h2>
          <p className="max-w-3xl text-2xl mx-auto text-black-700 leading-relaxed font-semibold">
            Membentuk peserta didik menjadi manusia yang seutuhnya, beriman,
            unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael
          </p>
        </section>
        <section className="relative bg-blue-950 text-white pt-24 pb-16 px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">Misi</h2>

          <div className="max-w-4xl ml-10 space-y-10">
            <div className="flex items-start gap-16">
              <span className="text-7xl font-bold text-gray-300 w-16">01</span>
              <p className="text-2xl">
                Membentuk peserta didik menjadi manusia yang seutuhnya, beriman,
                unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael
              </p>
            </div>

            <div className="flex items-start gap-16">
              <span className="text-7xl font-bold text-gray-300 w-16">02</span>
              <p className="text-2xl">
                Meningkatkan profesionalisme tenaga pendidik dan kependidikan
                dengan etos kerja tinggi
              </p>
            </div>

            <div className="flex items-start gap-16">
              <span className="text-7xl font-bold text-gray-300 w-16 gap">
                03
              </span>
              <p className="text-2xl">Mewujudkan lingkungan berwawasan IPTEK</p>
            </div>

            <div className="flex items-start gap-16">
              <span className="text-7xl font-bold text-gray-300 w-16">04</span>
              <p className="text-2xl">
                Menciptakan sekolah sehat, bersih dan nyaman
              </p>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

export default VisiMisiPage;
