import { Route, Routes } from "react-router";
/* Pages */
import LandingPage from "./pages/public/LandingPage";
import ExtracurricularPage from "./pages/public/ExtracurricularPage";
import AchievementsPage from "./pages/public/AchievementsPage";
import NewsPage from "./pages/public/NewsPage";
import DetailBerita from "./pages/public/DetailBerita";

import PanduanPage from "./pages/public/PanduanPage";
import LoginPage from "./pages/auth/LoginPage";
import Register from "./pages/pendaftar/Register";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminAchievementsPage from "./pages/admin/AdminAchievementsPage";
import AdminExtracurricularsPage from "./pages/admin/AdminExtracurricularsPage";
import AdminNewsPage from "./pages/admin/AdminNewsPage";
import AdminValidationPage from "./pages/admin/AdminValidationPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminAccountsPage from "./pages/admin/AdminAccountsPage";
import AdminWavesPage from "./pages/admin/AdminWavesPage";
import VerifierOverviewPage from "./pages/verifikator/VerifierOverviewPage";
import VerifierDocumentsPage from "./pages/verifikator/VerifierDocumentsPage";
import ApplicantOverviewPage from "./pages/pendaftar/ApplicantOverviewPage";
import ApplicantRegistrationPage from "./pages/pendaftar/ApplicantRegistrationPage";
import ApplicantUploadPage from "./pages/pendaftar/ApplicantUploadPage";
import ApplicantStatusPage from "./pages/pendaftar/ApplicantStatusPage";
import ApplicantAnnouncementPage from "./pages/pendaftar/ApplicantAnnouncementPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import VisiMisiPage from "./pages/public/VisiMisiPage";
import SejarahPage from "./pages/public/SejarahPage";
import FasilitasPage from "./pages/public/FasilitasPage";
import Program from "./pages/public/ProgramPage";

// verifikator
import VerifikatorLayout from "./components/layout/VerifikatorLayout";
import BerandaVerifikator from "./pages/verifikator/BerandaVerifikator";

/* scrool */
import ScrolTop from "./components/common/ScrolTop";

function App() {
  return (
    <>
      <ScrolTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ekstrakurikuler" element={<ExtracurricularPage />} />
        <Route path="/prestasi" element={<AchievementsPage />} />
        <Route path="/berita" element={<NewsPage />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/visi-misi" element={<VisiMisiPage />} />
        <Route path="/sejarah" element={<SejarahPage />} />
        <Route path="/fasilitas" element={<FasilitasPage />} />
        <Route path="/program" element={<Program />} />

        <Route path="/panduan" element={<PanduanPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminOverviewPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="waves" element={<AdminWavesPage />} />
          <Route path="achievements" element={<AdminAchievementsPage />} />
          <Route
            path="extracurriculars"
            element={<AdminExtracurricularsPage />}
          />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="validation" element={<AdminValidationPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="accounts" element={<AdminAccountsPage />} />
        </Route>

        {/* Verifier Routes */}
        <Route path="/verifikator" element={<VerifikatorLayout />}>
          <Route index element={<BerandaVerifikator />} />
        </Route>

        {/* Applicant Routes */}
        <Route path="/applicant">
          <Route index element={<ApplicantOverviewPage />} />
          <Route path="registration" element={<ApplicantRegistrationPage />} />
          <Route path="upload" element={<ApplicantUploadPage />} />
          <Route path="status" element={<ApplicantStatusPage />} />
          <Route path="announcement" element={<ApplicantAnnouncementPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
