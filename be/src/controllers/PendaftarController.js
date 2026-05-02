import bcrypt from "bcryptjs";
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
} from "../services/PendaftarService.js";
import { generateToken } from "../utils/jwt.js";
import { nanoid } from "nanoid";
import EmailService from "../services/EmailService.js";

class PendaftarController {
	register = async (req, res) => {
		try {
			const pendaftar = await register(req.body);
			return res.status(201).json({
				message: "Registrasi berhasil",
				data: pendaftar,
			});
		} catch (error) {
			return res.status(400).json({
				message: "Gagal melakukan registrasi",
				error: error.message,
			});
		}
	};
	login = async (req, res) => {
		try {
			const { nisn, password } = req.body;
			if (!nisn || !password)
				return res.status(401).json({ message: "NISN atau Kata Sandi Tidak ada" });

			const pendaftar = await getPendaftar(nisn);
			if (!pendaftar) return res.status(404).json({ message: "Pendaftar Tidak Terdaftar" });

			if (!pendaftar.kata_sandi) {
				return res
					.status(400)
					.json({ message: "Pendaftar belum memiliki kata sandi, mohon hubungi admin" });
			}

			const isMatch = await bcrypt.compare(password, pendaftar.kata_sandi);
			if (!isMatch) return res.status(400).json({ message: "NISN atau Kata Sandi Salah" });

			const token = generateToken({ id: pendaftar.id_pendaftar, role: "pendaftar" });
			return res.status(200).json({
				message: "Masuk Berhasil",
				token,
				nama: pendaftar.nama_lengkap,
				nisn: pendaftar.nisn,
				role: "pendaftar",
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Terjadi kesalahan pada server", error: err.message });
		}
	};

	getMe = async (req, res) => {
		try {
			const id = req.user.id;
			const pendaftar = await getPendaftarById(id);
			if (!pendaftar) return res.status(404).json({ message: "Data pendaftar tidak ditemukan" });
			return res.status(200).json({ message: "success", data: pendaftar });
		} catch (error) {
			return res.status(500).json({ message: "Gagal mengambil biodata", error: error.message });
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
				return res.status(400).json({ message: "ID pendaftar dan status harus diisi" });
			}
			const allowedStatuses = ["wawancara orang tua", "lulus", "tidak lulus"];
			if (!allowedStatuses.includes(status.toLowerCase())) {
				return res.status(400).json({ message: "Status tidak valid. Admin hanya boleh set 'wawancara orang tua', 'lulus', atau 'tidak lulus'" });
			}
			console.log({ ids, status });
			await updateStatusMassal(ids, status);
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
					.json({ message: "NISN, kata sandi lama, dan kata sandi baru harus diisi" });
			}

			const pendaftar = await getPendaftar(nisn);
			if (!pendaftar) {
				return res.status(404).json({ message: "Pendaftar dengan NISN tersebut tidak ditemukan" });
			}

			if (!pendaftar.kata_sandi) {
				return res
					.status(400)
					.json({ message: "Pendaftar belum memiliki kata sandi, mohon hubungi admin" });
			}

			const isMatch = await bcrypt.compare(oldPassword, pendaftar.kata_sandi);
			if (!isMatch) {
				return res.status(400).json({ message: "Kata sandi lama salah" });
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
				return res.status(404).json({ message: "Pendaftar dengan ID tersebut tidak ditemukan" });
			}
			return res.status(200).json({ message: "success", data: status });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Gagal mengambil status pendaftar", error: error.message });
		}
	};

	forgotPassword = async (req, res) => {
		try {
			const { email } = req.body;
			if (!email) return res.status(400).json({ message: "Email wajib diisi" });

			const pendaftar = await getPendaftarByEmail(email);

			if (!pendaftar) {
				return res.status(404).json({ message: "Email tidak terdaftar di sistem" });
			}

			const token = nanoid(32);
			const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

			await setResetToken(pendaftar.id_pendaftar, token, expires);
			await EmailService.sendResetPasswordEmail(pendaftar.email, pendaftar.nama_lengkap, token);

			return res.status(200).json({ message: "Link reset password telah dikirim ke email Anda" });
		} catch (error) {
			console.error("Forgot Password Error:", error);

			// Specific handling for Resend testing mode (Developer friendly message)
			if (error.message === "RESEND_TESTING_RESTRICTION") {
				return res.status(403).json({ 
					message: "Pembatasan Resend Testing Mode: Email hanya bisa dikirim ke email pemilik akun Resend. Mohon verifikasi domain atau gunakan email owner untuk testing.",
					code: "RESEND_TESTING_MODE"
				});
			}

			return res.status(500).json({ 
				message: error.message || "Terjadi kesalahan saat memproses permintaan reset password" 
			});
		}
	};

	validateResetToken = async (req, res) => {
		try {
			const { token } = req.params;
			if (!token) return res.status(400).json({ message: "Token tidak valid" });

			const pendaftar = await getPendaftarByResetToken(token);
			if (!pendaftar) return res.status(400).json({ message: "Token tidak valid atau telah kadaluarsa" });

			return res.status(200).json({ 
				message: "Token valid", 
				data: { 
					nama: pendaftar.nama_lengkap,
					nisn: pendaftar.nisn 
				} 
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
				return res.status(400).json({ message: "Konfirmasi kata sandi tidak cocok" });
			}

			// Password policy validation
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!passwordRegex.test(newPassword)) {
				return res.status(400).json({ 
					message: "Kata sandi harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol" 
				});
			}

			const pendaftar = await getPendaftarByResetToken(token);
			if (!pendaftar) return res.status(400).json({ message: "Token tidak valid atau telah kadaluarsa" });

			await updatePassword(pendaftar.id_pendaftar, newPassword);
			await clearResetToken(pendaftar.id_pendaftar);

			return res.status(200).json({ message: "Kata sandi berhasil direset. Silakan login kembali." });
		} catch (error) {
			return res.status(500).json({ message: "Gagal mereset kata sandi" });
		}
	};
}

export default new PendaftarController();
