import {useState} from "react";
import {Route, Routes} from "react-router";
/* Pages */
import LandingPage from "./pages/LandingPage";
import GuruBeranda from "./pages/Guru/GuruBeranda.jsx";
import GuruPresensi from "./pages/Guru/GuruPresensi.jsx";

/* Layouts */
import UserLayout from "./layouts/UserLayout.jsx";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route>
                <Route path="/user" element={<UserLayout/>}>
                    <Route path={'beranda'} element={<GuruBeranda/>}/>
                    <Route path={'presensi'} element={<GuruPresensi/>}/>
                </Route>
            </Route>
        </Routes>
    </>);
}

export default App;
