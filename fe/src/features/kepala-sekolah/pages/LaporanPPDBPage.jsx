import React, { useState, useEffect, useCallback } from "react";
import {
    Download,
    FileText,
    Loader2,
    AlertCircle,
    ChevronDown,
    X,
    Calendar,
    Users,
    ShieldCheck,
    Info,
} from "lucide-react";
import {
    getGelombangList,
    downloadRekapitulasiPdf,
    downloadFinalPenerimaanPdf,
} from "../services/kepalaSekolahService";
import Toast from "../../../shared/components/Toast";

// ─── KONSTANTA STATUS VALIDASI ─────────────────────────────────────────────────

const STATUS_CONFIG = {
    belum_diajukan: {
        label: "Belum Diajukan",
        className: "bg-slate-100 text-slate-600",
    },
    menunggu_validasi: {
        label: "Menunggu Validasi",
        className: "bg-amber-100 text-amber-700",
    },
    disetujui: {
        label: "Disetujui",
        className: "bg-emerald-100 text-emerald-700",
    },
};

const getStatusConfig = (status) =>
    STATUS_CONFIG[status] ?? {
        label: "Status Tidak Diketahui",
        className: "bg-slate-100 text-slate-600",
    };

// ─── HELPER TANGGAL ───────────────────────────────────────────────────────────

const SHORT_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
];

const formatShortDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";
    return `${String(d.getDate()).padStart(2, "0")} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

const getGelombangOptionLabel = (g) => {
    const parts = [g.nama].filter(Boolean);
    return parts.join(" | ");
};

// ─── HALAMAN UTAMA ─────────────────────────────────────────────────────────────

export default function LaporanPPDBPage() {
    const [toast, setToast] = useState({ show: false, message: "", type: "info" });
    const [gelombangList, setGelombangList] = useState([]);
    const [loadingGelombang, setLoadingGelombang] = useState(true);

    // State modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // "rekap" | "final"
    const [selectedGelombang, setSelectedGelombang] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // ── Fetch daftar gelombang saat mount ─────────────────────────────────
    useEffect(() => {
        const fetchGelombang = async () => {
            setLoadingGelombang(true);
            try {
                const list = await getGelombangList();
                setGelombangList(list);
            } catch {
                setToast({
                    show: true,
                    message: "Gagal memuat daftar gelombang.",
                    type: "error",
                });
            } finally {
                setLoadingGelombang(false);
            }
        };
        fetchGelombang();
    }, []);

    // ── Buka modal ────────────────────────────────────────────────────────
    const openModal = useCallback((type) => {
        setModalType(type);
        setSelectedGelombang(null);
        setIsDownloading(false);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        if (isDownloading) return; // jangan tutup saat download
        setModalOpen(false);
        setModalType(null);
        setSelectedGelombang(null);
    }, [isDownloading]);

    // Tutup modal saat tekan Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") closeModal();
        };
        if (modalOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [modalOpen, closeModal]);

    // ── Handler unduh dari modal ──────────────────────────────────────────
    const handleDownloadFromModal = async () => {
        if (!selectedGelombang) return;
        setIsDownloading(true);
        const isRekap = modalType === "rekap";
        setToast({
            show: true,
            message: isRekap
                ? "Memproses laporan rekapitulasi..."
                : "Memproses laporan final penerimaan...",
            type: "info",
        });
        try {
            if (isRekap) {
                await downloadRekapitulasiPdf(
                    selectedGelombang.id_gelombang,
                    selectedGelombang.nama,
                );
                setToast({
                    show: true,
                    message: "Laporan rekapitulasi berhasil diunduh.",
                    type: "success",
                });
            } else {
                await downloadFinalPenerimaanPdf(
                    selectedGelombang.id_gelombang,
                    selectedGelombang.nama,
                );
                setToast({
                    show: true,
                    message: "Laporan final penerimaan berhasil diunduh.",
                    type: "success",
                });
            }
            closeModal();
        } catch (err) {
            const msg = err?.message || "Gagal mengunduh laporan.";
            setToast({ show: true, message: msg, type: "error" });
        } finally {
            setIsDownloading(false);
        }
    };

    // ── Logika blokir laporan final ───────────────────────────────────────
    const isFinalBlocked =
        modalType === "final" && selectedGelombang?.status_validasi !== "disetujui";

    const getFinalBlockedMessage = () => {
        if (!selectedGelombang) return null;
        const s = selectedGelombang.status_validasi;
        if (s === "belum_diajukan")
            return "Laporan final belum dapat diunduh karena gelombang belum diajukan untuk validasi.";
        if (s === "menunggu_validasi")
            return "Laporan final belum dapat diunduh karena gelombang masih menunggu validasi.";
        return null;
    };

    const isRekapNotApproved =
        modalType === "rekap" &&
        selectedGelombang &&
        selectedGelombang.status_validasi !== "disetujui";

    const isDownloadButtonDisabled =
        !selectedGelombang || isDownloading || (modalType === "final" && isFinalBlocked);

    return (
        <div className="max-w-7xl mx-auto pb-10 space-y-6">
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />

            {/* ── HEADER ──────────────────────────────────────────────── */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
                    Laporan PPDB
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                    Unduh laporan resmi PPDB dalam format PDF. Klik tombol unduh pada
                    laporan yang diinginkan, lalu pilih gelombang pada modal yang muncul.
                </p>
            </div>

            {/* ── KARTU LAPORAN ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Kartu 1 — Rekapitulasi PPDB */}
                <LaporanCard
                    id="rekap-ppdb"
                    title="Laporan Rekapitulasi PPDB"
                    desc="Ringkasan statistik per gelombang: distribusi status pendaftaran, rekapitulasi asal sekolah, tingkat keterisian kuota, dan paragraf kesimpulan otomatis."
                    badgeLabel="PDF"
                    badgeClass="bg-red-50 text-red-600 border-red-100"
                    btnClass="border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    loading={false}
                    disabled={loadingGelombang}
                    onDownload={() => openModal("rekap")}
                />

                {/* Kartu 2 — Final Penerimaan */}
                <LaporanCard
                    id="final-penerimaan"
                    title="Laporan Final Penerimaan"
                    desc="Daftar seluruh pendaftar yang dinyatakan lulus pada gelombang yang dipilih, lengkap dengan kop surat resmi sekolah."
                    badgeLabel="PDF"
                    badgeClass="bg-red-50 text-red-600 border-red-100"
                    btnClass="border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    loading={false}
                    disabled={loadingGelombang}
                    onDownload={() => openModal("final")}
                />
            </div>

            {/* ── MODAL PILIH GELOMBANG ─────────────────────────────────── */}
            {modalOpen && (
                <GelombangModal
                    modalType={modalType}
                    gelombangList={gelombangList}
                    loadingGelombang={loadingGelombang}
                    selectedGelombang={selectedGelombang}
                    onSelectGelombang={setSelectedGelombang}
                    isDownloading={isDownloading}
                    isFinalBlocked={isFinalBlocked}
                    finalBlockedMessage={getFinalBlockedMessage()}
                    isRekapNotApproved={isRekapNotApproved}
                    isDownloadButtonDisabled={isDownloadButtonDisabled}
                    onDownload={handleDownloadFromModal}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

// ─── MODAL KOMPONEN ────────────────────────────────────────────────────────────

function GelombangModal({
    modalType,
    gelombangList,
    loadingGelombang,
    selectedGelombang,
    onSelectGelombang,
    isDownloading,
    isFinalBlocked,
    finalBlockedMessage,
    isRekapNotApproved,
    isDownloadButtonDisabled,
    onDownload,
    onClose,
}) {
    const isRekap = modalType === "rekap";
    const modalTitle = isRekap
        ? "Unduh Laporan Rekapitulasi PPDB"
        : "Unduh Laporan Final Penerimaan";

    const statusCfg = selectedGelombang
        ? getStatusConfig(selectedGelombang.status_validasi)
        : null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Panel */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
                {/* Header modal */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                            <FileText size={18} className="text-gray-500" />
                        </div>
                        <h2 className="text-base font-bold text-gray-900">
                            {modalTitle}
                        </h2>
                    </div>
                    <button
                        id="btn-close-modal-gelombang"
                        onClick={onClose}
                        disabled={isDownloading}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-40 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body modal */}
                <div className="px-6 py-5 space-y-5">
                    {/* Dropdown gelombang */}
                    <div>
                        <label
                            htmlFor="modal-select-gelombang"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Pilih Gelombang
                        </label>

                        {loadingGelombang ? (
                            <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                                <Loader2 size={15} className="animate-spin" />
                                Memuat daftar gelombang…
                            </div>
                        ) : gelombangList.length === 0 ? (
                            <div className="flex items-center gap-2 text-sm text-amber-600 py-2">
                                <AlertCircle size={15} />
                                Belum ada gelombang yang tersedia.
                            </div>
                        ) : (
                            <div className="relative">
                                <select
                                    id="modal-select-gelombang"
                                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                    value={selectedGelombang?.id_gelombang ?? ""}
                                    onChange={(e) => {
                                        const found = gelombangList.find(
                                            (g) =>
                                                g.id_gelombang === Number(e.target.value),
                                        );
                                        onSelectGelombang(found || null);
                                    }}
                                    disabled={isDownloading}
                                >
                                    <option value="">-- Pilih Gelombang --</option>
                                    {gelombangList.map((g) => (
                                        <option
                                            key={g.id_gelombang}
                                            value={g.id_gelombang}
                                        >
                                            {getGelombangOptionLabel(g)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        )}
                    </div>

                    {/* Detail gelombang terpilih */}
                    {selectedGelombang && (
                        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2.5">
                            {/* Periode */}
                            <div className="flex items-start gap-3">
                                <Calendar
                                    size={14}
                                    className="text-gray-400 mt-0.5 shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                                        Periode
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {formatShortDate(selectedGelombang.tanggal_mulai)}
                                        {" – "}
                                        {formatShortDate(
                                            selectedGelombang.tanggal_selesai,
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Kuota */}
                            <div className="flex items-start gap-3">
                                <Users
                                    size={14}
                                    className="text-gray-400 mt-0.5 shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                                        Kuota
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {selectedGelombang.kuota != null
                                            ? `${selectedGelombang.kuota} siswa`
                                            : "-"}
                                    </p>
                                </div>
                            </div>

                            {/* Status Validasi */}
                            <div className="flex items-start gap-3">
                                <ShieldCheck
                                    size={14}
                                    className="text-gray-400 mt-0.5 shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                                        Status Validasi
                                    </p>
                                    <span
                                        className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusCfg.className}`}
                                    >
                                        {statusCfg.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Catatan laporan rekapitulasi belum disetujui */}
                    {isRekapNotApproved && (
                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                            <Info size={15} className="shrink-0 mt-0.5" />
                            <span>
                                Laporan rekapitulasi masih bersifat sementara karena
                                gelombang belum disetujui.
                            </span>
                        </div>
                    )}

                    {/* Pesan blokir laporan final */}
                    {isFinalBlocked && finalBlockedMessage && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                            <AlertCircle size={15} className="shrink-0 mt-0.5" />
                            <span>{finalBlockedMessage}</span>
                        </div>
                    )}
                </div>

                {/* Footer modal */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <button
                        id="btn-modal-batal"
                        type="button"
                        onClick={onClose}
                        disabled={isDownloading}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        id="btn-modal-unduh"
                        type="button"
                        onClick={onDownload}
                        disabled={isDownloadButtonDisabled}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isDownloading ? (
                            <Loader2 size={15} className="animate-spin" />
                        ) : (
                            <Download size={15} />
                        )}
                        {isDownloading ? "Memproses…" : "Unduh PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── SUB-KOMPONEN KARTU LAPORAN ────────────────────────────────────────────────
// Layout, warna, ikon, spacing TIDAK BERUBAH dari versi sebelumnya.

function LaporanCard({
    id,
    title,
    desc,
    badgeLabel,
    badgeClass,
    btnClass,
    loading,
    disabled,
    onDownload,
}) {
    return (
        <div
            id={`card-laporan-${id}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4"
        >
            {/* Top: icon + badge */}
            <div className="flex items-start justify-between gap-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <FileText size={24} className="text-gray-500" />
                </div>
                <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${badgeClass}`}
                >
                    {badgeLabel}
                </span>
            </div>

            {/* Title + desc */}
            <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>

            {/* Download button */}
            <button
                id={`btn-download-${id}`}
                disabled={disabled}
                onClick={onDownload}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-white ${btnClass}`}
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Download size={16} />
                )}
                {loading ? "Memproses…" : "Unduh PDF"}
            </button>
        </div>
    );
}
