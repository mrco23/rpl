import {Route, Routes} from "react-router";
/* Pages */
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import PendaftaranPage from "./pages/PendaftaranPage.jsx";
import AdminProfilSekolah from "./pages/Admin/AdminProfilSekolah.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/*Security*/
import ProtectedRoute from "./Security/ProtectedRoute.jsx";

/* Layouts */
import AdminLayout from './components/layout/AdminLayout.jsx'


function App() {
    return (<>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/pendaftaran" element={<PendaftaranPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path={"profil-sekolah"} element={<AdminProfilSekolah/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </>);
}

export default App;
