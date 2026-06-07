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

---

## ⚠️ Catatan Keamanan
Karena file `.env` pernah terunggah ke dalam *version control* atau didistribusikan dalam *archive/project*, rahasia-rahasia asli (seperti `JWT_SECRET`, sandi database, atau API Keys) **harus dirotasi (diubah nilainya)** secara manual di environment produksi untuk menjaga keamanan sistem.

---

## 🗄️ TiDB — Primary Key Sequence untuk Tabel `pendaftar`

### Latar Belakang

Production database menggunakan **TiDB Cloud**. TiDB **tidak mengizinkan** penambahan atribut `AUTO_INCREMENT` ke kolom yang sudah ada melalui:

```sql
-- ❌ TIDAK AKAN BERHASIL di TiDB
ALTER TABLE pendaftar MODIFY COLUMN id_pendaftar INT AUTO_INCREMENT;
```

Perintah tersebut akan gagal dengan error:
> *"Unsupported modify column: can't set auto_increment"*

Oleh karena itu, `id_pendaftar` di Prisma schema **tidak** menggunakan `@default(autoincrement())`. ID dibuat secara eksplisit di layer aplikasi menggunakan **TiDB SEQUENCE**.

---

### Solusi: TiDB Sequence

Kode aplikasi menggunakan `prisma.$transaction()` untuk:
1. Memanggil `SELECT NEXTVAL(seq_pendaftar_id)` via raw SQL untuk mendapatkan ID unik.
2. Memvalidasi ID tersebut dengan `Number.isSafeInteger()`.
3. Meneruskan `id_pendaftar` secara eksplisit ke `prisma.pendaftar.create()`.

Pendekatan ini menjamin ID unik bahkan pada dua request yang masuk secara bersamaan, tanpa perlu `MAX(id) + 1` di sisi aplikasi.

---

### Setup Sekali — Jalankan di TiDB Cloud SQL Editor

> ⚠️ Langkah ini hanya perlu dilakukan **satu kali** di database produksi.

**Langkah 1** — Cari nilai `id_pendaftar` tertinggi saat ini:

```sql
SELECT COALESCE(MAX(id_pendaftar), 0) AS max_id
FROM pendaftar;
```

**Langkah 2** — Buat sequence dengan `START WITH` = `max_id + 1`.
*(Contoh di bawah menggunakan `START WITH 1` untuk tabel kosong. Sesuaikan nilainya.)*

```sql
CREATE SEQUENCE IF NOT EXISTS seq_pendaftar_id
    START WITH 1        -- Ganti dengan MAX(id_pendaftar) + 1
    INCREMENT BY 1
    CACHE 100;
```

Lihat file [`scripts/create-pendaftar-sequence.sql`](./scripts/create-pendaftar-sequence.sql) untuk script lengkap beserta komentar panduan.

---

### Verifikasi Sequence

Setelah sequence dibuat, konfirmasi bahwa sequence berfungsi dengan menjalankan:

```sql
SELECT NEXTVAL(seq_pendaftar_id) AS next_id;
```

Nilai yang dikembalikan harus berupa integer positif yang lebih besar dari `MAX(id_pendaftar)` yang ada.

---

### Menyinkronkan Ulang Sequence (jika diperlukan)

Jika data diimpor langsung ke tabel tanpa melalui sequence, gunakan `SETVAL()` untuk memperbarui posisi sequence:

```sql
-- Ganti 100 dengan nilai MAX(id_pendaftar) aktual
SELECT SETVAL(seq_pendaftar_id, 100);
```

Pemanggilan `NEXTVAL` berikutnya akan mengembalikan `101`.

---

### ⛔ Anti-pattern — Jangan Lakukan Ini

| Larangan | Alasan |
|---|---|
| `ALTER TABLE ... MODIFY COLUMN id_pendaftar INT AUTO_INCREMENT` | Tidak didukung TiDB untuk kolom yang sudah ada |
| `MAX(id_pendaftar) + 1` di aplikasi | Race condition — dua request bersamaan bisa mendapat ID yang sama |
| `prisma migrate reset` di produksi | Menghapus semua data dan sequence |
| Drop tabel `pendaftar` | Menghapus data pendaftar nyata |

---

### Error Handling

Jika sequence belum dibuat di TiDB, aplikasi akan mengembalikan:

```json
{
  "message": "Terjadi gangguan pada penyimpanan data pendaftaran. Silakan hubungi administrator."
}
```

dengan HTTP status `500`. Log server akan mencatat kode Prisma error (`P2011`) beserta `meta` — tanpa membocorkan password, payload, token, atau environment variable.

