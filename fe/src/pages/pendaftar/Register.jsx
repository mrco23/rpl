import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ApplicantRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nisn: "",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    noHp: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 hover:text-blue-800 transition"
          >
            <IoArrowBackSharp className="text-lg" />
          </button>
        </div>
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">PENDAFTARAN</h1>
        <p className="text-slate-600 mb-6">
          Silakan lengkapi biodata calon siswa dan buat akun untuk memproses
          pendaftaran.
        </p>

        {/* Stepper */}
        <div className="flex items-center mb-6 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
              1
            </div>
            <span className="mt-2 text-sm font-semibold text-center">
              Identitas calon siswa
            </span>

            {/* Garis horizontal pendek dari step 1 */}
            <div className="absolute left-full w-40 h-[2px] top-1/2 -translate-y-1/2 bg-gray-400">
              {/* 🔥 Progress biru */}
              <div
                className={`h-full bg-blue-800 transition-all duration-500 ${
                  step === 1 ? "w-0" : step === 2 ? "w-[90%]" : "w-full"
                }`}
              ></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center ml-40">
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 font-bold">
              2
            </div>
            <span className="mt-2 text-sm text-gray-400 font-semibold text-center">
              Buat Akun
            </span>
          </div>
        </div>

        {/* Catatan penting */}
        <div className="bg-yellow-100 p-4 rounded-lg mb-6 items-start gap-3">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <div className="w-6 h-6 rounded-full bg-yellow-300 text-yellow-800 flex items-center justify-center font-bold">
              i
            </div>
            <h3 className="font-bold text-black-800 text-sm">
              Catatan Penting
            </h3>
          </div>

          <ul className="list-disc ml-2 text-slate-700">
            <li>
              Isi data diri calon siswa secara benar dan sesuai dokumen resmi
              (KK/Ijazah).
            </li>
            <li>Pastikan nomor HP aktif dan dapat dihubungi.</li>
            <li>
              Simpan NISN dan password baik-baik karena akan digunakan untuk
              login selama proses PPDB berlangsung.
            </li>
          </ul>
        </div>

        {/* Form Step 1 */}
        {step === 1 && (
          <form className="space-y-6">
            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block mb-1 font-semibold">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  placeholder="Isi nama lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* NISN */}
              <div>
                <label className="block mb-1 font-semibold">
                  NISN <span className="text-red-500">*</span>
                </label>
                <input
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  placeholder="Isi NISN"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Alamat Domisili */}
              <div>
                <label className="block mb-1 font-semibold">
                  Alamat Domisili <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Isi alamat lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Tanggal Lahir + Tempat Lahir + Jenis Kelamin + Nomor HP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tempat Lahir */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="tempatLahir"
                    value={formData.tempatLahir}
                    onChange={handleChange}
                    placeholder="Isi Tempat Lahir"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none h-12"
                  />
                </div>

                {/* Tanggal Lahir + Icon Kiri */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none h-12"
                  />
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none h-12"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                {/* Nomor HP */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Nomor Handphone (WhatsApp){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleChange}
                    placeholder="08xx..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none h-12"
                  />
                </div>
              </div>
            </div>

            {/* Informasi Orang Tua/Wali */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-2">
                Informasi Orang Tua/Wali
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Lengkapi form bertanda bintang{" "}
                <span className="text-red-500">*</span> karena wajib diisi.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold">
                    Nama Orangtua/Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="namaWali"
                    value={formData.namaWali}
                    onChange={handleChange}
                    placeholder="Isi Nama Lengkap OrangTua/Wali"
                    className="w-full px-4 py-3 border border-gray-300   rounded-xl focus:border-blue-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    Alamat Email Orangtua/Wali{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="emailWali"
                    value={formData.emailWali}
                    onChange={handleChange}
                    placeholder="Isi Alamat Email OrangTua/Wali"
                    className="w-full px-4 py-3 border border-gray-300   rounded-xl focus:border-blue-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Tombol Lanjut */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 border-[#350d85] bg-[#544dd8]  text-white rounded-md hover:bg-blue-800 transition"
              >
                LANJUT →
              </button>
            </div>
          </form>
        )}
        {/* Form Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Judul */}
            <div>
              <h2 className="text-lg font-semibold">Buat Kata Sandi Akun</h2>
              <p className="text-sm text-gray-600">
                Buat password yang kuat untuk menjaga privasi data Anda.
              </p>
            </div>

            {/* NISN */}
            <div>
              <label className="block mb-1 font-semibold">
                Nama Pengguna (NISN)
              </label>
              <input
                value={formData.nisn}
                disabled
                className="w-full px-4 py-3 bg-gray-200 rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                NISN akan otomatis digunakan sebagai username.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl  focus:border-blue-400 focus:outline-none"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block mb-1 font-semibold">
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Ulangi kata sandi"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl  focus:border-blue-700 focus:outline-none"
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-12 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-10 py-3 bg-gray-300 rounded-md"
              >
                ← Kembali
              </button>

              <button className="px-10 py-3 border border-[#350d85] bg-[#544dd8] text-white rounded-md">
                Selesaikan
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
