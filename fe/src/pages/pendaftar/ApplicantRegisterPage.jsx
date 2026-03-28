import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { Check, ChevronRight, Info, CheckCircle2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ApplicantRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const [formData, setFormData] = useState({
    nik: "",
    nisn: "",
    namaLengkap: "",
    alamat: "",
    asalSekolah: "",
    jenisKelamin: "",
    noHp: "",
    tempatLahir: "",
    tanggalLahir: "",
    namaAyah: "",
    namaIbu: "",
    tahunAjaran: "2026/2027",
    email: "",
    namaWali: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStep1Valid = () => {
    const required = [
      "nik", "nisn", "namaLengkap", "alamat", "asalSekolah", 
      "jenisKelamin", "noHp", "tempatLahir", "tanggalLahir", 
      "namaAyah", "namaIbu", "tahunAjaran"
    ];
    return required.every(field => formData[field]?.trim() !== "");
  };

  const isStep2Valid = () => {
    return (
      formData.password.length >= 6 && 
      formData.password === formData.confirmPassword
    );
  };

  const handleNext = () => {
    if (isStep1Valid()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStep2Valid()) {
      setSubmitting(true);
      // Simulate API call and success
      setTimeout(() => {
        setRegistrationNumber("PPDB-2026-" + Math.floor(1000 + Math.random() * 9000));
        setIsSuccess(true);
        setSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isSuccess) {
    return (
      <PublicLayout hideFooter>
        <main className="min-h-screen bg-slate-50 py-16 px-4 flex justify-center items-center">
          <div className="w-full max-w-lg bg-white rounded-[32px] p-10 md:p-14 shadow-[0_20px_45px_var(--color-blue-normal)_/8%] border border-slate-100 text-center">
            <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Pendaftaran Berhasil!</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Selamat, data Anda telah tersimpan. Silakan simpan nomor pendaftaran di bawah ini untuk referensi Anda.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
              <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Nomor Pendaftaran</p>
              <p className="text-3xl font-black text-blue-normal tracking-tight">{registrationNumber}</p>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-6 mb-10 text-left border border-blue-100/50">
              <h3 className="font-semibold text-blue-dark mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2" /> Informasi Penting
              </h3>
              <ul className="text-sm text-blue-dark/80 space-y-2 ml-7 list-disc">
                <li>Gunakan <b>NISN</b> sebagai username untuk login ke portal PPDB Anda.</li>
                <li>Gunakan password yang baru saja Anda buat.</li>
                <li>Lengkapi seluruh dokumen yang dipersyaratkan setelah login.</li>
              </ul>
            </div>

            <button 
              onClick={handleBackToLogin}
              className="w-full py-4 rounded-2xl bg-blue-dark text-white font-bold text-lg hover:bg-blue-dark-hover transition-colors shadow-lg shadow-blue-dark/20"
            >
              Lanjutkan ke Halaman Login
            </button>
          </div>
        </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout hideFooter hideNav>
      <main className="min-h-screen bg-slate-50 py-10 md:py-16 px-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors mb-6 shadow-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              FORMULIR PENDAFTARAN
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Silakan lengkapi biodata calon siswa dan buat akun untuk memproses pendaftaran.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex justify-center items-center mb-10">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${step >= 1 ? 'bg-blue-dark text-white border-blue-dark' : 'bg-white text-slate-400 border-slate-200'}`}>
                1
              </div>
              <div className="ml-4 mr-6">
                <p className={`font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Biodata</p>
                <p className="text-sm text-slate-500">Informasi Diri Siswa</p>
              </div>
            </div>
            
            <div className={`w-16 md:w-32 h-[2px] ${step >= 2 ? 'bg-blue-dark' : 'bg-slate-200'} mx-2`}></div>
            
            <div className="flex items-center ml-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${step >= 2 ? 'bg-blue-dark text-white border-blue-dark' : 'bg-white text-slate-400 border-slate-200'}`}>
                2
              </div>
              <div className="ml-4">
                <p className={`font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Buat Akun</p>
                <p className="text-sm text-slate-500">Keamanan Akses</p>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[40px] shadow-[0_20px_45px_var(--color-blue-normal)_/6%] border border-slate-100 p-8 md:p-12">
            
            {/* Notes Card */}
            <div className="bg-yellow-light/50 border border-yellow-normal/30 rounded-3xl p-6 md:p-8 mb-12 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-normal/20 flex-shrink-0 flex items-center justify-center">
                <Info className="w-6 h-6 text-yellow-dark-darker" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">Catatan Penting</h4>
                <ul className="text-slate-700 space-y-2 list-disc ml-5 leading-relaxed">
                  <li>Isi data diri calon siswa secara benar dan sesuai dengan dokumen resmi (Kartu Keluarga / Ijazah).</li>
                  <li>Pastikan nomor HP aktif dan dapat dihubungi.</li>
                  <li>Simpan NISN dan password baik-baik karena akan digunakan untuk login selama proses PPDB berlangsung.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
              
              {/* Step 1: Biodata */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Informasi Pribadi & Akademik</h3>
                    <p className="text-slate-500 mt-1">Lengkapi form bertanda bintang (*) karena wajib diisi.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">NIK <span className="text-red-500">*</span></label>
                      <input name="nik" value={formData.nik} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="16 digit NIK" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">NISN <span className="text-red-500">*</span></label>
                      <input name="nisn" value={formData.nisn} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Nomor Induk Siswa Nasional" required />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap Sesuai KK/Ijazah <span className="text-red-500">*</span></label>
                      <input name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Nama Lengkap Calon Siswa" required />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Domisili <span className="text-red-500">*</span></label>
                      <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows="3" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all resize-none" placeholder="Alamat lengkap tempat tinggal saat ini" required></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tempat Lahir <span className="text-red-500">*</span></label>
                      <input name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Kabupaten/Kota Tempat Lahir" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir <span className="text-red-500">*</span></label>
                      <input name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} type="date" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all text-slate-700" required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Jenis Kelamin <span className="text-red-500">*</span></label>
                      <select name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all text-slate-700" required>
                        <option value="" disabled>Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Handphone (WhatsApp) <span className="text-red-500">*</span></label>
                      <input name="noHp" value={formData.noHp} onChange={handleChange} type="tel" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="08xx..." required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Asal Sekolah <span className="text-red-500">*</span></label>
                      <input name="asalSekolah" value={formData.asalSekolah} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Nama Sekolah Sebelumnya (SMP/MTs)" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tahun Ajaran <span className="text-red-500">*</span></label>
                      <input name="tahunAjaran" value={formData.tahunAjaran} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 font-medium" readOnly />
                    </div>
                  </div>

                  <div className="mt-12 mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Informasi Orang Tua / Wali</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Ayah <span className="text-red-500">*</span></label>
                      <input name="namaAyah" value={formData.namaAyah} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Nama lengkap Ayah kandung" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Ibu <span className="text-red-500">*</span></label>
                      <input name="namaIbu" value={formData.namaIbu} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Nama lengkap Ibu kandung" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Wali (Opsional)</label>
                      <input name="namaWali" value={formData.namaWali} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Isi bila tinggal bersama wali" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Orang Tua / Wali (Opsional)</label>
                      <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Alamat email aktif" />
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
                    <button 
                      type="button" 
                      onClick={handleNext}
                      disabled={!isStep1Valid()}
                      className="px-8 py-4 rounded-2xl bg-blue-dark text-white font-bold text-lg hover:bg-blue-dark-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-dark/20"
                    >
                      Lanjutkan ke Step 2 <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Buat Akun */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto py-4">
                  <div className="mb-8 pb-4 text-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Buat Password Akun</h3>
                    <p className="text-slate-500 text-lg">Buat password yang kuat untuk menjaga privasi data Anda. <br/> NISN Anda akan digunakan sebagai username.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Username (NISN)</label>
                      <input type="text" value={formData.nisn} readOnly className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold cursor-not-allowed" />
                      <p className="text-xs text-slate-500 mt-2 ml-2">NISN akan otomatis digunakan sebagai username Anda.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Password Baru <span className="text-red-500">*</span></label>
                      <input name="password" value={formData.password} onChange={handleChange} type="password" minLength={6} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light transition-all" placeholder="Minimal 6 karakter" required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Konfirmasi Password <span className="text-red-500">*</span></label>
                      <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" minLength={6} className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:bg-white focus:border-blue-normal focus:ring-2 focus:ring-blue-light'}`} placeholder="Ulangi password di atas" required />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-500 text-sm mt-2 ml-2">Konfirmasi password tidak cocok dengan password baru.</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center"
                    >
                      Kembali Biodata
                    </button>
                    <button 
                      type="submit" 
                      disabled={!isStep2Valid() || submitting}
                      className="px-8 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-extrabold text-lg hover:bg-yellow-normal-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-yellow-normal/30"
                    >
                      {submitting ? "Memproses..." : "Selesaikan Pendaftaran"} <Check className="w-6 h-6 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </form>

          </div>
          
          <div className="mt-10 text-center text-slate-500 text-sm">
            Telah memiliki akun? <Link to="/login" className="text-blue-normal font-bold hover:underline">Login di sini</Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
