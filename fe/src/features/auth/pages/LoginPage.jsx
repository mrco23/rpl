import React, { useState } from "react";
import hero from "../../../shared/assets/hero.webp";
import { Eye, EyeOff } from "lucide-react";
import { loginService } from "../services/authService.js";
import useAuth from "../contexts/useAuth.js";
import { useNavigate, Link } from "react-router";
import Modal from "../../../shared/components/Modal.jsx";
import { forgotPassword as forgotPasswordApi } from "../../pendaftar/services/pendaftarService.js";
import { Info, CheckCircle2, XCircle } from "lucide-react";

export default function LoginPage() {
    const role = "pendaftar";
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);
    const [forgotError, setForgotError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            setError("NISN dan password wajib diisi");
            setSubmitting(false);
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            let payload = {
                password,
                role,
            };

            // Pendaftar login menggunakan nisn
            payload.nisn = identifier;

            const data = await loginService(payload);

            console.log(data);

            const token = data?.token;
            let finalRole = data?.role;

            if (!token) {
                setError("Token tidak ditemukan atau invalid.");
                setSubmitting(false);
                return;
            }

            const decodeJwtRole = (jwtBlob) => {
                try {
                    const payloadB64 = jwtBlob.split(".")[1];
                    if (!payloadB64) return null;
                    const decodedStr = atob(
                        payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
                    );
                    return JSON.parse(decodedStr)?.role || null;
                } catch (e) {
                    console.error("Gagal mendecode token:", e);
                    return null;
                }
            };

            if (!finalRole && token) {
                finalRole = decodeJwtRole(token);
            }

            if (!finalRole) {
                finalRole = role;
            }

            // Melanjutkan ke auth context dan redirect
            login({ ...data, role: finalRole, token });

            navigate("/pendaftar");
        } catch (err) {
            console.log("ERROR:", err.response?.data);
            setError(err.message || "Login gagal");
        } finally {
            setSubmitting(false);
        }
    };

    const [forgotErrorCode, setForgotErrorCode] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!forgotEmail) {
            setForgotError("Email wajib diisi");
            return;
        }

        setForgotLoading(true);
        setForgotError("");
        setForgotErrorCode("");
        setForgotSuccess(false);

        try {
            await forgotPasswordApi(forgotEmail);
            setForgotSuccess(true);
        } catch (err) {
            const message = err.message || "Terjadi kesalahan";
            const code = err.code || "";
            setForgotError(message);
            setForgotErrorCode(code);
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 h-full relative overflow-hidden">
                {/* ✅ BACKGROUND IMAGE (BLUR) */}
                <div
                    className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 brightness-50"
                    style={{ backgroundImage: `url(${hero})` }}
                ></div>

                {/* ✅ OVERLAY GELAP */}
                <div className="absolute inset-0 bg-black/35"></div>

                {/* ✅ CONTENT (TIDAK BLUR) */}
                <div className="relative z-10 w-full flex flex-col justify-center p-16 text-white">
                    <h1 className="text-4xl font-bold mb-4">
                        Satu Platform untuk Seluruh Proses Pendaftaran
                    </h1>
                    <p className="text-lg">
                        Dirancang agar admin, verifikator, dan pendaftar bekerja lebih
                        cepat dengan alur yang terstruktur.
                    </p>
                    <p className="mt-6 text-sm opacity-80">
                        SMP Katolik St. Rafael Manado
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full lg:w-1/2 items-start justify-center px-4 lg:px-14 pt-8">
                <form onSubmit={handleLogin} className="w-130 max-w-xl rounded-2xl p-9">
                    <h2 className="text-3xl text-center font-bold mb-4">
                        Masuk Pendaftar
                    </h2>
                    <p className="text-center text-gray-500 mb-8 text-sm">
                        Gunakan NISN SD dan kata sandi untuk masuk ke akun pendaftar.
                    </p>

                    {/* EMAIL */}
                    <div className="mb-5">
                        <label className="text-sm">NISN SD</label>
                        <input
                            type="text"
                            required
                            placeholder="Masukkan NISN SD"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-2 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="text-base">Kata Sandi</label>

                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Masukkan kata sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-2 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500 transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                        <p className="text-xs text-end mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setForgotError("");
                                    setForgotSuccess(false);
                                    setShowForgotModal(true);
                                }}
                                className="text-slate-500 font-medium active:text-blue-800 hover:text-blue-800 hover:underline cursor-pointer border-none bg-transparent p-0"
                            >
                                Lupa kata sandi?
                            </button>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
                            {error}
                        </div>
                    )}
                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-dark text-white py-3 rounded-lg hover:bg-blue-dark-hover cursor-pointer active:bg-blue-dark-active transition"
                    >
                        {submitting ? "Memproses..." : "Masuk Pendaftar"}
                    </button>

                    {/* REGISTER */}
                    <p className="text-sm text-center mt-4">
                        Kamu Belum Mendaftar?{" "}
                        <Link
                            to={"/register"}
                            className="text-blue-600 active:text-blue-800 cursor-pointer hover:text-blue-700 hover:text-semibold hover:underline"
                        >
                            daftar disini!
                        </Link>
                    </p>

                    <div className="mt-3 text-center border-t border-gray-100 pt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-dark transition-all duration-300 font-medium group"
                        >
                            <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-dark transition-colors">
                                ←
                            </span>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </form>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            <Modal
                open={showForgotModal}
                onClose={() => !forgotLoading && setShowForgotModal(false)}
                className={"max-w-xl"}
                title={
                    forgotSuccess
                        ? "Email Terkirim"
                        : forgotError === "Email tidak terdaftar di sistem"
                          ? "Email Tidak Terdaftar"
                          : "Lupa Kata Sandi"
                }
            >
                <div className="p-2">
                    {forgotSuccess ? (
                        <div className="flex flex-col items-center text-center py-4">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 size={48} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Periksa Email Anda
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
                                Tautan untuk mengatur ulang kata sandi Anda telah dikirim
                                ke <strong>{forgotEmail}</strong>. Silakan periksa kotak
                                masuk atau spam email Anda.
                            </p>
                            <button
                                onClick={() => setShowForgotModal(false)}
                                className="w-full bg-blue-dark text-white py-3 rounded-xl font-bold hover:bg-blue-dark-hover active:bg-blue-dark-active transition-colors cursor-pointer shadow-md"
                            >
                                Tutup
                            </button>
                        </div>
                    ) : forgotError === "Email tidak terdaftar di sistem" ||
                      forgotErrorCode === "RESEND_TESTING_MODE" ? (
                        <div className="flex flex-col items-center text-center py-4">
                            <div
                                className={`w-20 h-20 ${forgotErrorCode === "RESEND_TESTING_MODE" ? "bg-orange-100" : "bg-red-100"} rounded-full flex items-center justify-center mb-6`}
                            >
                                {forgotErrorCode === "RESEND_TESTING_MODE" ? (
                                    <Info size={48} className="text-orange-600" />
                                ) : (
                                    <XCircle size={48} className="text-red-600" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {forgotErrorCode === "RESEND_TESTING_MODE"
                                    ? "Batas Testing Mode"
                                    : "Email Tidak Terdaftar"}
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
                                {forgotErrorCode === "RESEND_TESTING_MODE" ? (
                                    <>
                                        Layanan email saat ini dalam{" "}
                                        <strong>Mode Testing</strong>. Email hanya dapat
                                        dikirim ke email pemilik akun Resend (Developer).
                                        <br />
                                        <br />
                                        <span className="text-xs text-orange-700 bg-orange-50 p-2 rounded block">
                                            <strong>Developer Note:</strong> {forgotError}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Maaf, email <strong>{forgotEmail}</strong> tidak
                                        ditemukan di sistem kami. Pastikan email yang Anda
                                        masukkan sudah terdaftar.
                                    </>
                                )}
                            </p>
                            <button
                                onClick={() => {
                                    setForgotError("");
                                    setForgotErrorCode("");
                                }}
                                className="w-full bg-blue-dark text-white py-3 rounded-xl font-bold hover:bg-blue-dark-hover active:bg-blue-dark-active transition-colors cursor-pointer shadow-md"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleForgotPassword}>
                            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
                                <Info className="text-blue-600 shrink-0" size={20} />
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Masukkan alamat email Anda yang terdaftar. Kami akan
                                    mengirimkan tautan untuk mereset kata sandi Anda.
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="nama@email.com"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                                />
                                {forgotError && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {forgotError}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={forgotLoading}
                                    className="w-full bg-blue-dark text-white py-2 rounded-lg font-semibold hover:bg-blue-dark-hover active:bg-blue-dark-active transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                                >
                                    {forgotLoading ? "Mengirim..." : "Kirim Link Reset"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotModal(false)}
                                    disabled={forgotLoading}
                                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors cursor-pointer bg-gray-50 rounded-lg"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
}
