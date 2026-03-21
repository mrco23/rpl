# Services Folder

Folder ini mengelola seluruh interaksi dengan Backend melalui API.

## Arsitektur:
- `api.js`: Konfigurasi dasar Axios, termasuk basis URL dan *interceptors* untuk menyematkan *Authorization Header* (JWT).
- `authService.js`: Layanan khusus untuk login dan manajemen sesi.
- `contentService.js`: *Factory* layanan untuk operasi CRUD pada konten umum (Berita, Prestasi, dll) dengan dukungan *multipart* untuk gambar.
- `profileService.js`: Layanan untuk mengelola profil sekolah dan kontak.
- `siteContentService.js`: Agregasi layanan untuk mempermudah pengambilan data halaman utama.
