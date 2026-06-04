import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class AdminKepalaSekolahController {
  getAll = async (req, res) => {
    try {
      const data = await prisma.kepalaSekolah.findMany({
        select: {
          id_kepala_sekolah: true,
          username: true,
          nama: true,
          status_aktif: true,
          created_at: true,
          updated_at: true,
        },
      });
      res.status(200).json({ message: "Success", data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const { nama, username, password, status_aktif } = req.body;

      if (!nama || !username || !password) {
        return res.status(400).json({ message: "Nama, username, dan password wajib diisi" });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol." });
      }

      const existingUser = await prisma.kepalaSekolah.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const isAktif = status_aktif !== undefined ? status_aktif : true;

      let newUser;
      await prisma.$transaction(async (tx) => {
        if (isAktif) {
          await tx.kepalaSekolah.updateMany({
            where: { status_aktif: true },
            data: { status_aktif: false },
          });
        }
        newUser = await tx.kepalaSekolah.create({
          data: {
            nama,
            username,
            password: hashedPassword,
            status_aktif: isAktif,
          },
        });
      });

      res.status(201).json({ message: "Berhasil membuat akun Kepala Sekolah", data: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, username, password, status_aktif } = req.body;

      const dataToUpdate = {};
      if (nama !== undefined) dataToUpdate.nama = nama;
      if (username !== undefined) dataToUpdate.username = username;
      if (status_aktif !== undefined) dataToUpdate.status_aktif = status_aktif;

      if (password && password.trim() !== "") {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ message: "Kata sandi minimal 6 karakter dan harus mengandung huruf kecil, huruf besar, angka, dan simbol." });
        }
        dataToUpdate.password = await bcrypt.hash(password, 10);
      }

      let updated;
      await prisma.$transaction(async (tx) => {
        if (status_aktif === true) {
          await tx.kepalaSekolah.updateMany({
            where: {
              status_aktif: true,
              id_kepala_sekolah: { not: parseInt(id) }
            },
            data: { status_aktif: false },
          });
        }
        updated = await tx.kepalaSekolah.update({
          where: { id_kepala_sekolah: parseInt(id) },
          data: dataToUpdate,
        });
      });

      res.status(200).json({ message: "Berhasil memperbarui akun Kepala Sekolah", data: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status_aktif } = req.body;

      let updated;
      await prisma.$transaction(async (tx) => {
        if (status_aktif) {
          await tx.kepalaSekolah.updateMany({
            where: {
              status_aktif: true,
              id_kepala_sekolah: { not: parseInt(id) }
            },
            data: { status_aktif: false },
          });
        }
        updated = await tx.kepalaSekolah.update({
          where: { id_kepala_sekolah: parseInt(id) },
          data: { status_aktif },
        });
      });

      res.status(200).json({ message: "Status akun berhasil diperbarui", data: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  remove = async (req, res) => {
    try {
      const { id } = req.params;

      const kepsek = await prisma.kepalaSekolah.findUnique({
        where: { id_kepala_sekolah: parseInt(id) }
      });

      if (!kepsek) {
        return res.status(404).json({ message: "Akun Kepala Sekolah tidak ditemukan" });
      }

      if (kepsek.status_aktif) {
        return res.status(400).json({ message: "Akun aktif tidak dapat dihapus." });
      }

      await prisma.kepalaSekolah.delete({
        where: { id_kepala_sekolah: parseInt(id) }
      });

      res.status(200).json({ message: "Akun Kepala Sekolah berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new AdminKepalaSekolahController();
