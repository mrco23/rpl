import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Phone,
  UserCircle,
  AlertCircle
} from "lucide-react";
import { getPendaftarMe } from "../services/pendaftarService.js";
import { formatMediumDate } from "../../../shared/utils/dateHelper";

function BerandaPendaftarPage() {
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await getPendaftarMe();
        setBiodata(res.data || null);
      } catch (err) {
        console.error("Gagal mengambil biodata pendaftar:", err);
        setBiodata(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBiodata();
  }, []);

  const formatTanggalLahir = (tempat, tanggal) => {
    if (!tempat && !tanggal) return "-";
    if (!tanggal) return tempat || "-";
    const tgl = formatMediumDate(tanggal);
    return tempat ? `${tempat}, ${tgl}` : tgl;
  };

  const getAlamat = () => {
    if (!biodata?.alamat) return "-";
    const { provinsi, kota_kabupaten, kecamatan, kelurahan, rt_rw, kode_pos } = biodata.alamat;
    return `${kelurahan}, Kec. ${kecamatan}, ${kota_kabupaten}, ${provinsi} (RT/RW: ${rt_rw}, POS: ${kode_pos})`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 py-8 md:py-10 font-sans">
      <div className="max-w-5xl mx-auto w-full">

        {/* HEADER MESSAGE */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Biodata Pendaftar
          </h1>
          <p className="text-sm md:text-base leading-7 text-gray-500 mt-2">
            Data berikut diambil saat pendaftaran akun. Sebagian data dapat diubah pada bagian kontak.
          </p>
        </div>

        <div className="mb-8 bg-blue-light/50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="text-blue-dark shrink-0 mt-0.5" size={24} />
          <div>
            <p className="text-sm md:text-base font-medium text-gray-800 leading-6">
              Periksa kembali data identitas pendaftar. Hubungi panitia jika terdapat kesalahan data penting.
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-6 md:gap-8">

          {/* KIRI - KONTEN UTAMA */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8">

            {/* CARD: DATA SISWA */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-light rounded-xl text-blue-dark">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Data Siswa
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <Field label="NISN SD" value={biodata?.nisn || "-"} loading={loading} />
                <Field label="Nama Lengkap" value={biodata?.nama_lengkap || "-"} loading={loading} />
                <Field label="Tempat, Tanggal Lahir" value={formatTanggalLahir(biodata?.tempat_lahir, biodata?.tanggal_lahir)} loading={loading} />
                <Field label="Jenis Kelamin" value={biodata?.jenis_kelamin === "L" ? "Laki-Laki" : biodata?.jenis_kelamin === "P" ? "Perempuan" : biodata?.jenis_kelamin || "-"} loading={loading} />
                <Field label="Asal Sekolah" value={biodata?.asal_sekolah || "-"} loading={loading} />
              </div>
            </div>

            {/* CARD: DATA WALI */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-light rounded-xl text-blue-dark">
                  <Users size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Data Orang Tua / Wali
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <Field label="Nama Orang Tua / Wali" value={biodata?.nama_wali || "-"} loading={loading} />
              </div>
            </div>

            {/* CARD: DATA KONTAK */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-light rounded-xl text-blue-dark">
                  <Phone size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Data Kontak / Alamat
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <Field label="No. Handphone" value={biodata?.no_hp || "-"} loading={loading} />
                <Field label="Alamat Email" value={biodata?.email || "-"} loading={loading} />
                <div className="md:col-span-2">
                  <Field label="Alamat Lengkap" value={getAlamat()} loading={loading} />
                </div>
              </div>
            </div>
          </div>

          {/* KANAN - SIDEBAR / RINGKASAN */}
          <div className="space-y-6 md:space-y-8">

            {/* CARD: RINGKASAN AKUN */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card xl:sticky xl:top-6">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-blue-light rounded-xl text-blue-dark">
                  <UserCircle size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Ringkasan Akun
                </h2>
              </div>

              <div className="flex flex-col gap-4 md:gap-5">
                {loading ? (
                  <div className="h-16 bg-gray-100 animate-pulse rounded-2xl" />
                ) : (
                  <div className="bg-[#f5f6f8] rounded-2xl p-4">
                    <span className="text-sm font-medium text-gray-500 block">Nama Pendaftar</span>
                    <span className="mt-1 text-sm md:text-base font-semibold text-gray-900 block">{biodata?.nama_lengkap || "-"}</span>
                  </div>
                )}

                {loading ? (
                  <div className="h-16 bg-gray-100 animate-pulse rounded-2xl" />
                ) : (
                  <div className="bg-[#f5f6f8] rounded-2xl p-4">
                    <span className="text-sm font-medium text-gray-500 block">Keterangan Pendaftar</span>
                    <span className="mt-1 text-sm md:text-base font-semibold text-blue-dark block uppercase tracking-wider">Calon Siswa Baru</span>
                  </div>
                )}

                <div className="mt-2 p-4 bg-yellow-light border border-yellow-normal/30 rounded-2xl">
                  <p className="text-sm md:text-base text-yellow-900 font-medium leading-6">
                    Gunakan akun ini untuk memantau status seleksi dan melengkapi semua persyaratan pendaftaran.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, loading }) {
  return (
    <div className="bg-[#f5f6f8] rounded-2xl p-4 flex flex-col justify-center min-h-[80px]">
      <span className="text-sm font-medium text-gray-500 block">
        {label}
      </span>
      {loading ? (
        <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse" />
      ) : (
        <span className="mt-1 text-sm md:text-base font-semibold text-gray-900 block wrap-break-words">
          {value}
        </span>
      )}
    </div>
  );
}

export default BerandaPendaftarPage;