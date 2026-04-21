import React, { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { requestAPI } from "../../services/api.js";
import { waveApi } from "../../services/waveService.js";

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
    asalSekolah: "",
    namaWali: "",
    emailWali: "",
  });

  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [gelombangLoading, setGelombangLoading] = useState(true);
  const [gelombangAktif, setGelombangAktif] = useState(null);

  useEffect(() => {
    const checkGelombang = async () => {
      setGelombangLoading(true);
      try {
        const data = await waveApi.getActiveWave();
        setGelombangAktif(data || null);
      } catch {
        setGelombangAktif(null);
      } finally {
        setGelombangLoading(false);
      }
    };
    checkGelombang();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Validasi step 1
    if (
      !formData.namaLengkap ||
      !formData.alamat ||
      !formData.jenisKelamin ||
      !formData.noHp ||
      !formData.asalSekolah
    ) {
      setError("Harap lengkapi semua field wajib.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Kata sandi wajib diisi.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        nama_lengkap: formData.namaLengkap,
        nisn: formData.nisn || undefined,
        alamat: formData.alamat,
        tempat_lahir: formData.tempatLahir || undefined,
        tanggal_lahir: formData.tanggalLahir || undefined,
        jenis_kelamin: formData.jenisKelamin,
        no_hp: formData.noHp,
        asal_sekolah: formData.asalSekolah,
        email: formData.emailWali || undefined,
        nama_wali: formData.namaWali || undefined,
        kata_sandi: password,
      };

      await requestAPI({
        method: "POST",
        url: "/pendaftar/register",
        data: payload,
      });

      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || err.error || "Gagal melakukan registrasi. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Dynamic Display based on wave status */}
        {gelombangLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ) : !gelombangAktif ? (
          <div className="bg-white rounded-xl border border-red-200 shadow-sm p-10 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Pendaftaran Belum Dibuka</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Mohon maaf, saat ini tidak ada gelombang pendaftaran (PPDB) yang sedang aktif. 
              Silakan pantau informasi terbaru di halaman beranda atau hubungi pihak sekolah.
            </p>
            <button
               onClick={() => navigate("/")}
               className="px-8 py-3 bg-[#274ac0] text-white rounded-xl font-semibold hover:bg-[#2343ad] transition shadow-md"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <>
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
                  {/* Progress biru */}
                  <div
                    className={`h-full bg-blue-800 transition-all duration-500 ${
                      step === 1 ? "w-0" : step === 2 ? "w-[90%]" : "w-full"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center ml-40">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-800 text-white border-blue-800' : 'border-gray-300 text-gray-400'}`}>
                  2
                </div>
                <span className={`mt-2 text-sm font-semibold text-center ${step >= 2 ? 'text-blue-800' : 'text-gray-400'}`}>
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

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form Step 1 */}
        {step === 1 && (
          <form className="space-y-6" onSubmit={handleNext}>
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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* NISN */}
              <div>
                <label className="block mb-1 font-semibold">
                  NISN
                </label>
                <input
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  placeholder="Isi NISN (opsional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Asal Sekolah */}
              <div>
                <label className="block mb-1 font-semibold">
                  Asal Sekolah <span className="text-red-500">*</span>
                </label>
                <input
                  name="asalSekolah"
                  value={formData.asalSekolah}
                  onChange={handleChange}
                  placeholder="Isi asal sekolah"
                  required
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
                  required
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

                {/* Tanggal Lahir */}
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
                    required
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
                    required
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
                type="submit"
                className="
    px-6 py-2 bg-[#274ac0] text-white rounded-md 
    hover:bg-[#2343ad] 
    transition-all duration-300 
    flex items-center gap-2 group cursor-pointer
  "
              >
                <span className="flex items-center gap-2">
                  LANJUT
                  <ArrowRight
                    size={14}
                    className="
        transition-transform duration-300
        group-hover:translate-x-1
      "
                  />
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Form Step 2 */}
        {step === 2 && (
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.nisn || "(tidak diisi)"}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                required
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl  focus:border-blue-700 focus:outline-none"
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-12 mt-6">
              <button
                type="button"
                onClick={() => { setStep(1); setError(""); }}
                className="px-10 py-2 bg-gray-300 rounded-md"
              >
                ← Kembali
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-10 py-2 border border-[#274ac0] bg-[#274ac0] hover:bg-[#2343ad] text-white rounded-md disabled:opacity-50"
              >
                {submitting ? "Mendaftarkan..." : "Selesaikan"}
              </button>
            </div>
          </form>
        )}
          </>
        )}
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Akun Anda telah berhasil dibuat. Silakan login menggunakan NISN dan password yang telah dibuat.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-[#274ac0] text-white rounded-xl font-semibold hover:bg-[#2343ad] transition"
            >
              Pergi ke Halaman Login
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
