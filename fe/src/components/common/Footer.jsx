import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Footer({ profile }) {
  const menu = [
    { name: "Tentang", path: "/sejarah" },
    { name: "Akademik", path: "/program" },
    { name: "SPMB", path: "/panduan" },
    { name: "Berita", path: "/berita" },
  ];
  const whatsapp = String(
    profile?.whatsapp || profile?.no_telpon || "",
  ).replace(/[^\d]/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  return (
    <footer className="bg-[#dfe4f6] text-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* KOLOM 1: Tentang Sekolah + Ikon Sosial */}
          <div>
            <h2 className="text-lg font-bold mb-2">
              {profile?.nama_sekolah || "Website Sekolah"}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {profile?.deskripsi ||
                "Mendidik generasi beriman, berkarakter, dan berprestasi untuk masa depan yang lebih baik."}
            </p>

            {/* IKON SOSIAL DI BAWAH DESKRIPSI */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={profile?.instagram || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center border border-[#7b8ccc] rounded-lg text-[#7b8ccc] hover:bg-[#7b8ccc] hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={profile?.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center border border-[#7b8ccc] rounded-lg text-[#7b8ccc] hover:bg-[#7b8ccc] hover:text-white transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={profile?.youtube || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center border border-[#7b8ccc] rounded-lg text-[#7b8ccc] hover:bg-[#7b8ccc] hover:text-white transition"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: Menu */}
          <div className="md:ml-10">
            <h3 className="font-semibold mb-4 text-center">Menu</h3>
            <ul className="space-y-2 text-sm text-center">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-black transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Kontak */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3  text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                <span>{profile?.email || "info@sekolah.sch.id"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-600" />
                <span>{profile?.no_telpon || "0821-xxxx-xxxx"}</span>
              </li>
              {whatsappHref && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-green-600" />
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Hubungi via WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* GARIS */}
        <div className="border-t border-gray-400 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()}{" "}
          {profile?.nama_sekolah || "Website Sekolah"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
