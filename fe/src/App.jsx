import { Route, Routes } from "react-router";
/* Pages */
import LandingPage from './pages/public/LandingPage';
import ExtracurricularPage from './pages/public/ExtracurricularPage';
import AchievementsPage from './pages/public/AchievementsPage';
import FacilitiesPage from './pages/public/FacilitiesPage';
import NewsPage from './pages/public/NewsPage';
import GuidePage from './pages/public/GuidePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminAchievementsPage from './pages/admin/AdminAchievementsPage';
import AdminExtracurricularsPage from './pages/admin/AdminExtracurricularsPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminValidationPage from './pages/admin/AdminValidationPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminAccountsPage from './pages/admin/AdminAccountsPage';
import VerifierOverviewPage from './pages/verifikator/VerifierOverviewPage';
import VerifierDocumentsPage from './pages/verifikator/VerifierDocumentsPage';
import ApplicantOverviewPage from './pages/pendaftar/ApplicantOverviewPage';
import ApplicantRegistrationPage from './pages/pendaftar/ApplicantRegistrationPage';
import ApplicantUploadPage from './pages/pendaftar/ApplicantUploadPage';
import ApplicantStatusPage from './pages/pendaftar/ApplicantStatusPage';
import ApplicantAnnouncementPage from './pages/pendaftar/ApplicantAnnouncementPage';
import NotFoundPage from './pages/public/NotFoundPage';


function App() {
    return (<>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ekstrakurikuler" element={<ExtracurricularPage />} />
            <Route path="/prestasi" element={<AchievementsPage />} />
            <Route path="/fasilitas" element={<FacilitiesPage />} />
            <Route path="/berita" element={<NewsPage />} />
            <Route path="/panduan" element={<GuidePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminOverviewPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/achievements" element={<AdminAchievementsPage />} />
            <Route path="/admin/extracurriculars" element={<AdminExtracurricularsPage />} />
            <Route path="/admin/news" element={<AdminNewsPage />} />
            <Route path="/admin/validation" element={<AdminValidationPage />} />
            <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
            <Route path="/admin/accounts" element={<AdminAccountsPage />} />
            <Route path="/verifier" element={<VerifierOverviewPage />} />
            <Route path="/verifier/documents" element={<VerifierDocumentsPage />} />
            <Route path="/applicant" element={<ApplicantOverviewPage />} />
            <Route path="/applicant/registration" element={<ApplicantRegistrationPage />} />
            <Route path="/applicant/upload" element={<ApplicantUploadPage />} />
            <Route path="/applicant/status" element={<ApplicantStatusPage />} />
            <Route path="/applicant/announcement" element={<ApplicantAnnouncementPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>);
}

export default App;
