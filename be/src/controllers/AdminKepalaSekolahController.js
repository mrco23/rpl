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

      const existingUser = await prisma.kepalaSekolah.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.kepalaSekolah.create({
        data: {
          nama,
          username,
          password: hashedPassword,
          status_aktif: status_aktif !== undefined ? status_aktif : true,
        },
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

      const dataToUpdate = {
        nama,
        username,
        status_aktif: status_aktif !== undefined ? status_aktif : true,
      };

      if (password && password.trim() !== "") {
        dataToUpdate.password = await bcrypt.hash(password, 10);
      }

      const updated = await prisma.kepalaSekolah.update({
        where: { id_kepala_sekolah: parseInt(id) },
        data: dataToUpdate,
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

      const updated = await prisma.kepalaSekolah.update({
        where: { id_kepala_sekolah: parseInt(id) },
        data: { status_aktif },
      });

      res.status(200).json({ message: "Status akun berhasil diperbarui", data: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new AdminKepalaSekolahController();
