import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import { SectionTitle } from "@components/ui/ui";

const guideSteps = [
  {
    title: "Buat akun lebih dulu",
    detail: "Mulai dari halaman login atau register. Gunakan data yang aktif dan mudah diingat supaya proses berikutnya tidak terhambat.",
    tips: "Simpan username dan password di tempat aman.",
  },
  {
    title: "Lengkapi profil pendaftar",
    detail: "Masukkan identitas calon siswa dengan teliti. Hindari salah ketik pada nama, tanggal lahir, alamat, dan data sekolah asal karena ini akan mempengaruhi verifikasi.",
    tips: "Cocokkan dengan dokumen resmi sebelum menekan simpan.",
  },
  {
    title: "Unggah dokumen wajib",
    detail: "Siapkan dokumen utama seperti KK, Akta Kelahiran, rapor, atau dokumen lain yang diminta. Pastikan file jelas terbaca dan tidak buram.",
    tips: "Gunakan foto atau scan yang terang dan tidak terpotong.",
  },
  {
    title: "Pantau status verifikasi",
    detail: "Setelah data dikirim, sistem akan menampilkan status terbaru. Jika ada revisi, perbaiki hanya bagian yang diminta agar proses lebih cepat.",
    tips: "Cek dashboard secara berkala, jangan tunggu mendekati penutupan.",
  },
  {
    title: "Lihat hasil pengumuman",
    detail: "Saat jadwal seleksi dibuka, buka halaman pengumuman untuk melihat hasil akhir. Ikuti instruksi lanjutan jika dinyatakan lolos.",
    tips: "Perhatikan juga jadwal daftar ulang dan berkas lanjutan.",
  },
];

export default function GuidePage() {
  return (
    <PublicLayout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle eyebrow="Panduan Website" title="Cara Menggunakan Sistem PPDB" description="Panduan ini disusun ringkas, berurutan, dan mudah dipindai agar pengguna tidak bingung saat menjalankan setiap tahap." />

        <div className="grid gap-6">
          {guideSteps.map((step, index) => (
            <div key={step.title} className="rounded-[24px] border border-slate-100 bg-white shadow-[0_20px_45px_var(--color-blue-normal)_/12%] overflow-hidden">
              <div className="grid md:grid-cols-[96px_1fr]">
                <div className="bg-blue-dark text-white flex items-center justify-center text-3xl font-extrabold py-8 md:py-0">{index + 1}</div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-8 mb-4">{step.detail}</p>
                  <div className="rounded-2xl bg-yellow-light px-4 py-3 text-sm text-slate-700 leading-7">
                    <span className="font-bold text-slate-900">Tips:</span> {step.tips}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[24px] bg-blue-light p-6 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Ringkasan cepat</h3>
          <ol className="list-decimal pl-5 text-slate-700 leading-8 space-y-2">
            <li>Buat akun dan login.</li>
            <li>Isi data pendaftar secara lengkap.</li>
            <li>Unggah dokumen dengan kualitas yang jelas.</li>
            <li>Monitor status verifikasi sampai final.</li>
            <li>Cek pengumuman dan ikuti tahap berikutnya.</li>
          </ol>
        </div>
      </main>
    </PublicLayout>
  );
}
