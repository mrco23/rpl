import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  ChevronRight,
  Lock,
  Download,
  Info,
  Check,
  X,
  ArrowRight,
  UserCircle2,
  XCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import VerifikatorHeader from "../../components/features/VerifikatorHeader";
import {
  getPendaftarVerifikasiList,
  getMyAssignedPendaftar,
  assignPendaftar,
  verifyPendaftar,
  cancelVerifikasi
} from "../../services/verifikatorVerifikasiService";
import Skeleton from "../../components/ui/Skeleton.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Toast from "../../components/ui/Toast.jsx";
import { STATUS_LABELS } from "../../constants/pendaftarStatus";
import { useSearchParams } from "react-router-dom";
import { resolveDocumentUrl, extractFileNameFromUrl, downloadDocumentFile } from '../../utils/documentHelper.js';
import { formatMediumDate } from "../../utils/dateHelper";

export default function VerifikatorVerifikasiPage() {
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [applicants, setApplicants] = useState([]);
  const [assignedApplicant, setAssignedApplicant] = useState(null);

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const filterFromURL = searchParams.get("filter");
  const [filterStatus, setFilterStatus] = useState("Semua"); // 'Semua', 'Menunggu', 'Unggah Ulang', 'Diproses'

  // State untuk Toaster dan Modal Peringatan
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "success" });
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isBiodataModalOpen, setIsBiodataModalOpen] = useState(false);

  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    if (filterFromURL === "menunggu") setFilterStatus("Menunggu");
    else if (filterFromURL === "revisi") setFilterStatus("Unggah Ulang");
    else if (filterFromURL === "diproses") setFilterStatus("Diproses");
    else setFilterStatus("Semua");
  }, [filterFromURL]);

  // Fetch all data
  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setListLoading(true);
      else setLoading(true);

      const [listRes, assignedRes] = await Promise.all([
        getPendaftarVerifikasiList(),
        getMyAssignedPendaftar(),
      ]);

      setApplicants(listRes.data || []);
      setAssignedApplicant(assignedRes.data || null);
      if (assignedRes.data) {
        setCatatan(assignedRes.data.catatan_dokumen || "");
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setToastConfig({ show: true, message: "Gagal mengambil data dari server", type: "error" });
    } finally {
      setLoading(false);
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => fetchData(true);

  const handleAssign = async (id) => {
    if (actionLoading) return;
    try {
      setActionLoading(true);
      await assignPendaftar(id);
      await fetchData(true);
      // Optional: Toast saat berhasil assign
      // setToastConfig({ show: true, message: "Pendaftar berhasil diambil alih", type: "success" });
    } catch (err) {
      setToastConfig({ show: true, message: err.message || "Gagal mengambil alih pemeriksaan", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerifyAction = async (status) => {
    if (!assignedApplicant || actionLoading) return;

    // Logika menampilkan Modal Peringatan jika catatan kosong
    if (status === "perlu perbaikan" && !catatan.trim()) {
      setIsAlertModalOpen(true);
      return;
    }

    try {
      setActionLoading(true);
      await verifyPendaftar(assignedApplicant.id_pendaftar, {
        status,
        catatan,
      });
      setAssignedApplicant(null);
      setCatatan("");
      await fetchData(true);

      if (status === "terverifikasi") {
        setToastConfig({ show: true, message: "Dokumen pendaftar berhasil diverifikasi!", type: "success" });
      } else if (status === "perlu perbaikan") {
        setToastConfig({ show: true, message: "Permintaan perbaikan berhasil dikirim ke pendaftar!", type: "success" });
      }
    } catch (err) {
      setToastConfig({ show: true, message: err.message || "Gagal memperbarui status", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      await cancelVerifikasi(assignedApplicant.id_pendaftar);
      setAssignedApplicant(null);
      setCatatan('');
      await fetchData(true);
      setToastConfig({ show: true, message: "Pemeriksaan berhasil dibatalkan!", type: "success" });
    } catch (err) {
      setToastConfig({ show: true, message: err.message || "Gagal membatalkan pemeriksaan", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const openDocument = (url) => {
    if (!url) return;
    window.open(resolveDocumentUrl(url), '_blank');
  };

  // Logic Filtering
  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
      app.nisn?.includes(search);

    if (filterStatus === "Semua") return matchesSearch;
    if (filterStatus === "Menunggu")
      return (
        matchesSearch &&
        app.status_pendaftaran === "menunggu verifikasi" &&
        !app.id_verifikator
      );
    if (filterStatus === "Unggah Ulang")
      return (
        matchesSearch &&
        app.status_pendaftaran === "unggah ulang" &&
        !app.id_verifikator
      );
    if (filterStatus === "Diproses") return matchesSearch && app.id_verifikator;

    return matchesSearch;
  });

  const getStatusStyle = (app) => {
    if (app.id_verifikator) return "text-blue-500 font-medium";
    switch (app.status_pendaftaran) {
      case "menunggu verifikasi":
        return "bg-orange-100 text-orange-600";
      case "unggah ulang":
        return "bg-teal-100 text-teal-700";
      case "perlu perbaikan":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return formatMediumDate(dateString);
  };

  const stats = {
    semua: applicants.length,
    menunggu: applicants.filter(
      (app) =>
        app.status_pendaftaran === "menunggu verifikasi" && !app.id_verifikator,
    ).length,
    unggahUlang: applicants.filter(
      (app) => app.status_pendaftaran === "unggah ulang" && !app.id_verifikator,
    ).length,
    diproses: applicants.filter((app) => app.id_verifikator).length,
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Skeleton className="h-20 w-full mb-6 rounded-xl" />
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="h-[70vh] w-full lg:w-[40%] rounded-xl" />
          <Skeleton className="h-[70vh] flex-1 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <>
      <VerifikatorHeader
        text="Verifikasi Dokumen PPDB"
        subText="Selamat datang di sistem verifikasi dokumen PPDB"
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4 lg:px-0 h-[calc(100vh-130px)] pb-4">
        {/* ================= KOLOM KIRI (Daftar Pendaftar) ================= */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-xl font-bold text-gray-900">
                Daftar Pendaftar
              </h2>
              <button
                onClick={handleRefresh}
                className={`p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors cursor-pointer ${listLoading ? "animate-spin" : ""}`}
                disabled={listLoading}
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Hanya menampilkan data yang perlu diverifikasi
            </p>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari nama / NISN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label="Semua"
                count={stats.semua}
                active={filterStatus === "Semua"}
                onClick={() => setFilterStatus("Semua")}
              />
              <FilterChip
                label="Menunggu"
                count={stats.menunggu}
                active={filterStatus === "Menunggu"}
                onClick={() => setFilterStatus("Menunggu")}
              />
              <FilterChip
                label="Unggah Ulang"
                count={stats.unggahUlang}
                active={filterStatus === "Unggah Ulang"}
                onClick={() => setFilterStatus("Unggah Ulang")}
              />
              <FilterChip
                label="Diproses"
                count={stats.diproses}
                active={filterStatus === "Diproses"}
                onClick={() => setFilterStatus("Diproses")}
              />
            </div>
          </div>

          {/* List Pendaftar (Scrollable dengan scrollbar kustom) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {listLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))
            ) : filteredApplicants.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                <FileText size={48} className="mb-2 opacity-20" />
                <p className="text-sm">Tidak ada pendaftar ditemukan</p>
              </div>
            ) : (
              filteredApplicants.map((app) => {
                const isMyAssigned =
                  assignedApplicant?.id_pendaftar === app.id_pendaftar;
                const isLockedOther = app.id_verifikator && !isMyAssigned;

                return (
                  <div
                    key={app.id_pendaftar}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${isMyAssigned
                      ? "bg-blue-50/50 border-blue-200"
                      : isLockedOther
                        ? "bg-gray-100 border-gray-200 opacity-70"
                        : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                  >
                    <div className="flex items-start gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-orange-200 shrink-0 flex items-center justify-center text-orange-600 font-bold overflow-hidden uppercase">
                        {app.nama_lengkap?.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm text-gray-900 truncate">
                          {app.nama_lengkap}
                        </span>

                        {isLockedOther ? (
                          <span className="text-[11px] text-gray-500 mt-0.5">
                            NISN : {app.nisn} <span className="mx-1">•</span>{" "}
                            <span className="text-blue-500 font-medium">
                              Sedang Diproses
                            </span>
                            <br />
                            Oleh : {app.verifikator?.nama || "Verifikator Lain"}
                          </span>
                        ) : (
                          <>
                            <span className="text-[11px] text-gray-500 mt-0.5">
                              NISN : {app.nisn}
                            </span>
                            <div className="mt-1">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${getStatusStyle(app)}`}
                              >
                                {app.id_verifikator
                                  ? "Sedang Diproses"
                                  : STATUS_LABELS[app.status_pendaftaran] ||
                                  app.status_pendaftaran}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1">
                              Mendaftar: {formatDate(app.tanggal_daftar)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Action */}
                    {isLockedOther ? (
                      <Lock size={18} className="text-gray-400 mr-2 shrink-0" />
                    ) : (
                      <button
                        onClick={() => handleAssign(app.id_pendaftar)}
                        disabled={isMyAssigned || actionLoading}
                        className={`flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 border rounded-full transition-colors shrink-0 
                          ${isMyAssigned
                            ? "bg-blue-600 text-white border-blue-600"
                            : "text-blue-600 border-blue-200 hover:bg-blue-50 bg-white cursor-pointer"
                          } 
                          disabled:opacity-50`}
                      >
                        {isMyAssigned ? "Sedang Diperiksa" : "Periksa"}{" "}
                        {!isMyAssigned && !app.id_verifikator && (
                          <ChevronRight size={12} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= KOLOM KANAN (Detail Verifikasi) ================= */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
          {!assignedApplicant ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <UserCircle2 size={48} className="opacity-20" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">
                Belum Ada Pendaftar Terpilih
              </h3>
              <p className="text-sm max-w-xs">
                Silakan pilih pendaftar dari daftar di sebelah kiri untuk
                memulai proses verifikasi dokumen.
              </p>
            </div>
          ) : (
            <AssignedApplicantDetail
              assignedApplicant={assignedApplicant}
              getStatusStyle={getStatusStyle}
              formatDate={formatDate}
              catatan={catatan}
              setCatatan={setCatatan}
              actionLoading={actionLoading}
              handleVerifyAction={handleVerifyAction}
              handleCancel={handleCancel}
              openDocument={openDocument}
              setIsBiodataModalOpen={setIsBiodataModalOpen}
            />
          )}
        </div>
      </div>

      {/* ================= MODAL DATA LENGKAP ================= */}
      {isBiodataModalOpen && assignedApplicant && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header (Sticky) */}
            <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Biodata Lengkap
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Cek kesesuaian data input dengan unggahan dokumen
                </p>
              </div>
              <button
                onClick={() => setIsBiodataModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <XCircle size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-6 lg:p-8 overflow-y-auto flex-1 custom-scrollbar">
              {/* User Highlight */}
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 mb-8 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 text-2xl font-bold uppercase shrink-0">
                    {assignedApplicant.nama_lengkap?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-900">
                      {assignedApplicant.nama_lengkap}
                    </span>
                    <span className="text-sm text-gray-600 mt-0.5">
                      NISN: {assignedApplicant.nisn}
                    </span>
                    <div className="mt-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${getStatusStyle(assignedApplicant)}`}
                      >
                        {STATUS_LABELS[assignedApplicant.status_pendaftaran] ||
                          assignedApplicant.status_pendaftaran}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sections */}
              <div className="space-y-10 pb-10">
                {/* Biodata */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-6 bg-[#253b80] rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">
                      BIODATA SISWA
                    </h3>
                  </div>
                  <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                    <DataRow
                      label="Nama Lengkap"
                      value={assignedApplicant.nama_lengkap}
                    />
                    <DataRow label="NISN" value={assignedApplicant.nisn} />
                    <DataRow
                      label="Tempat Lahir"
                      value={assignedApplicant.tempat_lahir}
                    />
                    <DataRow
                      label="Tanggal Lahir"
                      value={formatDate(assignedApplicant.tanggal_lahir)}
                    />
                    <DataRow
                      label="Jenis Kelamin"
                      value={
                        assignedApplicant.jenis_kelamin === "L"
                          ? "Laki-laki"
                          : "Perempuan"
                      }
                    />
                    <DataRow label="No. HP" value={assignedApplicant.no_hp} />
                    <DataRow
                      label="Email"
                      value={assignedApplicant.email || "-"}
                    />
                  </div>
                </div>

                {/* Orang Tua / Wali */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-6 bg-[#253b80] rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">
                      DATA WALI
                    </h3>
                  </div>
                  <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                    <DataRow
                      label="Nama Wali"
                      value={assignedApplicant.nama_wali || "-"}
                    />
                    <DataRow
                      label="Email Orang Tua"
                      value={assignedApplicant.email || "-"}
                    />
                  </div>
                </div>

                {/* Domisili */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-6 bg-[#253b80] rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">
                      ALAMAT / DOMISILI
                    </h3>
                  </div>
                  <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                    {assignedApplicant.alamat ? (
                      <div className="space-y-4">
                        <DataRow
                          label="Provinsi"
                          value={assignedApplicant.alamat.provinsi}
                        />
                        <DataRow
                          label="Kota/Kabupaten"
                          value={assignedApplicant.alamat.kota_kabupaten}
                        />
                        <DataRow
                          label="Kecamatan"
                          value={assignedApplicant.alamat.kecamatan}
                        />
                        <DataRow
                          label="Kelurahan"
                          value={assignedApplicant.alamat.kelurahan}
                        />
                        <DataRow
                          label="RT/RW"
                          value={assignedApplicant.alamat.rt_rw}
                        />
                        <DataRow
                          label="Kode Pos"
                          value={assignedApplicant.alamat.kode_pos}
                        />
                      </div>
                    ) : (
                      <p className="text-gray-400 font-medium leading-relaxed italic">
                        Alamat belum diisi
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/80 rounded-b-2xl">
              <button
                onClick={() => setIsBiodataModalOpen(false)}
                className="w-full bg-[#253b80] text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all cursor-pointer shadow-md"
              >
                TUTUP BIODATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL PERINGATAN CATATAN ================= */}
      <Modal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Catatan Diperlukan"
      >
        <div className="flex flex-col items-center justify-center p-6 pb-2">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100 ">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Gagal Meminta Perbaikan</h3>
          <p className="text-center text-gray-600 text-sm mb-6 leading-relaxed">
            Anda wajib mengisi <strong>Catatan Verifikasi</strong> untuk memberi tahu pendaftar dokumen mana yang harus diperbaiki atau diunggah ulang.
          </p>
          <button
            onClick={() => setIsAlertModalOpen(false)}
            className="w-full py-2.5 bg-blue-dark text-white rounded-xl font-bold hover:bg-blue-dark-hover transition-colors shadow-sm cursor-pointer"
          >
            Mengerti
          </button>
        </div>
      </Modal>

      {/* Komponen Toaster Global */}
      <Toast
        show={toastConfig.show}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig({ ...toastConfig, show: false })}
      />

      {/* CSS untuk Scrollbar Kustom */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
      `}} />
    </>
  );
}

// Sub-komponen untuk detail pendaftar yang sedang diperiksa (kolom kanan)
function AssignedApplicantDetail({
  assignedApplicant,
  getStatusStyle,
  formatDate,
  catatan,
  setCatatan,
  actionLoading,
  handleVerifyAction,
  handleCancel,
  openDocument,
  setIsBiodataModalOpen,
}) {
  const requiredDocs = ["Ijazah", "Foto Copy Akte Kelahiran", "Foto Copy Kartu Keluarga", "Pas Foto"];
  const isComplete = requiredDocs.every(reqDoc =>
    assignedApplicant.dokumen?.some(d => d.nama_dokumen === reqDoc && d.jenis_dokumen)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 lg:p-8 flex-1 overflow-y-auto custom-scrollbar">
        {/* Header Kanan */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Data Verifikasi
          </h2>
          <button
            onClick={() => setIsBiodataModalOpen(true)}
            className="flex items-center gap-2 text-[#253b80] text-sm font-semibold px-4 py-2 border border-[#253b80] rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Lihat Biodata Lengkap <ArrowRight size={16} />
          </button>
        </div>

        {/* Active User Card */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 text-xl font-bold uppercase shrink-0">
              {assignedApplicant.nama_lengkap?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-gray-900">
                {assignedApplicant.nama_lengkap}
              </span>
              <span className="text-xs text-gray-600 mt-0.5">
                NISN : {assignedApplicant.nisn}
              </span>
              <div className="mt-1 mb-1">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${getStatusStyle(assignedApplicant)}`}
                >
                  {STATUS_LABELS[
                    assignedApplicant.status_pendaftaran
                  ] || assignedApplicant.status_pendaftaran}
                </span>
              </div>
              <span className="text-[11px] text-gray-500">
                Mendaftar:{" "}
                {formatDate(assignedApplicant.tanggal_daftar)}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-600 text-white border border-blue-700 text-xs font-bold rounded-full sm:mt-2">
            Sedang Diperiksa
          </span>
        </div>

        {/* Status Alert */}
        <div
          className={`border rounded-xl p-4 mb-8 flex flex-col gap-1 ${assignedApplicant.status_pendaftaran === "menunggu verifikasi" ? "bg-[#fff9e6] border-yellow-200" : "bg-blue-50 border-blue-200"}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">
              Status saat ini :
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${getStatusStyle(assignedApplicant)}`}
            >
              {STATUS_LABELS[assignedApplicant.status_pendaftaran] ||
                assignedApplicant.status_pendaftaran}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {assignedApplicant.status_pendaftaran ===
              "menunggu verifikasi"
              ? "Dokumen belum pernah diperiksa"
              : "Pendaftar sedang memperbaiki dokumen"}
          </p>
        </div>

        {!isComplete && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">Dokumen Belum Lengkap!</p>
              <p className="text-sm text-red-600 mt-1">Pendaftar belum mengunggah seluruh 4 dokumen wajib (Ijazah, Akte, KK, Pas Foto). Mohon beri catatan perbaikan.</p>
            </div>
          </div>
        )}

        {/* Dokumen Section */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Dokumen Yang Diunggah
          </h3>
          <p className="text-sm text-gray-500">
            Periksa setiap dokumen dengan teliti
          </p>
        </div>

        <div className="space-y-3 mb-4">
          {assignedApplicant.dokumen?.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
              Belum ada dokumen yang diunggah
            </div>
          ) : (
            assignedApplicant.dokumen?.map((doc) => (
              <div
                key={doc.id_dokumen}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white"
              >
                <div className="flex flex-col min-w-0 mr-4">
                  <span className="text-sm font-bold text-[#253b80]">{doc.nama_dokumen}</span>
                  <span className="text-xs text-gray-500 mt-0.5 truncate">{extractFileNameFromUrl(doc.jenis_dokumen)}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openDocument(doc.jenis_dokumen)}
                    className="bg-blue-dark hover:bg-blue-dark-hover text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => downloadDocumentFile(doc.jenis_dokumen, `${assignedApplicant.nama_lengkap.replace(/\s+/g, '_')}_${doc.nama_dokumen.replace(/\s+/g, '_')}`)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-white mb-8 mt-4 p-4 border border-blue-100 rounded-xl">
          <div className="mt-0.5 text-blue-600 bg-blue-100 p-1 rounded-full shrink-0">
            <Info size={16} strokeWidth={2.5} />
          </div>
          <p className="text-sm text-blue-900 font-medium leading-snug">
            Pastikan semua informasi dalam dokumen sesuai dengan data
            biodata.
            <br className="hidden md:block" />
            Isi catatan jika ada dokumen yang tidak sesuai atau tidak
            jelas.
          </p>
        </div>

        {/* Form Catatan & Action */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-[#253b80] mb-2 uppercase tracking-wide">
            Catatan Verifikasi
          </h3>
          <p className="text-xs text-gray-500 mb-3 font-medium italic">
            * Wajib diisi jika status "Perlu Perbaikan" dipilih
          </p>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 mb-6 transition-all bg-gray-50/30 custom-scrollbar"
            placeholder="Contoh: Foto KK kurang jelas, mohon unggah ulang foto yang lebih tajam..."
          ></textarea>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            <button
              onClick={() => handleVerifyAction("terverifikasi")}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg text-sm font-bold hover:bg-green-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Verifikasi <Check size={18} strokeWidth={3} />
            </button>
            <button
              onClick={() => handleVerifyAction("perlu perbaikan")}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Perlu Perbaikan <X size={18} strokeWidth={3} />
            </button>
            <button
              onClick={() => handleCancel()}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-500 text-gray-500 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50"
            >
              Batal <X size={18} strokeWidth={3} />
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-2">
            Setelah melakukan tindakan, data pendaftar ini akan keluar
            dari penanganan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${active ? "bg-[#253b80] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
    >
      {label}{" "}
      <span
        className={`ml-1 opacity-70 ${active ? "text-blue-100" : "text-gray-400"}`}
      >
        {count}
      </span>
    </button>
  );
}

// Sub-komponen untuk baris data di dalam Modal
function DataRow({ label, value }) {
  return (
    <div className="flex items-start text-[14px]">
      <div className="w-[35%] text-gray-500 font-medium">{label}</div>
      <div className="w-[5%] text-gray-300">:</div>
      <div className="w-[60%] font-bold text-gray-900">{value || "-"}</div>
    </div>
  );
}