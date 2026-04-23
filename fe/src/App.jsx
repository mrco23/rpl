import { Route, Routes } from "react-router";

/* Layouts */
import PublicLayout from "./components/layout/PublicLayout";
import VerifikatorLayout from "./components/layout/VerifikatorLayout";
import AdminLayout from "./components/layout/AdminLayout";
import PendaftarLayout from "./components/layout/PendaftarLayout";

/* Pages */
import LandingPage from "./pages/public/LandingPage";
import ExtracurricularPage from "./pages/public/ExtracurricularPage";
import AchievementsPage from "./pages/public/AchievementsPage";
import NewsPage from "./pages/public/NewsPage";
import DetailBerita from "./pages/public/DetailBerita";
import PanduanPage from "./pages/public/PanduanPage";
import LoginPage from "./pages/auth/LoginPage";
import UbahKataSandiPage from "./pages/auth/UbahKataSandiPage";
import Register from "./pages/pendaftar/Register";
import NotFoundPage from "./pages/public/NotFoundPage";
import VisiMisiPage from "./pages/public/VisiMisiPage";
import SejarahPage from "./pages/public/SejarahPage";
import FasilitasPage from "./pages/public/FasilitasPage";
import Program from "./pages/public/ProgramPage";

// verifikator
import VerifikatorBerandaPage from "./pages/verifikator/VerifikatorBerandaPage";
import VerifikatorVerifikasiPage from "./pages/verifikator/VerifikatorVerifikasiPage";

/* Admin */
import AdminBeranda from "./pages/admin/AdminBeranda";
import AdminProgram from "./pages/admin/AdminProgram";
import AdminToVerifikator from "./pages/admin/AdminToVerifikator";
import AdminFasilitasPage from "./pages/admin/AdminFasilitasPage";
import AdminAchievementsPage from "./pages/admin/AdminAchievementsPage";
import AdminExtracurricularsPage from "./pages/admin/AdminEkstrakurikulerPage";
import AdminNewsPage from "./pages/admin/AdminNewsPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminPendaftarPage from "./pages/admin/AdminPendaftarPage";
import AdminGelombang from "./pages/admin/AdminGelombangPage";

/* Pendaftar */
import BerandaPendaftar from "./pages/pendaftar/BerandaPendaftar";
import UnggahDokumen from "./pages/pendaftar/UnggahDokumen";
import StatusVerifikasi from "./pages/pendaftar/StatusVerifikasi";
import Pengumuman from "./pages/pendaftar/Pengumuman";

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
          <Route path="/ekstrakurikuler" element={<ExtracurricularPage />} />
          <Route path="/prestasi" element={<AchievementsPage />} />
          <Route path="/berita" element={<NewsPage />} />
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
          <Route index element={<AdminBeranda />} />
          <Route path="profil" element={<AdminProfilSekolahPage />} />
          <Route path="prestasi" element={<AdminAchievementsPage />} />
          <Route
            path="ekstrakurikuler"
            element={<AdminExtracurricularsPage />}
          />
          <Route path="berita" element={<AdminNewsPage />} />
          <Route path="program" element={<AdminProgram />} />
          <Route path="pengumuman" element={<AdminNotificationsPage />} />
          <Route path="verifikator" element={<AdminToVerifikator />} />
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
          <Route index element={<BerandaPendaftar />} />
          <Route path="unggah-dokumen" element={<UnggahDokumen />} />
          <Route path="status-verifikasi" element={<StatusVerifikasi />} />
          <Route path="pengumuman" element={<Pengumuman />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
