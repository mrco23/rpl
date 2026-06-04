import React from "react";
import { Link, useLocation } from "react-router";

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl mb-10">
      <div className="inline-flex px-4 py-1 rounded-full bg-yellow-light text-yellow-dark font-semibold text-sm mb-4">{eyebrow}</div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">{title}</h2>
      <p className="text-slate-600 leading-8">{description}</p>
    </div>
  );
}

export function ImageCard({ image, title, description, extra }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] group">
      <div className="overflow-hidden h-56 bg-slate-100">
        <img src={image || "https://placehold.co/1200x800?text=No+Image"} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <div className="text-slate-600 leading-7" dangerouslySetInnerHTML={{ __html: description }} />
        {extra}
      </div>
    </div>
  );
}

export function StatCard({ label, value, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-light text-slate-900",
    yellow: "bg-yellow-light text-yellow-dark-active",
    dark: "bg-blue-dark text-white",
  };

  return (
    <div className={`rounded-[24px] p-6 ${tones[tone]} border border-white/20 shadow-[0_20px_45px_var(--color-blue-normal)_/12%]`}>
      <div className="text-sm font-semibold opacity-80 mb-2">{label}</div>
      <div className="text-4xl font-extrabold">{value}</div>
    </div>
  );
}

export function TableWrapper({ headers, children, actions }) {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="text-lg font-bold text-slate-900">Daftar Data</div>
        {actions}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[760px]">
          <thead className="bg-blue-dark text-white">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 text-sm font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function PublicNavbar({ profile }) {
  const location = useLocation();
  const links = [
    ["/", "Beranda"],
    ["/ekstrakurikuler", "Ekstrakurikuler"],
    ["/prestasi", "Prestasi"],
    ["/fasilitas", "Fasilitas"],
    ["/berita", "Berita"],
    ["/panduan", "Panduan"],
  ];

  return (
    <header className="sticky top-0 z-40 bg-blue-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={profile?.logo || "https://placehold.co/96x96?text=Logo"} alt="logo" className="w-11 h-11 rounded-full object-cover border-2 border-white/40" />
            <div className="font-bold text-lg leading-tight">{profile?.nama_sekolah || "Website Sekolah"}</div>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {links.map(([to, label]) => (
              <Link key={to} to={to} className={`transition hover:text-yellow-light-active ${location.pathname === to ? "text-yellow-normal" : ""}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-xl border border-white/30 hover:bg-white/10">Login</Link>
            <Link to="/register" className="px-4 py-2 rounded-xl bg-yellow-normal text-yellow-dark-darker font-bold">Daftar PPDB</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer({ profile }) {
  const whatsapp = String(profile?.whatsapp || profile?.no_telpon || "").replace(/[^\d]/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  return (
    <footer className="bg-blue-dark-darker text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-3">{profile?.nama_sekolah || "Website Sekolah"}</h3>
          <p className="text-blue-100 text-sm leading-7">Sekolah unggul dengan layanan PPDB digital yang efektif, transparan, dan ramah pengguna.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <div className="text-blue-100 text-sm leading-7">
            <p>{profile?.alamat || "Alamat belum tersedia"}</p>
            <p>{profile?.no_telpon || "Nomor telepon belum tersedia"}</p>
            <p>{profile?.email || "Email belum tersedia"}</p>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex mt-2 text-yellow-normal font-semibold hover:underline">
                Hubungi via WhatsApp
              </a>
            )}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Media Sosial</h4>
          <p className="text-blue-100 text-sm leading-7 whitespace-pre-line">{profile?.media_sosial || "Media sosial belum tersedia"}</p>
        </div>
      </div>
    </footer>
  );
}