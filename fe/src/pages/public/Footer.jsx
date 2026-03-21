import { Mail, Phone,} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-200 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-10 md:px-16">
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* KOLOM 1 */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-black">
              SMP Katolik St. Rafael Manado
            </h2>
            <p className="text-sm text-black">
              Mendidik generasi beriman, berkarakter, dan berprestasi untuk masa
              depan yang lebih baik.
            </p>
          </div>

          {/* KOLOM 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-black">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-white cursor-pointer">Beranda</li>
              <li className="hover:text-white cursor-pointer">Tentang</li>
              <li className="hover:text-white cursor-pointer">Prestasi</li>
              <li className="hover:text-white cursor-pointer">Berita</li>
            </ul>
          </div>

          {/* KOLOM 3 */}
          <div>
            <h3 className="font-semibold mb-4 text-black">Kontak</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <Mail size={16} color="#3b82f6" />{" "}
                <span className="text-blue-500">info@sekolah.sch.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span className="text-gray-500">0821-xxxx-xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram size={16} className="text-pink-500" />
                <span className="text-pink-500">@smprafael</span>
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook size={16} className="text-blue-700" />
                <span className="text-blue-700">SMP Rafael</span>
              </li>
              <li className="flex items-center gap-2">
                <FaYoutube size={16} className="text-red-600" />
                <span className="text-red-600">SMP Rafael Channel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* GARIS */}
        <div className="border-t border-blue-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SMP Katolik St. Rafael Manado. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
