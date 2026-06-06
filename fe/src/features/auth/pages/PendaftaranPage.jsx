import React, { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import httpClient, { requestAPI } from "../../../services/httpClient.js";
import { waveApi } from "../../public-site/services/waveService.js";
import Toast from "../../../shared/components/Toast.jsx";

export default function ApplicantRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nisn: "",
    provinsi: "",
    kotaKabupaten: "",
    kecamatan: "",
    kelurahan: "",
    rtRw: "",
    kodePos: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    noHp: "",
    asalSekolah: "",
    namaWali: "",
    emailWali: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // State Toaster menggantikan state error
  const [toastConfig, setToastConfig] = useState({
    show: false,
    message: "",
    type: "success",
  });
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
    let value = e.target.value;
    if (e.target.name === "kodePos") {
      value = value.replace(/\D/g, "");
    }
    setFormData({ ...formData, [e.target.name]: value });
    // Remove error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    const d = {};

    // Trim string data
    Object.keys(formData).forEach((k) => {
      d[k] = typeof formData[k] === "string" ? formData[k].trim() : formData[k];
    });

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    const repeatRegex = /^(.)\1{4,}$/; // e.g. AAAAA

    // A. Nama Lengkap
    // Nama Lengkap
    if (!d.namaLengkap) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi.";
    } else if (
      d.namaLengkap.length < 3 ||
      d.namaLengkap.length > 100 ||
      !nameRegex.test(d.namaLengkap) ||
      repeatRegex.test(d.namaLengkap.replace(/\s/g, ""))
    ) {
      newErrors.namaLengkap =
        "Nama lengkap harus diisi dengan nama yang valid.";
    }

    // B. NISN
    if (!d.nisn) {
      newErrors.nisn = "NISN wajib diisi.";
    } else if (!/^\d{10}$/.test(d.nisn)) {
      newErrors.nisn = "NISN harus berisi 10 digit angka.";
    }

    // G. Asal Sekolah
    if (!d.asalSekolah) {
      newErrors.asalSekolah = "Asal sekolah wajib diisi.";
    } else if (
      /(SMA|SMK|MA\b|MAN\b|Paket C)/i.test(d.asalSekolah) ||
      !/(SD|MI|Sekolah Dasar)/i.test(d.asalSekolah)
    ) {
      newErrors.asalSekolah = "Asal sekolah harus berasal dari SD atau MI.";
    }

    // I. Alamat
    const alamatFields = {
      provinsi: "Provinsi",
      kotaKabupaten: "Kota/Kabupaten",
      kecamatan: "Kecamatan",
      kelurahan: "Kelurahan",
    };

    Object.keys(alamatFields).forEach((f) => {
      if (!d[f]) {
        newErrors[f] = `${alamatFields[f]} wajib diisi.`;
      } else if (
        d[f].length < 3 ||
        !nameRegex.test(d[f]) ||
        repeatRegex.test(d[f].replace(/\s/g, ""))
      ) {
        newErrors[f] = `${alamatFields[f]} tidak valid.`;
      }
    });

    // J. RT/RW
    if (!d.rtRw) {
      newErrors.rtRw = "RT/RW wajib diisi.";
    } else if (!/^\d{3}\/\d{3}$/.test(d.rtRw)) {
      newErrors.rtRw = "RT/RW harus menggunakan format 001/001.";
    }

    // K. Kode Pos
    if (!d.kodePos) {
      newErrors.kodePos = "Kode pos wajib diisi.";
    } else if (!/^\d+$/.test(d.kodePos)) {
      newErrors.kodePos = "Kode pos hanya boleh berisi angka.";
    }

    // Tempat Lahir
    if (!d.tempatLahir) {
      newErrors.tempatLahir = "Tempat lahir wajib diisi.";
    } else if (d.tempatLahir.length < 3 || !nameRegex.test(d.tempatLahir)) {
      newErrors.tempatLahir = "Tempat lahir tidak valid.";
    }

    // E. Tanggal Lahir
    if (!d.tanggalLahir) {
      newErrors.tanggalLahir = "Tanggal lahir wajib diisi.";
    } else {
      const birthDate = new Date(d.tanggalLahir);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (birthDate >= today) {
        newErrors.tanggalLahir = "Tanggal lahir tidak valid.";
      } else if (age < 11 || age > 30) {
        newErrors.tanggalLahir = "Pendaftar harus berusia minimal 11 tahun.";
      }
    }

    // F. Jenis Kelamin
    if (d.jenisKelamin !== "L" && d.jenisKelamin !== "P") {
      newErrors.jenisKelamin = "Jenis kelamin wajib dipilih.";
    }

    // D. Nomor HP
    if (!d.noHp) {
      newErrors.noHp = "Nomor handphone wajib diisi.";
    } else if (!/^(08|62)\d{8,13}$/.test(d.noHp)) {
      newErrors.noHp = "Nomor handphone tidak valid.";
    }

    // H. Nama Wali
    if (!d.namaWali) {
      newErrors.namaWali = "Nama orang tua/wali wajib diisi.";
    } else if (
      d.namaWali.length < 3 ||
      d.namaWali.length > 100 ||
      !nameRegex.test(d.namaWali) ||
      repeatRegex.test(d.namaWali.replace(/\s/g, ""))
    ) {
      newErrors.namaWali = "Nama orang tua/wali tidak valid.";
    }

    // C. Email
    if (!d.emailWali) {
      newErrors.emailWali = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.emailWali)) {
      newErrors.emailWali = "Format email tidak valid.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToastConfig({
        show: true,
        message: "Harap perbaiki error pada formulir.",
        type: "error",
      });
      setTimeout(() => {
        const firstErrorEl = document.querySelector(".error-input");
        if (firstErrorEl)
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return false;
    }

    setFormData(d); // save trimmed data
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setToastConfig({ ...toastConfig, show: false });
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(password)
    ) {
      newErrors.password =
        "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToastConfig({
        show: true,
        message: "Periksa kembali kata sandi Anda.",
        type: "error",
      });
      setTimeout(() => {
        const firstErrorEl = document.querySelector(".error-input");
        if (firstErrorEl)
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setSubmitting(true);
    setToastConfig({ ...toastConfig, show: false });

    try {
      const payload = {
        nama_lengkap: formData.namaLengkap,
        nisn: formData.nisn,
        alamat: {
          provinsi: formData.provinsi,
          kota_kabupaten: formData.kotaKabupaten,
          kecamatan: formData.kecamatan,
          kelurahan: formData.kelurahan,
          rt_rw: formData.rtRw,
          kode_pos: formData.kodePos,
        },
        tempat_lahir: formData.tempatLahir,
        tanggal_lahir: formData.tanggalLahir,
        jenis_kelamin: formData.jenisKelamin,
        no_hp: formData.noHp,
        asal_sekolah: formData.asalSekolah,
        email: formData.emailWali,
        nama_wali: formData.namaWali,
        kata_sandi: password,
      };

      await requestAPI({
        method: "POST",
        url: "/pendaftar/register",
        data: payload,
      });

      setShowSuccessModal(true);
    } catch (err) {
      if (err.errors) {
        const backendToFrontend = {
          nama_lengkap: "namaLengkap",
          nisn: "nisn",
          "alamat.provinsi": "provinsi",
          "alamat.kota_kabupaten": "kotaKabupaten",
          "alamat.kecamatan": "kecamatan",
          "alamat.kelurahan": "kelurahan",
          "alamat.rt_rw": "rtRw",
          "alamat.kode_pos": "kodePos",
          tempat_lahir: "tempatLahir",
          tanggal_lahir: "tanggalLahir",
          jenis_kelamin: "jenisKelamin",
          no_hp: "noHp",
          asal_sekolah: "asalSekolah",
          email: "emailWali",
          nama_wali: "namaWali",
          kata_sandi: "password",
        };

        const mappedErrors = {};
        for (const [key, msg] of Object.entries(err.errors)) {
          if (backendToFrontend[key]) {
            mappedErrors[backendToFrontend[key]] = msg;
          } else {
            mappedErrors[key] = msg;
          }
        }

        setErrors(mappedErrors);

        setTimeout(() => {
          const firstErrorEl = document.querySelector(".error-input");
          if (firstErrorEl)
            firstErrorEl.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
        }, 100);
      }

      setToastConfig({
        show: true,
        message:
          err.error ||
          err.message ||
          "Gagal melakukan registrasi. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldClass = (fieldName) => {
    return `w-full px-4 py-3 border rounded-xl focus:outline-none ${errors[fieldName] ? "border-red-500 bg-red-50 focus:border-red-600 error-input" : "border-gray-300 focus:border-blue-600"}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 hover:text-blue-800 transition cursor-pointer"
          >
            <IoArrowBackSharp size={25} />
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
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Pendaftaran Belum Dibuka
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Mohon maaf, saat ini tidak ada gelombang pendaftaran (PPDB) yang
              sedang aktif. Silakan pantau informasi terbaru di halaman beranda
              atau hubungi pihak sekolah.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-blue-dark text-white rounded-xl font-semibold hover:bg-blue-dark-hover transition shadow-md cursor-pointer"
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

                {/* Garis horizontal */}
                <div className="absolute left-full w-40 h-[2px] top-1/2 -translate-y-1/2 bg-gray-400">
                  <div
                    className={`h-full bg-blue-800 transition-all duration-500 ${
                      step === 1 ? "w-0" : "w-full"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center ml-40">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold ${step >= 2 ? "bg-blue-800 text-white border-blue-800" : "border-gray-300 text-gray-400"}`}
                >
                  2
                </div>
                <span
                  className={`mt-2 text-sm font-semibold text-center ${step >= 2 ? "text-blue-800" : "text-gray-400"}`}
                >
                  Buat Akun
                </span>
              </div>
            </div>

            {/* Catatan penting */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-6 items-start gap-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-yellow-300 text-yellow-800 flex items-center justify-center font-bold">
                  i
                </div>
                <h3 className="font-bold text-black-800 text-sm ">
                  Catatan Penting
                </h3>
              </div>

              <ul className="list-disc ml-2 text-slate-700 px-5">
                <li>
                  Isi data diri calon siswa secara benar dan sesuai dokumen
                  resmi (KK/Ijazah).
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
              <form
                className="space-y-6 mx-0 md:mx-5 lg:mx-10"
                onSubmit={handleNext}
                noValidate
              >
                <div className="space-y-4 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-800">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      placeholder="Isi nama lengkap (Sesuai Ijazah/KK)"
                      className={getFieldClass("namaLengkap")}
                    />
                    {errors.namaLengkap && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.namaLengkap}
                      </p>
                    )}
                  </div>

                  {/* NISN */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-800">
                      NISN SD <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="nisn"
                      value={formData.nisn}
                      onChange={handleChange}
                      placeholder="Isi 10 digit NISN"
                      className={getFieldClass("nisn")}
                    />
                    {errors.nisn && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.nisn}
                      </p>
                    )}
                  </div>

                  {/* Asal Sekolah */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-800">
                      Asal Sekolah <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="asalSekolah"
                      value={formData.asalSekolah}
                      onChange={handleChange}
                      placeholder="Contoh: SD Negeri 1 Manado"
                      className={getFieldClass("asalSekolah")}
                    />
                    {errors.asalSekolah && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.asalSekolah}
                      </p>
                    )}
                  </div>

                  {/* Alamat Domisili */}
                  <h3 className="font-bold text-gray-800 mt-8 mb-2 border-b pb-2">
                    Alamat Domisili
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Provinsi <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="provinsi"
                        value={formData.provinsi}
                        onChange={handleChange}
                        placeholder="Provinsi"
                        className={getFieldClass("provinsi")}
                      />
                      {errors.provinsi && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.provinsi}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Kota/Kabupaten <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="kotaKabupaten"
                        value={formData.kotaKabupaten}
                        onChange={handleChange}
                        placeholder="Kota/Kabupaten"
                        className={getFieldClass("kotaKabupaten")}
                      />
                      {errors.kotaKabupaten && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.kotaKabupaten}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Kecamatan <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="kecamatan"
                        value={formData.kecamatan}
                        onChange={handleChange}
                        placeholder="Kecamatan"
                        className={getFieldClass("kecamatan")}
                      />
                      {errors.kecamatan && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.kecamatan}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Kelurahan <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="kelurahan"
                        value={formData.kelurahan}
                        onChange={handleChange}
                        placeholder="Kelurahan"
                        className={getFieldClass("kelurahan")}
                      />
                      {errors.kelurahan && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.kelurahan}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        RT / RW <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="rtRw"
                        value={formData.rtRw}
                        onChange={handleChange}
                        placeholder="001/001"
                        className={getFieldClass("rtRw")}
                      />
                      {errors.rtRw && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.rtRw}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Kode Pos <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="kodePos"
                        value={formData.kodePos}
                        onChange={handleChange}
                        placeholder="Kode Pos"
                        className={getFieldClass("kodePos")}
                      />
                      {errors.kodePos && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.kodePos}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-800 mt-8 mb-2 border-b pb-2">
                    Detail Personal
                  </h3>
                  {/* Tanggal Lahir + Tempat Lahir + Jenis Kelamin + Nomor HP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tempat Lahir */}
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Tempat Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="tempatLahir"
                        value={formData.tempatLahir}
                        onChange={handleChange}
                        placeholder="Tempat Lahir"
                        className={getFieldClass("tempatLahir")}
                      />
                      {errors.tempatLahir && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.tempatLahir}
                        </p>
                      )}
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="tanggalLahir"
                        value={formData.tanggalLahir}
                        onChange={handleChange}
                        className={getFieldClass("tanggalLahir")}
                      />
                      {errors.tanggalLahir && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.tanggalLahir}
                        </p>
                      )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jenisKelamin"
                        value={formData.jenisKelamin}
                        onChange={handleChange}
                        className={getFieldClass("jenisKelamin")}
                      >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                      {errors.jenisKelamin && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.jenisKelamin}
                        </p>
                      )}
                    </div>

                    {/* Nomor HP */}
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Nomor Handphone (WA){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="noHp"
                        value={formData.noHp}
                        onChange={handleChange}
                        placeholder="Contoh: 08123456789"
                        className={getFieldClass("noHp")}
                      />
                      {errors.noHp && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.noHp}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informasi Orang Tua/Wali */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">
                    Informasi Orang Tua/Wali
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Nama Orangtua/Wali{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="namaWali"
                        value={formData.namaWali}
                        onChange={handleChange}
                        placeholder="Nama Lengkap Wali"
                        className={getFieldClass("namaWali")}
                      />
                      {errors.namaWali && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.namaWali}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold text-gray-700 text-sm">
                        Alamat Email Aktif{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailWali"
                        value={formData.emailWali}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={getFieldClass("emailWali")}
                      />
                      {errors.emailWali && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.emailWali}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tombol Lanjut */}
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="px-8 py-2 bg-blue-dark text-white rounded-lg hover:bg-blue-dark-hover transition-all duration-300 flex items-center gap-2 group cursor-pointer font-semibold shadow-md"
                  >
                    <span>LANJUTKAN</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            )}

            {/* Form Step 2 */}
            {step === 2 && (
              <form
                className="space-y-6 mx-0 md:mx-5 lg:mx-10 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Judul */}
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Buat Kata Sandi Akun
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Buat password yang kuat untuk menjaga privasi data
                    pendaftaran Anda.
                  </p>
                  <p className="text-sm font-medium text-blue-700 mt-2">
                    Kata sandi minimal 6 karakter, harus mengandung huruf kecil,
                    huruf besar, angka, dan simbol.
                  </p>
                </div>

                {/* NISN */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Nama Pengguna (Username)
                  </label>
                  <input
                    value={formData.nisn || "(tidak diisi)"}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-600 font-medium rounded-xl cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    * NISN Anda otomatis digunakan sebagai username login.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: null });
                    }}
                    placeholder="Minimal 6 karakter, huruf besar, huruf kecil, angka, dan simbol"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none ${errors.password ? "border-red-500 bg-red-50 focus:border-red-600 error-input" : "border-gray-300 focus:border-blue-600"}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Konfirmasi Password */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Konfirmasi Kata Sandi{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: null });
                    }}
                    placeholder="Ulangi kata sandi"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none ${errors.confirmPassword ? "border-red-500 bg-red-50 focus:border-red-600 error-input" : "border-gray-300 focus:border-blue-600"}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Tombol */}
                <div className="flex justify-between sm:justify-end gap-4 mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setToastConfig({ ...toastConfig, show: false });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-6 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition shadow"
                  >
                    ← Kembali
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-2 bg-blue-dark hover:bg-blue-dark-hover text-white font-semibold rounded-lg shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[140px]"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      "Selesaikan"
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Akun Anda telah berhasil dibuat. Silakan login menggunakan{" "}
              <b>NISN</b> dan <b>Kata Sandi</b> yang telah Anda tentukan.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 bg-blue-dark text-white rounded-lg font-semibold hover:bg-blue-dark-hover transition shadow-md cursor-pointer"
            >
              Lanjut ke Halaman Login
            </button>
          </div>
        </div>
      )}

      {/* Komponen Toaster Global */}
      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />
    </main>
  );
}
