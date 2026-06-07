import bcrypt from "bcryptjs";
import { validatePendaftarRegisterPayload } from "../utils/pendaftarValidation.js";
import {
    getPendaftar,
    getPendaftarById,
    getStatusById,
    register,
    getAllPendaftar,
    updateStatusMassal,
    updatePassword,
    getPendaftarByEmail,
    setResetToken,
    getPendaftarByResetToken,
    clearResetToken,
    deletePendaftar,
} from "../services/PendaftarService.js";
import { generateToken } from "../utils/jwt.js";
import { nanoid } from "nanoid";
import EmailService from "../services/EmailService.js";
import {
    normalizeStatusPendaftaran,
    isStatusAdminAllowed,
} from "../constants/statusPendaftaran.js";

class PendaftarController {
    register = async (req, res) => {
        try {
            const { isValid, errors, sanitizedData } = validatePendaftarRegisterPayload(
                req.body,
            );

            if (!isValid) {
                return res.status(400).json({
                    message: "Validasi pendaftaran gagal",
                    errors,
                });
            }

            const pendaftar = await register(sanitizedData);
            return res.status(201).json({
                message: "Registrasi berhasil",
                data: pendaftar,
            });
        } catch (error) {
            console.error("[register] error:", {
                message: error.message,
                code: error.code,
                meta: error.meta,
            });

            // Prisma unique-constraint violation
            if (error.code === "P2002") {
                const fields = error.meta?.target ?? [];
                if (fields.includes("email")) {
                    return res
                        .status(409)
                        .json({ message: "Email sudah digunakan oleh pendaftar lain." });
                }
                if (fields.includes("nisn")) {
                    return res
                        .status(409)
                        .json({ message: "NISN sudah digunakan oleh pendaftar lain." });
                }
                return res
                    .status(409)
                    .json({ message: "Data pendaftar sudah pernah digunakan." });
            }

            // Prisma null-constraint violation (P2011)
            // This occurs when id_pendaftar could not be obtained from the TiDB sequence
            // (e.g. the sequence object seq_pendaftar_id has not been created yet).
            if (error.code === "P2011") {
                return res.status(500).json({
                    message:
                        "Terjadi gangguan pada penyimpanan data pendaftaran. Silakan hubungi administrator.",
                });
            }

            // Known service-level errors (closed batch, full quota, duplicate NISN/email)
            const knownStatus = error.statusCode;
            if (knownStatus === 400 || knownStatus === 409) {
                return res.status(knownStatus).json({ message: error.message });
            }

            // Unknown / unexpected errors → 500
            return res.status(500).json({
                message: "Terjadi kesalahan pada server saat melakukan registrasi.",
            });
        }
    };
    login = async (req, res) => {
        try {
            const { nisn, password } = req.body;
            if (!nisn || !password)
                return res
                    .status(401)
                    .json({ message: "NISN atau Kata Sandi Tidak ada" });

            const pendaftar = await getPendaftar(nisn);
            if (!pendaftar)
                return res.status(404).json({ message: "Pendaftar Tidak Terdaftar" });

            if (!pendaftar.kata_sandi) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Pendaftar belum memiliki kata sandi, mohon hubungi admin",
                    });
            }

            const isMatch = await bcrypt.compare(password, pendaftar.kata_sandi);
            if (!isMatch)
                return res.status(400).json({ message: "NISN atau Kata Sandi Salah" });

            const token = generateToken({
                id: pendaftar.id_pendaftar,
                role: "pendaftar",
            });
            return res.status(200).json({
                message: "Masuk Berhasil",
                token,
                nama: pendaftar.nama_lengkap,
                nisn: pendaftar.nisn,
                role: "pendaftar",
            });
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Terjadi kesalahan pada server", error: err.message });
        }
    };

    getMe = async (req, res) => {
        try {
            const id = req.user.id;
            const pendaftar = await getPendaftarById(id);
            if (!pendaftar)
                return res
                    .status(404)
                    .json({ message: "Data pendaftar tidak ditemukan" });
            return res.status(200).json({ message: "success", data: pendaftar });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Gagal mengambil biodata", error: error.message });
        }
    };

    getAllPendaftar = async (req, res) => {
        try {
            const data = await getAllPendaftar();
            return res.status(200).json({ message: "success", data });
        } catch (error) {
            return res.status(500).json({
                message: "Gagal mengambil data pendaftar",
                error: error.message,
            });
        }
    };

    updateStatusMassal = async (req, res) => {
        try {
            const { ids, status } = req.body;
            if (!ids || !status) {
                return res
                    .status(400)
                    .json({ message: "ID pendaftar dan status harus diisi" });
            }
            const mappedStatus = normalizeStatusPendaftaran(status);
            if (!mappedStatus || !isStatusAdminAllowed(mappedStatus)) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Status tidak valid. Admin hanya boleh set 'wawancara orang tua', 'lulus', atau 'tidak lulus'",
                    });
            }
            console.log({ ids, status: mappedStatus });
            await updateStatusMassal(ids, mappedStatus);
            return res
                .status(200)
                .json({ message: "Berhasil memperbarui status pendaftar secara massal" });
        } catch (error) {
            return res.status(500).json({
                message: "Gagal memperbarui status pendaftar",
                error: error.message,
            });
        }
    };

    changePassword = async (req, res) => {
        try {
            const { nisn, oldPassword, newPassword } = req.body;
            if (!nisn || !oldPassword || !newPassword) {
                return res
                    .status(400)
                    .json({
                        message: "NISN, kata sandi lama, dan kata sandi baru harus diisi",
                    });
            }

            const pendaftar = await getPendaftar(nisn);
            if (!pendaftar) {
                return res
                    .status(404)
                    .json({ message: "Pendaftar dengan NISN tersebut tidak ditemukan" });
            }

            if (!pendaftar.kata_sandi) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Pendaftar belum memiliki kata sandi, mohon hubungi admin",
                    });
            }

            const isMatch = await bcrypt.compare(oldPassword, pendaftar.kata_sandi);
            if (!isMatch) {
                return res.status(400).json({ message: "Kata sandi lama salah" });
            }

            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
            if (!passwordRegex.test(newPassword)) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol.",
                    });
            }

            await updatePassword(pendaftar.id_pendaftar, newPassword);

            return res.status(200).json({ message: "Kata sandi berhasil diperbarui" });
        } catch (error) {
            return res.status(500).json({
                message: "Gagal memperbarui kata sandi",
                error: error.message,
            });
        }
    };

    getStatusById = async (req, res) => {
        try {
            const { id } = req.user;
            const status = await getStatusById(id);
            if (!status) {
                return res
                    .status(404)
                    .json({ message: "Pendaftar dengan ID tersebut tidak ditemukan" });
            }
            return res.status(200).json({ message: "success", data: status });
        } catch (error) {
            return res
                .status(500)
                .json({
                    message: "Gagal mengambil status pendaftar",
                    error: error.message,
                });
        }
    };

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "Email wajib diisi" });

            const pendaftar = await getPendaftarByEmail(email);

            if (!pendaftar) {
                return res
                    .status(404)
                    .json({ message: "Email tidak terdaftar di sistem" });
            }

            const token = nanoid(32);
            const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

            await setResetToken(pendaftar.id_pendaftar, token, expires);
            await EmailService.sendResetPasswordEmail(
                pendaftar.email,
                pendaftar.nama_lengkap,
                token,
            );

            return res
                .status(200)
                .json({ message: "Link reset password telah dikirim ke email Anda" });
        } catch (error) {
            console.error("Forgot Password Error:", error);

            // Specific handling for Resend testing mode (Developer friendly message)
            if (error.message === "RESEND_TESTING_RESTRICTION") {
                return res.status(403).json({
                    message:
                        "Pembatasan Resend Testing Mode: Email hanya bisa dikirim ke email pemilik akun Resend. Mohon verifikasi domain atau gunakan email owner untuk testing.",
                    code: "RESEND_TESTING_MODE",
                });
            }

            return res.status(500).json({
                message:
                    error.message ||
                    "Terjadi kesalahan saat memproses permintaan reset password",
            });
        }
    };

    validateResetToken = async (req, res) => {
        try {
            const { token } = req.params;
            if (!token) return res.status(400).json({ message: "Token tidak valid" });

            const pendaftar = await getPendaftarByResetToken(token);
            if (!pendaftar)
                return res
                    .status(400)
                    .json({ message: "Token tidak valid atau telah kadaluarsa" });

            return res.status(200).json({
                message: "Token valid",
                data: {
                    nama: pendaftar.nama_lengkap,
                    nisn: pendaftar.nisn,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Gagal memvalidasi token" });
        }
    };

    resetPassword = async (req, res) => {
        try {
            const { token, newPassword, confirmPassword } = req.body;

            if (!token || !newPassword || !confirmPassword) {
                return res.status(400).json({ message: "Data tidak lengkap" });
            }

            if (newPassword !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: "Konfirmasi kata sandi tidak cocok" });
            }

            // Password policy validation
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
            if (!passwordRegex.test(newPassword)) {
                return res.status(400).json({
                    message:
                        "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol.",
                });
            }

            const pendaftar = await getPendaftarByResetToken(token);
            if (!pendaftar)
                return res
                    .status(400)
                    .json({ message: "Token tidak valid atau telah kadaluarsa" });

            await updatePassword(pendaftar.id_pendaftar, newPassword);
            await clearResetToken(pendaftar.id_pendaftar);

            return res
                .status(200)
                .json({ message: "Kata sandi berhasil direset. Silakan login kembali." });
        } catch (error) {
            return res.status(500).json({ message: "Gagal mereset kata sandi" });
        }
    };

    deletePendaftarById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: "ID pendaftar harus diisi" });

            await deletePendaftar(id);
            return res.status(200).json({ message: "Pendaftar berhasil dihapus" });
        } catch (error) {
            const status = error.message === "Pendaftar tidak ditemukan" ? 404 : 500;
            return res.status(status).json({
                message: "Gagal menghapus pendaftar",
                error: error.message,
            });
        }
    };
}

export default new PendaftarController();
