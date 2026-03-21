# Proyek Akhir Mata Kuliah Rekayasa Perangkat Lunak

Project ini terdiri dari dua bagian utama: Backend (`be`) dan Frontend (`fe`). Dikembangkan menggunakan arsitektur modular dengan pemisahan tanggung jawab yang jelas.

---

## 🚀 1. Persiapan & Instalasi Backend (BE)

Folder `be` menangani logika bisnis, akses database, dan manajemen file.

### Langkah Instalasi:

1. **Masuk ke direktori backend:**
   ```bash
   cd be
   ```
2. **Instal dependensi:**
   ```bash
   npm install
   ```
3. **Konfigurasi Environment:**
   - Ubah nama atau buat file `.env` di dalam folder `be`.
   - Sesuaikan `DATABASE_URL` (Support MySQL/MariaDB).
   - Pastikan variabel `JWT_SECRET` dan `PORT` sudah terisi.

### Manajemen Database (Prisma):

- **Migrasi Database:** `npx prisma migrate dev`
- **Isi Data Dummy (Seed):** `npm run db:seed`
- **Kosongkan Semua Tabel (Reset):** `npm run db:reset`

### Fitur Utama:

- **Modular Services:** Setiap entitas (Berita, Profil, dsb) memiliki Controller dan Service fungsional sendiri.
- **Image Handling:** Menggunakan Multer dengan validasi tipe file, limit ukuran (5MB), dan penghapusan otomatis file lama saat di-update/hapus.
- **REST API Pattern:** Mengikuti standar `POST` (create), `PUT` (update data), `PATCH` (khusus update gambar), dan `DELETE`.

---

## 🎨 2. Persiapan & Instalasi Frontend (FE)

Folder `fe` berisi antarmuka pengguna berbasis React dan Vite.

### Langkah Instalasi:

1. **Masuk ke direktori frontend:**
   ```bash
   cd fe
   ```
2. **Instal dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan Aplikasi:**
   - Development Mode: `npm run dev`
   - Build for Production: `npm run build`

### Struktur Folder:

Guna mempermudah pengembangan, setiap folder di `src/` dilengkapi dengan `docs.md` sendiri. Halaman dikelompokkan sebagai berikut:

- `src/pages/public/`: Landing page dan informasi umum.
- `src/pages/admin/`: Dashboard manajemen pengelola.
- `src/pages/verifikator/`: Antarmuka verifikasi pendaftaran.
- `src/pages/pendaftar/`: Alur pendaftaran siswa.

### Layanan API:

Semua interaksi API terpusat di `src/services/api.js` yang menangani JWT Token, interceptors, serta pengiriman data JSON maupun Multipart secara otomatis.

---

## 🛠️ Tech Stack & Dependencies

- **Backend:** Node.js, Express, Prisma ORM, Multer, Bcrypt, JWT.
- **Frontend:** React, Vite, Tailwind CSS, Axios, Lucide React.
- **Database:** MariaDB / MySQL.
