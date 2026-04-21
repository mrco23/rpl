import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Tidak ada token -> redirect ke login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Ada token tapi role tidak sesuai -> redirect ke login
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
}
