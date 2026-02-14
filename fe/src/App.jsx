import {useState} from "react";
import {Route, Routes} from "react-router";
/* Pages */
import LandingPage from "./pages/LandingPage";
import UserBeranda from "./pages/UserBeranda.jsx";

/* Layouts */
import UserLayout from "./layouts/UserLayout.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (<>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route>
                <Route path="/user" element={<UserLayout/>}>
                    <Route path={'/beranda'} element={<UserBeranda/>}/>
                    <Route path={'/presensi'} element={<UserPresensi/>}/>
                </Route>
            </Route>
        </Routes>
    </>);
}

export default App;
