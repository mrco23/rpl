import React from "react";
import {
  GraduationCap,
  Users,
  Phone,
  ShieldCheck,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

function BerandaPendaftar() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Biodata Calon Siswa
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Data berikut diambil saat pendaftaran akun. Sebagian data dapat
            diubah pada bagian kontak.
          </p>
        </div>

        <div className="bg-indigo-100 text-[#2443a8] px-4 py-3 rounded-xl text-sm max-w-xs">
          <p className="font-medium">ⓘ Data inti tidak dapat diubah.</p>
          <p className="text-xs mt-1">
            Ajukan perubahan jika ada kesalahan.
          </p>
        </div>
      </div>

      {/* DATA SISWA */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <GraduationCap size={18} className="text-[#2443a8]" />
          <h2 className="font-bold text-gray-800 uppercase text-lg">
            Data Siswa
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Field label="NISN" value="0081234567" />
          <Field label="Nama Lengkap" value="Budi Santoso" />
          <Field
            label="Tempat, Tanggal Lahir"
            value="Manado, 12 Mei 2011"
            icon={<CalendarDays size={16} />}
          />

          <Field label="Jenis Kelamin" value="Laki-Laki" />
          <Field label="Domisili" value="Kota Manado" />
          <Field
            label="Alamat Lengkap"
            value="Jl. Sam Ratulangi No. 123, Manado"
          />
        </div>
      </div>

      {/* DATA ORTU */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Users size={18} className="text-[#2443a8]" />
          <h2 className="font-bold text-gray-800 uppercase text-lg">
            Data Orang Tua / Wali
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Nama Orang Tua / Wali" value="Reins Orlando Maindjanga" />
          <Field
            label="Alamat Email Orang Tua / Wali"
            value="xxx@email.com"
          />
        </div>
      </div>

      {/* DATA KONTAK */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Phone size={18} className="text-[#2443a8]" />
          <h2 className="font-bold text-gray-800 uppercase text-lg">
            Data Kontak
            <span className="text-sm font-medium text-blue-800 ml-2">
              (dapat diedit)
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="No. HP" value="0812-3456-7890" />
          <Field label="Alamat Email" value="xxxx@email.com" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="space-y-4">
        <div className="bg-indigo-100 rounded-xl px-4 py-4 flex items-start gap-3 max-w-xl">
          <ShieldCheck size={20} className="text-[#2443a8] mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Pastikan data yang Anda masukkan sudah benar.
            </p>
            <p className="text-xs text-gray-500">
              Data ini akan digunakan selama proses PPDB.
            </p>
          </div>
        </div>

        <button className="bg-[#2443a8] hover:bg-[#1b3488] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition">
          SELANJUTNYA
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* COMPONENT FIELD */
function Field({ label, value, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="bg-slate-200 rounded-lg px-4 py-3 text-sm text-gray-800 flex items-center justify-between">
        <span>{value}</span>
        {icon}
      </div>
    </div>
  );
}

export default BerandaPendaftar;