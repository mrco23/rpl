import { Route, Routes } from "react-router";
/* Pages */
import LandingPage from "./pages/public/LandingPage";
import ExtracurricularPage from "./pages/public/ExtracurricularPage";
import AchievementsPage from "./pages/public/AchievementsPage";
import FacilitiesPage from "./pages/public/FacilitiesPage";
import NewsPage from "./pages/public/NewsPage";
import GuidePage from "./pages/public/GuidePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/pendaftar/ApplicantRegisterPage";
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
        <Route path="/fasilitas" element={<FacilitiesPage />} />
        <Route path="/berita" element={<NewsPage />} />

        <Route path="/panduan" element={<GuidePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminOverviewPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="waves" element={<AdminWavesPage />} />
          <Route path="achievements" element={<AdminAchievementsPage />} />
          <Route path="extracurriculars" element={<AdminExtracurricularsPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="validation" element={<AdminValidationPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="accounts" element={<AdminAccountsPage />} />
        </Route>

        {/* Verifier Routes */}
        <Route path="/verifier">
          <Route index element={<VerifierOverviewPage />} />
          <Route path="documents" element={<VerifierDocumentsPage />} />
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
