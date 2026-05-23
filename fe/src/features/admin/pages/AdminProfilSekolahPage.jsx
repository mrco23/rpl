import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Toast from "../../../shared/components/Toast.jsx";

// Hook
import { useProfilSekolah } from "../hooks/useProfilSekolah.js";

// Page Components
import EmptyProfileSection from "./ProfilSekolah/EmptyProfileSection.jsx";
import InfoSekolahCard from "./ProfilSekolah/InfoSekolahCard.jsx";
import KepalaSekolahCard from "./ProfilSekolah/KepalaSekolahCard.jsx";
import LogoSekolahCard from "./ProfilSekolah/LogoSekolahCard.jsx";
import KontakSekolahCard from "./ProfilSekolah/KontakSekolahCard.jsx";

// Modals
import CreateProfileModal from "./ProfilSekolah/modals/CreateProfileModal.jsx";
import EditInfoModal from "./ProfilSekolah/modals/EditInfoModal.jsx";
import EditKepsekModal from "./ProfilSekolah/modals/EditKepsekModal.jsx";
import EditKontakModal from "./ProfilSekolah/modals/EditKontakModal.jsx";

export default function AdminProfilSekolahPage() {
  const {
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
  } = useProfilSekolah();

  // Modal visibility states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isKepsekOpen, setIsKepsekOpen] = useState(false);
  const [isKontakOpen, setIsKontakOpen] = useState(false);

  if (!loading && !profile) {
    return (
      <>
        <EmptyProfileSection onOpenCreateModal={() => setIsCreateOpen(true)} />
        <CreateProfileModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateProfile}
        />
        <Toast
          show={toastConfig.show}
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setToastConfig({ ...toastConfig, show: false })}
        />
      </>
    );
  }

  return (
    <>
      <AdminHeader
        text="Profil Sekolah"
        subText="Kelola identitas pendidik, kontak, resolusi visi misi institusi."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <InfoSekolahCard
            loading={loading}
            profile={profile}
            onOpenInfo={() => setIsInfoOpen(true)}
          />
          <KepalaSekolahCard
            loading={loading}
            profile={profile}
            onOpenKepsek={() => setIsKepsekOpen(true)}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <LogoSekolahCard
            loading={loading}
            profile={profile}
            previewLogo={previewLogo}
            selectedImage={selectedImage}
            uploadingImg={uploadingImg}
            fileInputRef={fileInputRef}
            onLogoSelect={handleLogoSelect}
            onLogoUpload={handleLogoUpload}
          />
          <KontakSekolahCard
            loading={loading}
            profile={profile}
            onOpenKontak={() => setIsKontakOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <EditInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        onSubmit={handleUpdateInfo}
        initialData={profile}
      />
      <EditKepsekModal
        isOpen={isKepsekOpen}
        onClose={() => setIsKepsekOpen(false)}
        onSubmit={handleUpdateKepsek}
        initialData={profile}
      />
      <EditKontakModal
        isOpen={isKontakOpen}
        onClose={() => setIsKontakOpen(false)}
        onSubmit={handleUpdateKontak}
        initialData={profile}
      />

      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />
    </>
  );
}
