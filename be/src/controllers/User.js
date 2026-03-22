import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { getUserProfil, putUserProfil, createUser, getUser } from "../services/UserService.js";

class User {
  register = async (req, res) => {
    try {
      const { username, password, nama, role } = req.body;
      const userRole = role === "verifikator" ? "verifikator" : "admin";

      const existingUser = await getUser(username);
      if (existingUser) return res.status(400).json({ message: "Nama Pengguna sudah digunakan" });

      const user = await createUser(username, password, nama, userRole);

      res.status(201).json({
        message: "Register berhasil",
        data: { id: user.id, username: user.username, nama: user.nama, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(401).json({ message: "Nama Pengguna atau Kata Sandi Tidak ada" });

      const user = await getUser(username);
      if (!user) return res.status(400).json({ message: "Nama Pengguna atau Kata Sandi salah" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Nama Pengguna atau Kata Sandi salah" });

      const token = generateToken({ id: user.id});

      res.json({
        message: "Login berhasil",
        token,
        username: user.username,
        nama: user.nama,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getProfile = async (req, res) => {
    try {
      const authHeaders = req.headers["authorization"].split(" ")[1];
      const token = verifyToken(authHeaders);
      const { id, role } = token;

      const user = await getUserProfil(id, role, req);
      if (!user) return res.status(401).json({ message: "User not found" });

      res.json({ message: "Success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const role = req.user.role;
      const { nama } = req.body;
      const updatedData = {};

      if (nama) updatedData.nama = nama;
      if (req.file) updatedData.foto_profil = req.file.filename;

      const updatedUser = await putUserProfil(userId, role, updatedData, req);

      res.json({ message: "Profil berhasil diupdate", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Gagal update profil: " + error.message });
    }
  };
}

export default User;
