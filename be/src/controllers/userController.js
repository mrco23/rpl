import prisma from "../config/prisma.js";

// 1. Lihat Profil Sendiri
export const getMyProfile = async (req, res) => {
	try {
		// req.user.id didapat dari authMiddleware
		const userId = req.user.id;

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				// Pilih field yg mau ditampilkan (password JANGAN ditampilkan)
				id: true,
				name: true,
				email: true,
				photoProfile: true,
				createdAt: true,
			},
		});

		if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

		// Modifikasi output foto agar jadi URL lengkap
		if (user.photoProfile) {
			user.photoUrl = `${req.protocol}://${req.get("host")}/uploads/${user.photoProfile}`;
		}

		res.json({ data: user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// 2. Update Profil (Nama & Foto)
export const updateProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name } = req.body;

		// Siapkan objek data yg mau diupdate
		let updateData = {};

		// Jika user kirim nama, masukkan ke updateData
		if (name) updateData.name = name;

		// Jika user upload foto, masukkan nama filenya ke updateData
		if (req.file) {
			updateData.photoProfile = req.file.filename;
		}

		// Lakukan update di Prisma
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateData,
			select: { id: true, name: true, email: true, photoProfile: true },
		});

		res.json({
			message: "Profil berhasil diupdate",
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).json({ message: "Gagal update profil: " + error.message });
	}
};
