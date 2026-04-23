import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Phone,
  ShieldCheck,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import api from "../../services/api.js";

function BerandaPendaftar() {
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await api.get("/pendaftar/me");
        setBiodata(res.data?.data || null);
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
    const tgl = new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return tempat ? `${tempat}, ${tgl}` : tgl;
  };

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
          <Field
            label="NISN"
            value={biodata?.nisn || "-"}
            loading={loading}
          />
          <Field
            label="Nama Lengkap"
            value={biodata?.nama_lengkap || "-"}
            loading={loading}
          />
          <Field
            label="Tempat, Tanggal Lahir"
            value={formatTanggalLahir(biodata?.tempat_lahir, biodata?.tanggal_lahir)}
            loading={loading}
            icon={<CalendarDays size={16} />}
          />
          <Field
            label="Jenis Kelamin"
            value={biodata?.jenis_kelamin === "L" ? "Laki-Laki" : biodata?.jenis_kelamin === "P" ? "Perempuan" : biodata?.jenis_kelamin || "-"}
            loading={loading}
          />
          <Field
            label="Asal Sekolah"
            value={biodata?.asal_sekolah || "-"}
            loading={loading}
          />
          <Field
            label="Alamat Lengkap"
            value={
              biodata?.alamat
                ? `${biodata.alamat.provinsi}, ${biodata.alamat.kota_kabupaten}, ${biodata.alamat.kecamatan}, ${biodata.alamat.kelurahan}, RT/RW: ${biodata.alamat.rt_rw}, Kode Pos: ${biodata.alamat.kode_pos}`
                : "-"
            }
            loading={loading}
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
          <Field
            label="Nama Orang Tua / Wali"
            value={biodata?.nama_wali || "-"}
            loading={loading}
          />
          <Field
            label="Alamat Email Orang Tua / Wali"
            value={biodata?.email || "-"}
            loading={loading}
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
          <Field
            label="No. HP"
            value={biodata?.no_hp || "-"}
            loading={loading}
          />
          <Field
            label="Alamat Email"
            value={biodata?.email || "-"}
            loading={loading}
          />
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


      </div>
    </div>
  );
}

/* COMPONENT FIELD */
function Field({ label, value, icon, loading }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="bg-slate-200 rounded-lg px-4 py-3 text-sm text-gray-800 flex items-center justify-between min-h-[44px]">
        {loading ? (
          <div className="h-4 bg-slate-300 rounded w-2/3 animate-pulse" />
        ) : (
          <>
            <span>{value}</span>
            {icon}
          </>
        )}
      </div>
    </div>
  );
}

export default BerandaPendaftar;