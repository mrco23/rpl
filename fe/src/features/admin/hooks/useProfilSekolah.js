import { useState, useEffect, useRef } from "react";
import {
  getAdminProfile,
  createProfile,
  updateProfileData,
  updateProfileImage,
  upsertKontakProfile,
} from "../services/adminProfileService.js";

export function useProfilSekolah() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });

  // Upload Logo/Foto states
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const res = await getAdminProfile();
      if (res.data) {
        setProfile(res.data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.warn("Profil belum dibuat atau gagal dimuat:", err?.message || err);
      setProfile(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = async () => {
    if (!profile) return setToastConfig({ show: true, message: "Harap buat Profil Awal terlebih dahulu!", type: "error" });
    if (!selectedImage) return setToastConfig({ show: true, message: "Pilih file gambar untuk diunggah!", type: "error" });
    try {
      setUploadingImg(true);
      const fd = new FormData();
      fd.append("foto_kepala_sekolah", selectedImage);
      await updateProfileImage(fd);
      setToastConfig({ show: true, message: "Gambar berhasil diunggah!", type: "success" });
      setSelectedImage(null);
      fetchProfile(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal mengunggah gambar.", type: "error" });
    } finally {
      setUploadingImg(false);
    }
  };

  const handleUpdateInfo = async (infoData, onSuccess) => {
    try {
      await updateProfileData({
        ...infoData,
        nama_kepala_sekolah: profile?.nama_kepala_sekolah || "",
        kata_sambutan: profile?.kata_sambutan || "",
      });
      setToastConfig({ show: true, message: "Informasi sekolah berhasil diperbarui!", type: "success" });
      if (onSuccess) onSuccess();
      fetchProfile(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal update informasi sekolah", type: "error" });
    }
  };

  const handleUpdateKepsek = async (kepsekData, onSuccess) => {
    try {
      await updateProfileData({
        nama_sekolah: profile?.nama_sekolah || "",
        visi: profile?.visi || "",
        misi: profile?.misi || "",
        ...kepsekData,
      });
      setToastConfig({ show: true, message: "Data kepala sekolah berhasil diperbarui!", type: "success" });
      if (onSuccess) onSuccess();
      fetchProfile(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal update data kepala sekolah", type: "error" });
    }
  };

  const handleUpdateKontak = async (kontakData, onSuccess) => {
    try {
      await upsertKontakProfile(kontakData);
      setToastConfig({ show: true, message: "Kontak sekolah berhasil diperbarui!", type: "success" });
      if (onSuccess) onSuccess();
      fetchProfile(false);
    } catch (err) {
      setToastConfig({ show: true, message: "Gagal update kontak sekolah", type: "error" });
    }
  };

  const handleCreateProfile = async (createData, createImage, onSuccess) => {
    try {
      const fd = new FormData();
      fd.append("nama_sekolah", createData.nama_sekolah);
      fd.append("visi", createData.visi);
      fd.append("misi", createData.misi);
      fd.append("nama_kepala_sekolah", createData.nama_kepala_sekolah);
      fd.append("kata_sambutan", createData.kata_sambutan);
      fd.append("akreditasi", createData.akreditasi);
      fd.append("nomor_sk_akreditasi", createData.nomor_sk_akreditasi);
      if (createImage) fd.append("foto_kepala_sekolah", createImage);

      await createProfile(fd);
      setToastConfig({ show: true, message: "Profil berhasil dibuat!", type: "success" });
      if (onSuccess) onSuccess();
      fetchProfile();
    } catch (err) {
      setToastConfig({ show: true, message: err.response?.data?.message || "Gagal membuat profil", type: "error" });
    }
  };

  return {
    profile,
    loading,
    toastConfig,
    setToastConfig,
    selectedImage,
    previewLogo,
    uploadingImg,
    fileInputRef,
    handleLogoSelect,
    handleLogoUpload,
    handleUpdateInfo,
    handleUpdateKepsek,
    handleUpdateKontak,
    handleCreateProfile,
  };
}
