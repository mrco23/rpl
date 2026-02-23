import {Outlet} from 'react-router';
import Navbar from "../common/Navbar.jsx";

export default function AdminLayout() {
    return <>
        <Navbar />
        <Outlet/>
    </>
}