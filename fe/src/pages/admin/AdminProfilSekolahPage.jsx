import React, { useState, useEffect, useRef } from 'react';
import { Edit2, CloudUpload, Upload } from 'lucide-react';
import AdminHeader from '@components/features/AdminHeader';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import {
  getAdminProfile,
  createProfile,
  updateProfileData,
  updateProfileImage,
  upsertKontakProfile
} from '../../services/adminProfileService.js';

export default function AdminProfilSekolahPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // States for Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isKepsekModalOpen, setIsKepsekModalOpen] = useState(false);
  const [isKontakModalOpen, setIsKontakModalOpen] = useState(false);

  // Form states
  const [createData, setCreateData] = useState({
    nama_sekolah: '', visi: '', misi: '', nama_kepala_sekolah: '', kata_sambutan: ''
  });
  const [createImage, setCreateImage] = useState(null);

  const [infoData, setInfoData] = useState({ nama_sekolah: '', visi: '', misi: '' });
  const [kepsekData, setKepsekData] = useState({ nama_kepala_sekolah: '', kata_sambutan: '' });
  const [kontakData, setKontakData] = useState({ 
    no_telpon: '', 
    email: '', 
    whatsapp: '', 
    instagram: '', 
    tiktok: '', 
    facebook: '', 
    youtube: '' 
  });

  // Upload Logo/Foto states
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getAdminProfile();
      // adminAxios interceptor mengembalikan response.data langsung
      // Backend mengembalikan { message, data: {...} }
      if (res.data) {
        setProfile(res.data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      // adminAxios error interceptor: err sudah berupa response.data (bukan axios error)
      // Jika profil belum ada, backend throw error -> tampilkan empty state
      console.warn("Profil belum dibuat atau gagal dimuat:", err?.message || err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleOpenInfo = () => {
    setInfoData({ 
      nama_sekolah: profile?.nama_sekolah || '', 
      visi: profile?.visi || '', 
      misi: profile?.misi || '' 
    });
    setIsInfoModalOpen(true);
  };

  const handleOpenKepsek = () => {
    setKepsekData({ 
      nama_kepala_sekolah: profile?.nama_kepala_sekolah || '', 
      kata_sambutan: profile?.kata_sambutan || '' 
    });
    setIsKepsekModalOpen(true);
  };

  const handleOpenKontak = () => {
    setKontakData({ 
      no_telpon: profile?.no_telpon || '', 
      email: profile?.email || '',
      whatsapp: profile?.whatsapp || '',
      instagram: profile?.instagram || '',
      tiktok: profile?.tiktok || '',
      facebook: profile?.facebook || '',
      youtube: profile?.youtube || ''
    });
    setIsKontakModalOpen(true);
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = async () => {
    if (!profile) return alert("Harap buat Profil Awal terlebih dahulu!");
    if (!selectedImage) return alert("Pilih file gambar untuk diunggah!");
    try {
      setUploadingImg(true);
      const fd = new FormData();
      // Menggunakan foto_kepala_sekolah karena schema backend menangani gambar profil sekolah/kepsek di field ini
      fd.append("foto_kepala_sekolah", selectedImage); 
      await updateProfileImage(fd);
      alert("Gambar berhasil diunggah!");
      setSelectedImage(null);
      fetchProfile();
    } catch (err) {
      alert("Gagal mengunggah gambar.");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      await updateProfileData({
        ...infoData,
        nama_kepala_sekolah: profile?.nama_kepala_sekolah || '',
        kata_sambutan: profile?.kata_sambutan || ''
      });
      setIsInfoModalOpen(false);
      fetchProfile();
    } catch (err) { alert("Gagal update informasi sekolah"); }
  };

  const handleUpdateKepsek = async (e) => {
    e.preventDefault();
    try {
      await updateProfileData({
        nama_sekolah: profile?.nama_sekolah || '',
        visi: profile?.visi || '',
        misi: profile?.misi || '',
        ...kepsekData
      });
      setIsKepsekModalOpen(false);
      fetchProfile();
    } catch (err) { alert("Gagal update data kepala sekolah"); }
  };

  const handleUpdateKontak = async (e) => {
    e.preventDefault();
    try {
      await upsertKontakProfile(kontakData);
      setIsKontakModalOpen(false);
      fetchProfile();
    } catch (err) { alert("Gagal update kontak sekolah"); }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("nama_sekolah", createData.nama_sekolah);
      fd.append("visi", createData.visi);
      fd.append("misi", createData.misi);
      fd.append("nama_kepala_sekolah", createData.nama_kepala_sekolah);
      fd.append("kata_sambutan", createData.kata_sambutan);
      if (createImage) fd.append("foto_kepala_sekolah", createImage);

      await createProfile(fd);
      setIsCreateModalOpen(false);
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal membuat profil");
    }
  };

  if (!loading && !profile) {
    return (
      <>
        <AdminHeader text="Profil Sekolah" subText="Atur informasi profil dasar sekolah" />
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl border border-gray-200 mt-6 shadow-sm mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profil Sekolah Belum Diatur</h2>
          <p className="text-gray-500 mb-6 text-center">Data informasi institusi masih kosong, mohon isikan profil utama sebagai basis data web sekolah.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="bg-[#253b80] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Buat Profil Awal
          </button>
        </div>

        {/* Modal Buat Profil Awal */}
        <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Buat Profil Sekolah">
          <form onSubmit={handleCreateProfile} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
              <input type="text" required value={createData.nama_sekolah} onChange={e => setCreateData({...createData, nama_sekolah: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
              <textarea required rows={3} value={createData.visi} onChange={e => setCreateData({...createData, visi: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
              <textarea required rows={3} value={createData.misi} onChange={e => setCreateData({...createData, misi: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none" />
            </div>
            <div className="border-t pt-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah</label>
              <input type="text" required value={createData.nama_kepala_sekolah} onChange={e => setCreateData({...createData, nama_kepala_sekolah: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sambutan</label>
              <textarea required rows={4} value={createData.kata_sambutan} onChange={e => setCreateData({...createData, kata_sambutan: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto Kepala Sekolah (Logo)</label>
              <input type="file" required accept="image/*" onChange={e => setCreateImage(e.target.files[0])} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
                      <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] cursor-pointer"
                      >
                        Simpan Profil
                      </button>

            </div>
          </form>
        </Modal>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        text="Profil Sekolah"
        subText="Kelola identitas pendidik, kontak, resolusi visi misi institusi."
      />

      {/* Grid Layout untuk Card Formulir */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

        {/* KOLOM KIRI (Informasi Sekolah & Kepala Sekolah) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Card Informasi Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#253b80] uppercase">Informasi Sekolah</h2>
              <button onClick={handleOpenInfo} disabled={loading} className="flex items-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer">
                <Edit2 size={16} />
                Ubah
              </button>

            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                {loading ? <Skeleton className="h-10 w-full" /> : (
                  <input
                    type="text"
                    value={profile?.nama_sekolah || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Sekolah</label>
                <textarea
                  value="Data alamat belum diintegrasikan di sistem backend berjalan"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-400 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                {loading ? <Skeleton className="h-20 w-full" /> : (
                  <textarea
                    value={profile?.visi || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
                {loading ? <Skeleton className="h-20 w-full" /> : (
                  <textarea
                    value={profile?.misi || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>

          {/* Card Kepala Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#253b80]">Kepala Sekolah</h2>
              <button onClick={handleOpenKepsek} disabled={loading} className="flex items-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer">
                <Edit2 size={16} />
                Ubah
              </button>

            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah</label>
                {loading ? <Skeleton className="h-10 w-full" /> : (
                  <input
                    type="text"
                    value={profile?.nama_kepala_sekolah || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata sambutan Kepala Sekolah</label>
                {loading ? <Skeleton className="h-32 w-full" /> : (
                  <textarea
                    value={profile?.kata_sambutan || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (Logo Sekolah & Kontak) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Card Logo Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#253b80]">Logo Sekolah / Foto Kepala</h2>
              <p className="text-sm text-gray-500">Unggah logo/foto resmi sekolah</p>
            </div>

            {loading ? <Skeleton className="h-64 w-full mb-4" /> : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl h-64 flex flex-col items-center justify-center text-blue-400 mb-4 cursor-pointer hover:bg-blue-50 transition-colors overflow-hidden relative"
              >
                {previewLogo || profile?.foto_kepala_sekolah ? (
                  <img src={previewLogo || profile?.foto_kepala_sekolah} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <CloudUpload size={48} strokeWidth={1.5} />
                    <span className="text-sm mt-2 font-medium">Pilih file...</span>
                  </>
                )}
                {/* Tambahkan elemen input type file hidden di sini */}
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleLogoSelect} />
              </div>
            )}

            <button onClick={handleLogoUpload} disabled={loading || uploadingImg || !selectedImage} className="w-full flex items-center justify-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors mt-auto disabled:bg-gray-400 cursor-pointer">
              <Upload size={18} />
              {uploadingImg ? 'Mengunggah...' : 'Unggah'}
            </button>

          </div>

          {/* Card Kontak Sekolah */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#253b80]">Kontak Sekolah</h2>
              <button onClick={handleOpenKontak} disabled={loading} className="flex items-center gap-2 bg-[#253b80] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer">
                <Edit2 size={16} />
                Ubah
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                      📞
                    </span>
                    {loading ? <Skeleton className="h-10 flex-1 rounded-none rounded-r-md" /> : (
                      <input
                        type="text"
                        value={profile?.no_telpon || '-'}
                        className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">WhatsApp</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                      💬
                    </span>
                    {loading ? <Skeleton className="h-10 flex-1 rounded-none rounded-r-md" /> : (
                      <input
                        type="text"
                        value={profile?.whatsapp || '-'}
                        className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                        readOnly
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Sekolah</label>
                {loading ? <Skeleton className="h-10 w-full" /> : (
                  <input
                    type="email"
                    value={profile?.email || 'Belum diatur'}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-1">LINK</span></label>
                  <input readOnly value={profile?.instagram || '-'} className="w-full border border-gray-300 rounded-md px-3 py-1 text-xs bg-gray-50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-1">LINK</span></label>
                  <input readOnly value={profile?.tiktok || '-'} className="w-full border border-gray-300 rounded-md px-3 py-1 text-xs bg-gray-50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-1">LINK</span></label>
                  <input readOnly value={profile?.facebook || '-'} className="w-full border border-gray-300 rounded-md px-3 py-1 text-xs bg-gray-50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-1">LINK</span></label>
                  <input readOnly value={profile?.youtube || '-'} className="w-full border border-gray-300 rounded-md px-3 py-1 text-xs bg-gray-50 outline-none" />
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>

      {/* MODAL: Edit Informasi Sekolah */}
      <Modal open={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} title="Ubah Informasi Sekolah">
         <form onSubmit={handleUpdateInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
              <input type="text" required value={infoData.nama_sekolah} onChange={e => setInfoData({...infoData, nama_sekolah: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
              <textarea required rows={4} value={infoData.visi} onChange={e => setInfoData({...infoData, visi: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
              <textarea required rows={4} value={infoData.misi} onChange={e => setInfoData({...infoData, misi: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t">
              <button type="button" onClick={() => setIsInfoModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Batal</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66]">Simpan</button>
            </div>
         </form>
      </Modal>

      {/* MODAL: Edit Kepala Sekolah */}
      <Modal open={isKepsekModalOpen} onClose={() => setIsKepsekModalOpen(false)} title="Ubah Profil Kepala Sekolah">
         <form onSubmit={handleUpdateKepsek} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala</label>
              <input type="text" required value={kepsekData.nama_kepala_sekolah} onChange={e => setKepsekData({...kepsekData, nama_kepala_sekolah: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sambutan</label>
              <textarea required rows={5} value={kepsekData.kata_sambutan} onChange={e => setKepsekData({...kepsekData, kata_sambutan: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t">
              <button type="button" onClick={() => setIsKepsekModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Batal</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66]">Simpan</button>
            </div>
         </form>
      </Modal>

      {/* MODAL: Edit Kontak */}
      <Modal open={isKontakModalOpen} onClose={() => setIsKontakModalOpen(false)} title="Ubah Kontak Web Sekolah">
         <form onSubmit={handleUpdateKontak} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <input type="text" required value={kontakData.no_telpon} onChange={e => setKontakData({...kontakData, no_telpon: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input type="text" value={kontakData.whatsapp} onChange={e => setKontakData({...kontakData, whatsapp: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Contoh: 0812..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Publik</label>
              <input type="email" required value={kontakData.email} onChange={e => setKontakData({...kontakData, email: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (Username)</label>
                <input type="text" value={kontakData.instagram} onChange={e => setKontakData({...kontakData, instagram: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="@username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TikTok (Username)</label>
                <input type="text" value={kontakData.tiktok} onChange={e => setKontakData({...kontakData, tiktok: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="@username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook (Link/Nama)</label>
                <input type="text" value={kontakData.facebook} onChange={e => setKontakData({...kontakData, facebook: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube (Channel Link)</label>
                <input type="text" value={kontakData.youtube} onChange={e => setKontakData({...kontakData, youtube: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t">
              <button type="button" onClick={() => setIsKontakModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#253b80] rounded-md hover:bg-[#1a2c66] cursor-pointer">Simpan</button>
            </div>
         </form>
      </Modal>

    </>
  );
}