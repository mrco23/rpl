import img from "@assets/prestasi.jpg"; // ganti dengan gambar asli nanti
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { Link } from "react-router";

export default function AchievementsPage() {
  return (
    <PublicLayout>
      <section className="w-full bg-blue-900 text-white rounded-b-3xl py-8 px-6 md:px-10 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Prestasi siswa</h2>
      </section>
      <div className=" px-20 py-2 text-md text-gray-600 flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>

        <Link
          to="/ekstrakurikuler"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          ekstrakurikuler
        </Link>
        <Link
          to="/prestasi"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>
    </PublicLayout>
  );
}
