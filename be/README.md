# RPL Backend API

Proyek ini adalah sistem backend (API) khusus untuk manajemen konten sekolah, registrasi siswa baru, dan verifikasi dokumen. Dikembangkan menggunakan arsitektur modern berbasis Node.js.

## 🚀 Teknologi yang Digunakan
1. **Runtime:** Node.js (dengan ES Modules / `"type": "module"`)
2. **Framework Web:** Express.js
3. **Database ORM:** Prisma
4. **Keamanan:** JSON Web Token (JWT) & bcryptjs
5. **Manajemen File:** Multer
6. **API Client (Testing):** Bruno

---

## 🏗️ Struktur & Alur Kerja Aplikasi

Sistem ini menganut pola rancangan **MVC-lite / Service-Controller Pattern** yang terpusat di direktori `src/`, dengan pembagian tanggung jawab sebagai berikut:

### 1. Request Masuk (`app.js` & `routes/`)
Seluruh request dari klien (frontend atau aplikasi pihak ketiga) akan masuk ke pintu gerbang utama aplikasi yaitu `app.js`. Dari sana, request akan dialihkan ke Router pusat `src/routes/index.js`, yang kemudian mendistribusikan jalur request ke modul spesifik:
- `/api/berita`, `/api/prestasi`, `/api/pengumuman`, dsb (Semua dikontrol di **contentRoutes**)
- `/api/profile` (Dikontrol di **profilRoutes**)
- `/api/pendaftar` (Dikontrol di **pendaftarRoutes**)
- `/api/dokumen` (Dikontrol di **dokumenRoutes**)

### 2. Pengecekan Keamanan (`middleware/`)
Sebelum request tiba di Controller, endpoint yang bersifat *Private* harus melalui pos penjagaan (Middleware):
- **`authMiddleware.js`**: Mengekstrak token Bearer (JWT) dari Header. Jika valid, kredensial pengguna (`req.user.id`, `req.user.role`) dititipkan ke objek request. Akses ditolak jika token invalid.
- **`uploadMiddleware.js`**: Jika request berbentuk unggahan foto/dokumen (`multipart/form-data`), Multer akan menginisialisasi penyimpanan file ke dalam direktori `public/uploads/` dan memberikan referensi nama foldernya.

### 3. Pemrosesan Data (`controllers/`)
Setelah melewati middleware, Controller bersangkutan (misalnya `PendaftarController.js` atau `ContentController.js`) bertugas:
- Menangkap dan menormalkan payload (JSON Body maupun File params).
- Mengatur data yang akan dibawa ke *database layer* (Service).
- Membentuk JSON Response baku yang akan dikirimkan kembali pada pengguna.

### 4. Interaksi Database (`services/` & `prisma/`)
Controller meng-over *Business Logic* (Logika Bisnis) ke dalam file-file Service. Hal ini memungkinkan Reusability (penggunaan ulang) logika di masa mendatang tanpa pusing mengatur HTTP Object (req/res).
- Service (misal `ContentService.js`) mengeksekusi fungsi asinkron memanggil Prisma Client (PostgreSQL) seperti `prisma.berita.findMany()` maupun melakukan `prisma.$transaction()`.
- Data mentah yang dikembalikan oleh Prisma Client dibawa kembali ke Controller untuk disajikan.

---

## 👥 Aktor & Hak Akses (Role)

Adapun aktor yang diatur dalam backend ini dibagi menjadi 3 entri utama:

1. **Admin (`id_admin`)**
   Admin adalah pengelola tunggal untuk seluruh **Konten dan Entitas Sekolah**. Hanya Token bertipe Admin yang dapat memanipulasi (CRUD) untuk tabel: Berita, Prestasi, PendaftarPengumumanPage, Program Unggulan, Ekstrakurikuler, Fasilitas, dan Profil/Kontak utama instansi.

2. **Pendaftar**
   Aktor publik. Mereka difasilitasi endpoint registrasi spesifik `/api/pendaftar/register`. Skema otomatis membuat ID Pendaftaran baru dengan status `draft`.

3. **Verifikator (`id_verifikator`)**
   Aktor yang diberikan otoritas parsial yang berfokus ke persetujuan data calon pendaftar. Verifikator memantau relasi tabel *Dokumen* pendaftar untuk meluluskan (`status_verifikasi`) dan memberi `catatan_verifikasi`.

---

## 🧪 Pengujian API (API Testing)

Kami telah membundel lengkap konfigurasi Endpoint di dalam folder `be/bruno/`. 
Gunakan Aplikasi [Bruno](https://www.usebruno.com) untuk menjalankan request pengujian ini.
1. Buka Bruno, pilih menu *Open Collection*, dan targetkan ke file `be/bruno/bruno.json`.
2. Di pojok kanan atas UI Bruno, pastikan Anda mengatur koneksi _Environment_ ke **Local** (yang melink otomatis parameter `base_url`).
3. Jalankan _Auth Login_ (Admin/Verifikator). Token otentikasi akan **otomatis tersimpan** untuk seluruh request private!

---

## 💻 Panduan Instalasi & Menjalankan (Local)

1. Lakukan instalasi dependensi (Modul NPM):
   ```bash
   npm install
   ```
2. Pastikan URI database Anda terhubung pada variabel lingkungan dalam file `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/rpl_db"
   JWT_SECRET="rahasia_anda_disini"
   ```
3. Sinkronisasikan Prisma dengan database (jika terjadi perubahan susunan):
   ```bash
   npx prisma generate
   # npx prisma db push (jika ingin alter database secara auto)
   ```
4. Jalankan aplikasi pada terminal (Mode Development dengan live-reload):
   ```bash
   npm run dev
   ```
   *Express server akan berjalan pada `http://localhost:3000` atau PORT pilihan Anda.*
