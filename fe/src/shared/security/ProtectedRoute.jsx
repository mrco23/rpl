import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Tentukan route redirect default berdasarkan allowedRoles
    let redirectPath = "/login";
    if (allowedRoles && (allowedRoles.includes("admin") || allowedRoles.includes("verifikator") || allowedRoles.includes("kepala_sekolah"))) {
        redirectPath = "/akses-internal";
    }

    // Tidak ada token -> redirect ke login sesuai jenis role
    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    // Ada token tapi role tidak sesuai -> redirect ke login sesuai jenis role
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}
