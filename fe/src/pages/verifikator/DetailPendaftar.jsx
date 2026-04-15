import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

function DetailPendaftarPage() {
  const navigate = useNavigate();
  const { nisn } = useParams();

  const data = {
    nama: "Elegantia Makarawung",
    nisn: nisn,
    nik: "00812345",
    tempat: "Manado",
    tglLahir: "2006-04-24",
    jk: "Perempuan",
    ortu: "Ayah",
    hubungan: "Orang Tua",
    pekerjaan: "PNS",
    hp: "08123456789",
    alamat: "Jl. Contoh",
    kelurahan: "Kel A",
    kecamatan: "Kec B",
    kota: "Manado",
    provinsi: "Sulut",
  };

  return (
    <div className="p-7 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Lihat Data Lengkap</h2>
          <p className="text-sm text-gray-500">
            Informasi lengkap pendaftar untuk keperluan verifikasi
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className=" border px-4 py-1 rounded-lg text-blue-300 bg-gray-100"
        >
          X
        </button>
      </div>

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-sm mt-5 flex justify-between items-center">
        {/* KIRI */}
        <div className="flex items-center gap-4">
          {/* ICON */}
          <FaUserCircle className="text-4xl text-yellow-600" />

          {/* TEXT */}
          <div>
            <h3 className="font-semibold">{data.nama}</h3>
            <p className="text-sm text-gray-600">NISN: {data.nisn}</p>
            <p className="text-sm text-gray-600">Mendaftar: 24 Apr 2026</p>
          </div>
        </div>

        {/* KANAN */}
        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full h-fit">
          Sedang Diperiksa
        </span>
      </div>

      {/* BIODATA */}
      <Section title="BIODATA SISWA">
        <Item label="Nama Lengkap" value={data.nama} />
        <Item label="NISN" value={data.nisn} />
        <Item label="NIK" value={data.nik} />
        <Item label="Tempat Lahir" value={data.tempat} />
        <Item label="Tanggal Lahir" value={data.tglLahir} />
        <Item label="Jenis Kelamin" value={data.jk} />
      </Section>

      {/* ORTU */}
      <Section title="DATA ORANG TUA / WALI">
        <Item label="Nama Orang Tua" value={data.ortu} />
        <Item label="Hubungan" value={data.hubungan} />
        <Item label="Pekerjaan" value={data.pekerjaan} />
        <Item label="No HP" value={data.hp} />
      </Section>

      {/* WALI */}
      <Section title="WALI (JIKA ADA)">
        <Item label="Nama" value={data.ortu} />
        <Item label="Hubungan" value={data.hubungan} />
        <Item label="No.HP" value={data.hp} />
      </Section>

      {/* ALAMAT */}
      <Section title="ALAMAT / DOMISILI">
        <Item label="Alamat" value={data.alamat} />
        <Item label="Kelurahan" value={data.kelurahan} />
        <Item label="Kecamatan" value={data.kecamatan} />
        <Item label="Kota" value={data.kota} />
        <Item label="Provinsi" value={data.provinsi} />
      </Section>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Item = ({ label, value }) => (
  <div className="flex text-sm">
    <div className="w-40">{label}</div>
    <div>: {value}</div>
  </div>
);

export default DetailPendaftarPage;
