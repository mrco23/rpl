import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

/* Layouts */
import PublicLayout from "./components/layout/PublicLayout";
import VerifikatorLayout from "./components/layout/VerifikatorLayout";
import AdminLayout from "./components/layout/AdminLayout";
import PendaftarLayout from "./components/layout/PendaftarLayout";

/* Pages */
const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const EkstrakurikulerPage = lazy(() => import("./pages/public/EkstrakurikulerPage.jsx"));
const PrestasiPage = lazy(() => import("./pages/public/PrestasiPage.jsx"));
const BeritaPage = lazy(() => import("./pages/public/BeritaPage.jsx"));
const DetailBerita = lazy(() => import("./pages/public/DetailBeritaPage.jsx"));
const PanduanPage = lazy(() => import("./pages/public/PanduanPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const UbahKataSandiPage = lazy(() => import("./pages/auth/UbahKataSandiPage"));
const Register = lazy(() => import("./pages/auth/PendaftaranPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/public/NotFoundPage"));
const VisiMisiPage = lazy(() => import("./pages/public/VisiMisiPage"));
const SejarahPage = lazy(() => import("./pages/public/SejarahPage"));
const FasilitasPage = lazy(() => import("./pages/public/FasilitasPage"));
const Program = lazy(() => import("./pages/public/ProgramPage"));

// verifikator
const VerifikatorBerandaPage = lazy(() => import("./pages/verifikator/VerifikatorBerandaPage"));
const VerifikatorVerifikasiPage = lazy(() => import("./pages/verifikator/VerifikatorVerifikasiPage"));

/* Admin */
const AdminBerandaPage = lazy(() => import("./pages/admin/AdminBerandaPage.jsx"));
const AdminProgramUnggulanPage = lazy(() => import("./pages/admin/AdminProgramUnggulanPage.jsx"));
const AdminVerifikatorPage = lazy(() => import("./pages/admin/AdminVerifikatorPage.jsx"));
const AdminFasilitasPage = lazy(() => import("./pages/admin/AdminFasilitasPage"));
const AdminAchievementsPage = lazy(() => import("./pages/admin/AdminAchievementsPage"));
const AdminExtracurricularsPage = lazy(() => import("./pages/admin/AdminEkstrakurikulerPage"));
const AdminBeritaPage = lazy(() => import("./pages/admin/AdminBeritaPage.jsx"));
const AdminPengumumanPage = lazy(() => import("./pages/admin/AdminPengumumanPage.jsx"));
const AdminPendaftarPage = lazy(() => import("./pages/admin/AdminPendaftarPage"));
const AdminGelombang = lazy(() => import("./pages/admin/AdminGelombangPage"));
const AdminProfilSekolahPage = lazy(() => import("./pages/admin/AdminProfilSekolahPage"));

/* Pendaftar */
const BerandaPendaftarPage = lazy(() => import("./pages/pendaftar/BerandaPendaftarPage.jsx"));
const UnggahDokumenPage = lazy(() => import("./pages/pendaftar/UnggahDokumenPage.jsx"));
const StatusVerifikasiPage = lazy(() => import("./pages/pendaftar/StatusVerifikasiPage.jsx"));
const PendaftarPengumumanPage = lazy(() => import("./pages/pendaftar/PendaftarPengumumanPage.jsx"));

/* scrool */
import ScrolTop from "./components/common/ScrolTop";

import ProtectedRoute from "./security/ProtectedRoute";

function App() {
  return (
    <>
      <ScrolTop />
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
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
          </Route>
          <Route path="/login" element={<LoginPage />} />
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
