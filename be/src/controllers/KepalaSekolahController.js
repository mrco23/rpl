import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

class KepalaSekolahController {
	login = async (req, res) => {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				return res.status(400).json({ message: "Username dan password wajib diisi" });
			}

			const kepsek = await prisma.kepalaSekolah.findUnique({
				where: { username },
			});

			if (!kepsek) {
				return res.status(401).json({ message: "Username atau password salah" });
			}

			const isMatch = await bcrypt.compare(password, kepsek.password);
			if (!isMatch) {
				return res.status(401).json({ message: "Username atau password salah" });
			}

			if (!kepsek.status_aktif) {
				return res.status(403).json({ message: "Akun kepala sekolah tidak aktif." });
			}

			const token = generateToken({ id: kepsek.id_kepala_sekolah, username: kepsek.username, role: "kepala_sekolah" });

			res.status(200).json({
				message: "Login kepala sekolah berhasil",
				token,
				role: "kepala_sekolah",
				data: {
					id_kepala_sekolah: kepsek.id_kepala_sekolah,
					username: kepsek.username,
					nama: kepsek.nama,
				},
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	};
}

export default KepalaSekolahController;
