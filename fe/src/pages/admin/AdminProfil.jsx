import React from "react";
import { Pencil, Upload } from "lucide-react";

function AdminProfil() {
  const schoolProfile = {
    schoolName: "SMP Katolik St. Rafael Manado",
    address: "Jl. jalan nomor keberpaa ...",
    vision:
      "Membentuk peserta didik menjadi manusia yang seutuhnya, beriman, unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael.",
    mission:
      "Membentuk peserta didik menjadi manusia yang seutuhnya, beriman, unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael.",
  };

  const principalProfile = {
    name: "Marcois Makalew",
    greeting: "Selamat datang....",
  };

  const contactProfile = {
    phone: "+62",
    email: "contoh@gmail.com",
  };

  return (
  <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
    
    {/* WRAPPER BIAR RAPI SEPERTI MOCKUP */}
    <div className="w-full max-w-6xl flex flex-col gap-4">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Profil Sekolah
        </h1>
        <p className="text-sm text-gray-600">
          Lorem Ipsum dolor lorem ipsum dolor gipsum
        </p>
      </div>

      {/* GRID TOP */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-stretch">

        {/* INFORMASI SEKOLAH */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-3 flex flex-col h-full">
          <CardHeader title="Informasi Sekolah" />

          <div className="space-y-2 flex-1">
            <InputField label="Nama Sekolah" value={schoolProfile.schoolName} />

            <TextAreaField label="Alamat Sekolah" value={schoolProfile.address} rows={1} />

            <TextAreaField label="Visi" value={schoolProfile.vision} rows={1} />

            <TextAreaField label="Misi" value={schoolProfile.mission} rows={1} />
          </div>
        </div>

        {/* LOGO */}
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col h-full justify-between">
          <div>
            <h2 className="font-semibold text-sm">Logo Sekolah</h2>
            <p className="text-xs text-gray-500 mb-3">
              Unggah logo resmi sekolah
            </p>
          </div>

          <div className="border-2 border-dashed border-blue-300 rounded-xl h-40 flex items-center justify-center bg-blue-50">
            <Upload size={28} className="text-blue-500" />
          </div>

          <button className="mt-3 bg-blue-800 text-white py-2 rounded-lg text-sm">
            Unggah
          </button>
        </div>
      </div>

      {/* GRID BOTTOM */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">

        {/* KEPALA SEKOLAH */}
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col h-full">
          <CardHeader title="Kepala Sekolah" />

          <div className="space-y-2 flex-1">
            <InputField
              label="Nama Kepala Sekolah"
              value={principalProfile.name}
            />

            <TextAreaField
              label="Sambutan"
              value={principalProfile.greeting}
              rows={2}
            />
          </div>
        </div>

        {/* KONTAK */}
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col h-full">
          <CardHeader title="Kontak Sekolah" />

          <div className="space-y-2 flex-1">
            <InputField label="Nomor Telepon" value={contactProfile.phone} />
            <InputField label="Email" value={contactProfile.email} />
          </div>
        </div>

      </div>

    </div>
  </div>
);
    
}

/* ================= HEADER CARD ================= */
function CardHeader({ title }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
      <h2 className="font-semibold text-slate-700 text-sm uppercase">
        {title}
      </h2>

      <button className="bg-blue-800 hover:bg-blue-900 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
        <Pencil size={14} />
        Ubah
      </button>
    </div>
  );
}

/* ================= INPUT ================= */
function InputField({ label, value }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>

      <input
        type="text"
        value={value}
        readOnly
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
      />
    </div>
  );
}

/* ================= TEXTAREA ================= */
function TextAreaField({ label, value, rows }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>

      <textarea
        value={value}
        readOnly
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 resize-none"
      />
    </div>
  );
}

export default AdminProfil;
