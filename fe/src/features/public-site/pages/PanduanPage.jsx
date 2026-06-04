import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCheck, FaThumbtack } from "react-icons/fa";
import { Link } from "react-router";
import { waveApi } from "../services/waveService";
import { formatMediumDate } from "../../../shared/utils/dateHelper";

export default function PanduanPage() {
  const [gelombangAktif, setGelombangAktif] = useState(null);
  const [semuaGelombang, setSemuaGelombang] = useState([]);
  const [loadingAktif, setLoadingAktif] = useState(true);
  const [loadingSemua, setLoadingSemua] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseAktif = await waveApi.getActiveWave();
        if (responseAktif.data) {
           setGelombangAktif(responseAktif.data);
        }
      } catch (error) {
        console.error("Gagal mengambil gelombang aktif:", error);
      } finally {
        setLoadingAktif(false);
      }

      try {
        const responseSemua = await waveApi.getPublicList();
        if (responseSemua.data) {
           setSemuaGelombang(responseSemua.data);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar gelombang:", error);
      } finally {
        setLoadingSemua(false);
      }
    }
    fetchData();
  }, []);

  const steps = [
    {
      title: "Buat Akun Pendaftar",
      desc: "Calon siswa harus membuat akun pendaftar terlebih dahulu. Gunakan NISN SD yang benar karena data ini dipakai untuk identitas pendaftaran."
    },
    {
      title: "Lengkapi Formulir Pendaftaran",
      desc: "Setelah login memakai akun pendaftar, lengkapi formulir pendaftaran dengan mengisi biodata, data wali, alamat, asal sekolah, dan memilih gelombang."
    },
    {
      title: "Unggah Dokumen Wajib",
      desc: "Pendaftar harus mengunggah dokumen wajib melalui akun pendaftar. Pastikan file scan atau foto terlihat jelas dan sesuai dengan data formulir."
    },
    {
      title: "Verifikasi oleh Panitia",
      desc: "Panitia akan memeriksa kesesuaian data dan dokumen. Jika dokumen belum sesuai, pendaftar perlu login ke akun pendaftar dan mengunggah ulang dokumen."
    },
    {
      title: "Cek Pengumuman Melalui Akun",
      desc: "Pendaftar dapat melihat status seleksi dan pengumuman akhir langsung melalui dashboard akun pendaftar."
    }
  ];

  const syaratData = [
    {
      label: "Data Calon Siswa",
      desc: "Nama lengkap, NISN SD, tempat dan tanggal lahir, jenis kelamin, asal sekolah, dan nomor HP."
    },
    {
      label: "Data Wali dan Alamat",
      desc: "Nama wali, provinsi, kota atau kabupaten, kecamatan, kelurahan, RT/RW, dan kode pos."
    },
    {
      label: "Ijazah atau Surat Keterangan Lulus",
      desc: "Dokumen kelulusan resmi dari SD atau sekolah asal."
    },
    {
      label: "Akta Kelahiran",
      desc: "Dokumen identitas resmi untuk mencocokkan nama dan tanggal lahir."
    },
    {
      label: "Kartu Keluarga",
      desc: "Dokumen keluarga untuk validasi data orang tua atau wali."
    },
    {
      label: "Pas Foto",
      desc: "Foto terbaru dengan kualitas gambar yang jelas."
    }
  ];

  return (
    <>
      <div className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-16 mb-10">
        <h2 className="text-3xl font-medium translate-y-4">Info PPDB</h2>
      </div>

      <main className="px-6 md:px-10 pb-20 md:pl-16 max-w-7xl mx-auto font-sans">
        
        {/* HERO SECTION RINGKAS */}
        <section className="mb-16">
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="bg-blue-light text-blue-dark border border-blue-normal rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 shadow-sm">
               <FaCalendarAlt />
               {loadingAktif ? "Mengecek status..." : gelombangAktif ? `Pendaftaran Dibuka: ${gelombangAktif.nama}` : "Pendaftaran belum dibuka."}
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
              Semua informasi PPDB ada di satu halaman.
            </h3>
            
            <p className="text-base leading-7 text-gray-600 max-w-2xl mt-2">
              Pendaftar perlu menggunakan akun pendaftar untuk mengisi formulir, mengunggah dokumen, dan melihat status seleksi secara online.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/register" className="bg-blue-dark hover:bg-blue-dark-hover transition text-white px-8 py-3 rounded-full font-medium shadow-md">
                Daftar Sekarang
              </Link>
              <a href="#alur" className="bg-white hover:bg-gray-50 border border-gray-200 transition text-blue-dark px-8 py-3 rounded-full font-medium shadow-sm">
                Lihat Alur PPDB
              </a>
            </div>
          </div>
        </section>

        {/* ALUR DAN SYARAT GRID */}
        <div id="alur" className="grid lg:grid-cols-3 gap-10 mt-10">
          
          {/* KIRI - ALUR PENDAFTARAN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h3 className="font-bold text-3xl text-blue-dark mb-4">
                Alur Pendaftaran
              </h3>
              <p className="text-base leading-7 text-gray-600">
                Ikuti langkah-langkah berikut untuk menyelesaikan pendaftaran PPDB.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 md:p-8 flex items-start gap-6 shadow-card border border-gray-100"
                >
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-blue-light text-blue-dark rounded-2xl font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-7 text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KANAN - SYARAT PENDAFTARAN */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100">
              <div className="bg-blue-dark py-5 px-8">
                <div className="flex items-center gap-3 text-white font-semibold">
                  <FaThumbtack className="text-yellow-normal" />
                  <span className="text-xl">Syarat Pendaftaran</span>
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-6">
                  {syaratData.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="shrink-0 mt-1">
                        <FaCheck className="text-blue-normal" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block text-sm md:text-base mb-1">{item.label}</span>
                        <span className="text-gray-600 text-sm md:text-base block leading-7">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-5 bg-yellow-light border border-yellow-normal/30 rounded-2xl">
                  <p className="text-sm md:text-base text-yellow-900 font-medium leading-7">
                    Catatan: Pastikan seluruh dokumen terbaca jelas. Data pada formulir harus sesuai dengan dokumen resmi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JADWAL GELOMBANG */}
        <section className="mt-20">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="font-bold text-3xl text-blue-dark mb-4">
              Jadwal Gelombang PPDB
            </h3>
            <p className="text-base leading-7 text-gray-600">
              Perhatikan jadwal berikut agar Anda tidak tertinggal gelombang pendaftaran.
            </p>
          </div>

          {loadingSemua ? (
             <div className="text-center text-gray-500 py-10 text-base">Memuat jadwal gelombang...</div>
          ) : semuaGelombang.length === 0 ? (
             <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-gray-200 text-base">
               Data gelombang PPDB belum tersedia.
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {semuaGelombang.map((wave) => {
                const isActive = wave.statusGelombang === "aktif";
                
                return (
                  <div 
                    key={wave.id_gelombang} 
                    className={`rounded-3xl p-6 md:p-8 transition-all duration-300 ${isActive ? "border-2 border-blue-dark bg-blue-light shadow-md scale-[1.02]" : "bg-[#f5f6f8] shadow-card border border-transparent"}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="font-bold text-xl text-gray-900">{wave.nama}</h4>
                      {isActive && (
                        <span className="bg-yellow-normal text-blue-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Periode</p>
                        <p className="text-sm md:text-base font-medium text-gray-900 leading-7">
                           {formatMediumDate(wave.tanggal_mulai)} - {formatMediumDate(wave.tanggal_selesai)}
                        </p>
                      </div>
                      
                      <div className="border-t border-gray-200/60 pt-5">
                         <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Kuota Total</p>
                            <p className="text-xl md:text-2xl font-bold text-blue-dark">{wave.kuota} Siswa</p>
                         </div>
                      </div>
                    </div>
                    
                    {!isActive && (
                       <div className="mt-5 pt-5 border-t border-gray-200/60 text-center">
                          <span className={`text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full ${wave.statusGelombang === "ditutup" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700"}`}>
                             Status: {wave.statusGelombang === "belum dibuka" ? "Belum Dibuka" : "Ditutup"}
                          </span>
                       </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
