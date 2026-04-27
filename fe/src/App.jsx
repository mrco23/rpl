import { Route, Routes } from "react-router";

/* Layouts */
import PublicLayout from "./components/layout/PublicLayout";
import VerifikatorLayout from "./components/layout/VerifikatorLayout";
import AdminLayout from "./components/layout/AdminLayout";
import PendaftarLayout from "./components/layout/PendaftarLayout";

/* Pages */
import LandingPage from "./pages/public/LandingPage";
import EkstrakurikulerPage from "./pages/public/EkstrakurikulerPage.jsx";
import PrestasiPage from "./pages/public/PrestasiPage.jsx";
import BeritaPage from "./pages/public/BeritaPage.jsx";
import DetailBerita from "./pages/public/DetailBeritaPage.jsx";
import PanduanPage from "./pages/public/PanduanPage";
import LoginPage from "./pages/auth/LoginPage";
import UbahKataSandiPage from "./pages/auth/UbahKataSandiPage";
import Register from "./pages/auth/PendaftaranPage.jsx";
import NotFoundPage from "./pages/public/NotFoundPage";
import VisiMisiPage from "./pages/public/VisiMisiPage";
import SejarahPage from "./pages/public/SejarahPage";
import FasilitasPage from "./pages/public/FasilitasPage";
import Program from "./pages/public/ProgramPage";

// verifikator
import VerifikatorBerandaPage from "./pages/verifikator/VerifikatorBerandaPage";
import VerifikatorVerifikasiPage from "./pages/verifikator/VerifikatorVerifikasiPage";

/* Admin */
import AdminBerandaPage from "./pages/admin/AdminBerandaPage.jsx";
import AdminProgramUnggulanPage from "./pages/admin/AdminProgramUnggulanPage.jsx";
import AdminVerifikatorPage from "./pages/admin/AdminVerifikatorPage.jsx";
import AdminFasilitasPage from "./pages/admin/AdminFasilitasPage";
import AdminAchievementsPage from "./pages/admin/AdminAchievementsPage";
import AdminExtracurricularsPage from "./pages/admin/AdminEkstrakurikulerPage";
import AdminBeritaPage from "./pages/admin/AdminBeritaPage.jsx";
import AdminPengumumanPage from "./pages/admin/AdminPengumumanPage.jsx";
import AdminPendaftarPage from "./pages/admin/AdminPendaftarPage";
import AdminGelombang from "./pages/admin/AdminGelombangPage";

/* Pendaftar */
import BerandaPendaftarPage from "./pages/pendaftar/BerandaPendaftarPage.jsx";
import UnggahDokumenPage from "./pages/pendaftar/UnggahDokumenPage.jsx";
import StatusVerifikasiPage from "./pages/pendaftar/StatusVerifikasiPage.jsx";
import PendaftarPengumumanPage from "./pages/pendaftar/PendaftarPengumumanPage.jsx";

/* scrool */
import ScrolTop from "./components/common/ScrolTop";
import AdminProfilSekolahPage from "./pages/admin/AdminProfilSekolahPage";

import ProtectedRoute from "./security/ProtectedRoute";

function App() {
  return (
    <>
      <ScrolTop />
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
          <Route path="status-verifikasi" element={<StatusVerifikasiPage />} />
          <Route path="pengumuman" element={<PendaftarPengumumanPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
