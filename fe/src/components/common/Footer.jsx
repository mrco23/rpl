import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

function Footer({ profile }) {
  const whatsapp = String(
    profile?.whatsapp || profile?.no_telpon || "",
  ).replace(/[^\d]/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  return (
    <footer className="bg-blue-200 text-black pt-16 pb-8">
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
                className="hover:opacity-80"
              >
                <FaInstagram size={20} className="text-pink-500" />
              </a>
              <a
                href={profile?.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                <FaFacebook size={20} className="text-blue-700" />
              </a>
              <a
                href={profile?.youtube || "#"}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                <FaYoutube size={20} className="text-red-600" />
              </a>
            </div>
          </div>

          {/* KOLOM 2: Menu */}
          <div className="md:ml-10">
            <h3 className="font-semibold mb-4 text-center">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-600 text-center">
              {["Tentang", "Akademik", "SPMB", "Berita"].map((item) => (
                <li key={item} className="hover:text-black cursor-pointer">
                  {item}
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
