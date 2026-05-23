import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import LoadingSpinner from '../shared/components/LoadingSpinner'

/* Layouts */
import PublicLayout from "../features/public-site/layouts/PublicLayout";
import VerifikatorLayout from "../features/verifikator/layouts/VerifikatorLayout";
import AdminLayout from "../features/admin/layouts/AdminLayout";
import PendaftarLayout from "../features/pendaftar/layouts/PendaftarLayout";
import KepalaSekolahLayout from "../features/kepala-sekolah/layouts/KepalaSekolahLayout";

/* Pages */
const LandingPage = lazy(() => import("../features/public-site/pages/LandingPage"));
const EkstrakurikulerPage = lazy(() => import("../features/public-site/pages/EkstrakurikulerPage.jsx"));
const PrestasiPage = lazy(() => import("../features/public-site/pages/PrestasiPage.jsx"));
const BeritaPage = lazy(() => import("../features/public-site/pages/BeritaPage.jsx"));
const DetailBerita = lazy(() => import("../features/public-site/pages/DetailBeritaPage.jsx"));
const PanduanPage = lazy(() => import("../features/public-site/pages/PanduanPage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const InternalLoginPage = lazy(() => import("../features/auth/pages/InternalLoginPage"));
const UbahKataSandiPage = lazy(() => import("../features/auth/pages/UbahKataSandiPage"));
const Register = lazy(() => import("../features/auth/pages/PendaftaranPage.jsx"));
const NotFoundPage = lazy(() => import("../features/public-site/pages/NotFoundPage"));
const VisiMisiPage = lazy(() => import("../features/public-site/pages/VisiMisiPage"));
const SejarahPage = lazy(() => import("../features/public-site/pages/SejarahPage"));
const FasilitasPage = lazy(() => import("../features/public-site/pages/FasilitasPage"));
const Program = lazy(() => import("../features/public-site/pages/ProgramPage"));

// verifikator
const VerifikatorBerandaPage = lazy(() => import("../features/verifikator/pages/VerifikatorBerandaPage"));
const VerifikatorVerifikasiPage = lazy(() => import("../features/verifikator/pages/VerifikatorVerifikasiPage"));

/* Admin */
const AdminBerandaPage = lazy(() => import("../features/admin/pages/AdminBerandaPage.jsx"));
const AdminProgramUnggulanPage = lazy(() => import("../features/admin/pages/AdminProgramUnggulanPage.jsx"));
const AdminVerifikatorPage = lazy(() => import("../features/admin/pages/AdminVerifikatorPage.jsx"));
const AdminFasilitasPage = lazy(() => import("../features/admin/pages/AdminFasilitasPage"));
const AdminAchievementsPage = lazy(() => import("../features/admin/pages/AdminAchievementsPage"));
const AdminExtracurricularsPage = lazy(() => import("../features/admin/pages/AdminEkstrakurikulerPage"));
const AdminBeritaPage = lazy(() => import("../features/admin/pages/AdminBeritaPage.jsx"));
const AdminPengumumanPage = lazy(() => import("../features/admin/pages/AdminPengumumanPage.jsx"));
const AdminGelombang = lazy(() => import("../features/admin/pages/AdminGelombangPage"));
const AdminProfilSekolahPage = lazy(() => import("../features/admin/pages/AdminProfilSekolahPage"));

/* Pendaftar */
const BerandaPendaftarPage = lazy(() => import("../features/pendaftar/pages/BerandaPendaftarPage.jsx"));
const AdminPendaftarPage = lazy(() => import("../features/admin/pages/AdminPendaftarPage.jsx"));
const KepalaSekolahPage = lazy(() => import("../features/admin/pages/KepalaSekolahPage.jsx"));
const UnggahDokumenPage = lazy(() => import("../features/pendaftar/pages/UnggahDokumenPage.jsx"));

const StatusVerifikasiPage = lazy(() => import("../features/pendaftar/pages/StatusVerifikasiPage.jsx"));
const PendaftarPengumumanPage = lazy(() => import("../features/pendaftar/pages/PendaftarPengumumanPage.jsx"));

/* Kepala Sekolah */
const BerandaKepalaSekolah = lazy(() => import("../features/kepala-sekolah/pages/BerandaKepalaSekolah.jsx"));
const LaporanPPDBPage = lazy(() => import("../features/kepala-sekolah/pages/LaporanPPDBPage.jsx"));
const MonitoringKontenPage = lazy(() => import("../features/kepala-sekolah/pages/MonitoringKontenPage.jsx"));

/* scrool */
import ScrolTop from "../shared/components/ScrolTop";

import ProtectedRoute from "../shared/security/ProtectedRoute";

function App() {
  return (
    <>
      <ScrolTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={"/"} element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
            <Route path="/prestasi" element={<PrestasiPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:id" element={<DetailBerita />} />
            <Route path="/visi-misi" element={<VisiMisiPage />} />
            <Route path="/sejarah" element={<SejarahPage />} />
            <Route path="/fasilitas" element={<FasilitasPage />} />
            <Route path="/program" element={<Program />} />
            <Route path="/panduan" element={<PanduanPage />} />
            <Route path="/info-ppdb" element={<PanduanPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/akses-internal" element={<InternalLoginPage />} />
          <Route path="/ubah-kata-sandi" element={<UbahKataSandiPage />} />
          <Route path="/reset-password" element={<UbahKataSandiPage />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminBerandaPage />} />
            <Route path="profil" element={<AdminProfilSekolahPage />} />
            <Route path="prestasi" element={<AdminAchievementsPage />} />
            <Route
              path="ekstrakurikuler"
              element={<AdminExtracurricularsPage />}
            />
            <Route path="berita" element={<AdminBeritaPage />} />
            <Route path="program" element={<AdminProgramUnggulanPage />} />
            <Route path="pengumuman" element={<AdminPengumumanPage />} />
            <Route path="verifikator" element={<AdminVerifikatorPage />} />
            <Route path="fasilitas" element={<AdminFasilitasPage />} />
            <Route path="ppdb" element={<AdminPendaftarPage />} />
            <Route path="gelombang" element={<AdminGelombang />} />
            <Route path="kepala-sekolah" element={<KepalaSekolahPage />} />
          </Route>

          {/* Verifier Routes */}
          <Route
            path="/verifikator"
            element={
              <ProtectedRoute allowedRoles={["verifikator"]}>
                <VerifikatorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VerifikatorBerandaPage />} />
            <Route path="verifikasi" element={<VerifikatorVerifikasiPage />} />
          </Route>

          {/* Kepala Sekolah Routes */}
          <Route
            path="/kepala-sekolah"
            element={
              <ProtectedRoute allowedRoles={["kepala_sekolah"]}>
                <KepalaSekolahLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BerandaKepalaSekolah />} />
            <Route path="beranda" element={<BerandaKepalaSekolah />} />
            <Route path="laporan" element={<LaporanPPDBPage />} />
            <Route path="monitoring-konten" element={<MonitoringKontenPage />} />
          </Route>

          {/* pendaftar Routes */}
          <Route
            path="/pendaftar"
            element={
              <ProtectedRoute allowedRoles={["pendaftar"]}>
                <PendaftarLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BerandaPendaftarPage />} />
            <Route path="unggah-dokumen" element={<UnggahDokumenPage />} />
            <Route path="status-pendaftaran" element={<StatusVerifikasiPage />} />
            <Route path="pengumuman" element={<PendaftarPengumumanPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
