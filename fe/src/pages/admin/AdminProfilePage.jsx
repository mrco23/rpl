import { useEffect, useState } from "react";
import DashboardLayout from "@components/layout/DashboardLayout.jsx";
import { adminSidebar } from "@data/navigation.js";
import { getAdminProfile, updateProfile } from "@services/profileService.js";

const initialForm = {
  nama_sekolah: "",
  nama_kepala_sekolah: "",
  visi: "",
  misi: "",
  deskripsi: "",
  sambutan_kepala_sekolah: "",
  alamat: "",
  no_telpon: "",
  whatsapp: "",
  email: "",
  media_sosial: "",
  logo: null,
  foto_kepala_sekolah: null,
};

export default function AdminProfilePage() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState({ logo: "", foto_kepala_sekolah: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminProfile()
      .then((data) => {
        setForm((prev) => ({ ...prev, ...data, logo: null, foto_kepala_sekolah: null }));
        setPreview({ logo: data.logo || "", foto_kepala_sekolah: data.foto_kepala_sekolah || "" });
      })
      .catch((err) => setError(err.response?.data?.message || "Gagal memuat profil sekolah"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleFileChange = (name, file) => {
    handleChange(name, file);
    if (file) {
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = { ...form };
      const data = await updateProfile(payload);
      setForm((prev) => ({ ...prev, ...data, logo: null, foto_kepala_sekolah: null }));
      setPreview({ logo: data.logo || "", foto_kepala_sekolah: data.foto_kepala_sekolah || "" });
      setMessage("Profil sekolah berhasil diperbarui");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan profil sekolah");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="Admin" title="Profil Sekolah" subtitle="Seluruh data profil sekolah pada halaman publik dapat diperbarui dari sini." sidebarItems={adminSidebar}>
      <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
        {loading ? <div className="text-slate-500">Memuat profil...</div> : (
          <form className="grid lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {message && <div className="lg:col-span-2 rounded-2xl bg-green-50 px-4 py-3 text-green-700">{message}</div>}
            {error && <div className="lg:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-red-600">{error}</div>}
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Nama Sekolah</label><input value={form.nama_sekolah} onChange={(e) => handleChange("nama_sekolah", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Nama Kepala Sekolah</label><input value={form.nama_kepala_sekolah} onChange={(e) => handleChange("nama_kepala_sekolah", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div>
              <label className="block text-sm font-semibold mb-2">Upload Logo</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange("logo", e.target.files?.[0] || null)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white" />
              {preview.logo && <img src={preview.logo} alt="Preview logo" className="mt-3 w-20 h-20 rounded-2xl object-cover border border-slate-200" />}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold mb-2">Upload Foto Kepala Sekolah</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange("foto_kepala_sekolah", e.target.files?.[0] || null)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white" />
              {preview.foto_kepala_sekolah && <img src={preview.foto_kepala_sekolah} alt="Preview kepala sekolah" className="mt-3 w-32 h-32 rounded-2xl object-cover border border-slate-200" />}
            </div>
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Visi</label><textarea rows="3" value={form.visi} onChange={(e) => handleChange("visi", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Misi</label><textarea rows="4" value={form.misi} onChange={(e) => handleChange("misi", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Deskripsi Singkat Sekolah</label><textarea rows="4" value={form.deskripsi} onChange={(e) => handleChange("deskripsi", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Kata Sambutan Kepala Sekolah</label><textarea rows="5" value={form.sambutan_kepala_sekolah} onChange={(e) => handleChange("sambutan_kepala_sekolah", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Alamat</label><input value={form.alamat} onChange={(e) => handleChange("alamat", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Telepon</label><input value={form.no_telpon} onChange={(e) => handleChange("no_telpon", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">WhatsApp</label><input value={form.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div><label className="block text-sm font-semibold mb-2">Email</label><input value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div className="lg:col-span-2"><label className="block text-sm font-semibold mb-2">Media Sosial</label><textarea rows="3" value={form.media_sosial} onChange={(e) => handleChange("media_sosial", e.target.value)} placeholder="Contoh: Instagram: @sekolah&#10;YouTube: SMP Hebat" className="w-full px-5 py-4 rounded-2xl border border-slate-200" /></div>
            <div className="lg:col-span-2"><button type="submit" disabled={saving} className="px-7 py-4 rounded-2xl bg-blue-dark text-white font-bold disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan Perubahan"}</button></div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
