import {createContext, useState} from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const value = {
        user, setUser, error, setError, loading, setLoading
    }
    return <AuthContext value={value}>{children}</AuthContext>
}