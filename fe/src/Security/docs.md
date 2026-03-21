# Security Folder

Folder ini berisi komponen dan logika yang berkaitan dengan keamanan aplikasi, khususnya otentikasi dan otorisasi rute.

## Isi Folder:
- `ProtectedRoute.jsx`: Komponen *wrapper* yang memastikan pengguna telah terotentikasi sebelum dapat mengakses halaman tertentu. Jika pengguna belum login, rute akan diarahkan kembali ke halaman login.
