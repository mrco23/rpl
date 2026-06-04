import React from 'react'
import { Link } from 'react-router'

function NavbarAbout({ location }) {
  return (
    <div className=" px-10 text-sm text-gray-600 hidden sm:flex gap-10">
      <span className="text-black font-semibold">Tentang</span>
      <p className="font-semibold">{">"}</p>
      <Link to="/sejarah" className={`hover:text-blue-800 font-semibold ${location === "sejarah" ? "text-blue-800" : ""}`}>
        Sejarah Sekolah
      </Link>
      <Link to="/visi-misi" className={`hover:text-blue-800 font-semibold ${location === "visi-misi" ? "text-blue-800" : ""}`}>
        Visi Misi
      </Link>

      <Link to="/fasilitas" className={`hover:text-blue-800 font-semibold ${location === "fasilitas" ? "text-blue-800" : ""}`}>
        Fasilitas sekolah
      </Link>
    </div>
  )
}

export default NavbarAbout