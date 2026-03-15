import { Route, Routes } from "react-router";
/* Pages */
import LandingPage from './pages/LandingPage';
import ExtracurricularPage from './pages/ExtracurricularPage';
import AchievementsPage from './pages/AchievementsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import NewsPage from './pages/NewsPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminAchievementsPage from './pages/AdminAchievementsPage';
import AdminExtracurricularsPage from './pages/AdminExtracurricularsPage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminValidationPage from './pages/AdminValidationPage';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import AdminAccountsPage from './pages/AdminAccountsPage';
import VerifierOverviewPage from './pages/VerifierOverviewPage';
import VerifierDocumentsPage from './pages/VerifierDocumentsPage';
import ApplicantOverviewPage from './pages/ApplicantOverviewPage';
import ApplicantRegistrationPage from './pages/ApplicantRegistrationPage';
import ApplicantUploadPage from './pages/ApplicantUploadPage';
import ApplicantStatusPage from './pages/ApplicantStatusPage';
import ApplicantAnnouncementPage from './pages/ApplicantAnnouncementPage';
import NotFoundPage from './pages/NotFoundPage';


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
