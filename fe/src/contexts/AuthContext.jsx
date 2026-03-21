import { createContext, useEffect, useMemo, useState } from "react";
import { removeToken, getToken, setToken } from "@utils/token.js";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (payload) => {
    setToken(payload.token);
    const nextUser = {
      username: payload.username,
      name: payload.name,
      role: payload.role || "admin",
    };
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, error, setError, loading, setLoading, login, logout }), [user, error, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
