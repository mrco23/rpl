export const adminSidebar = [
  { label: 'Beranda', route: '/admin' },
  { label: 'Profil Sekolah', route: '/admin/profile' },
  { label: 'Kelola Gelombang', route: '/admin/waves' },
  { label: 'Kelola Prestasi', route: '/admin/achievements' },
  { label: 'Kelola Ekstrakurikuler', route: '/admin/extracurriculars' },
  { label: 'Kelola Berita', route: '/admin/news' },
  { label: 'Validasi Siswa', route: '/admin/validation' },
  { label: 'Notifikasi Massal', route: '/admin/notifications' },
  { label: 'Manajemen Akun', route: '/admin/accounts' }
];

export const verifierSidebar = [
  { label: 'Overview', route: '/verifier' },
  { label: 'Verifikasi Dokumen', route: '/verifier/documents' }
];

export const applicantSidebar = [
  { label: 'Overview', route: '/applicant' },
  { label: 'Form Pendaftaran', route: '/applicant/registration' },
  { label: 'Upload Dokumen', route: '/applicant/upload' },
  { label: 'Monitoring Status', route: '/applicant/status' },
  { label: 'Hasil Seleksi', route: '/applicant/announcement' }
];
