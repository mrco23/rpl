import { createContext, useEffect, useMemo, useState } from "react";
import { removeToken, getToken, setToken } from "../../../shared/utils/token.js";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (payload) => {
    if (!payload?.token || payload.token === "undefined") return;
    setToken(payload.token);
    localStorage.setItem("token", payload.token);
    
    const finalRole = payload.role || "pendaftar";
    localStorage.setItem("role", finalRole);

    const nextUser = {
      username: payload.username || "",
      name: payload.name || "",
      role: finalRole,
    };
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, error, setError, loading, setLoading, login, logout }), [user, error, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
