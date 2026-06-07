import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit-table";

// ─── HELPER FORMAT ─────────────────────────────────────────────────────────────

/**
 * Format tanggal panjang Indonesia, e.g. "07 Juni 2026"
 * @param {Date|string} date
 * @returns {string}
 */
export const formatLongDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

/**
 * Format persentase maksimal 2 desimal, aman terhadap pembagian nol.
 * @param {number} value - Nilai (pembilang)
 * @param {number} total - Total (pembagi)
 * @returns {string} e.g. "85.71%"
 */
export const formatPersen = (value, total) => {
    if (!total || total === 0) return "0%";
    const pct = (value / total) * 100;
    return `${pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(2)}%`;
};

/**
 * Format angka persentase (sudah dalam bentuk %) menjadi string aman.
 * @param {number} pct - Nilai persentase (sudah dihitung)
 * @returns {string}
 */
export const formatPct = (pct) => {
    if (pct === null || pct === undefined || isNaN(pct)) return "0%";
    return `${pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(2)}%`;
};

// ─── LAYOUT ────────────────────────────────────────────────────────────────────

/**
 * Mengembalikan konstanta layout halaman PDF.
 * Gunakan ini sebagai satu-satunya sumber koordinat layout.
 *
 * @param {PDFDocument} doc
 * @returns {{ pageWidth, leftMargin, rightMargin, contentWidth, contentX }}
 */
export const getPageLayout = (doc) => {
    const pageWidth = doc.page.width;
    const leftMargin = doc.page.margins.left;
    const rightMargin = doc.page.margins.right;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    const contentX = leftMargin;
    return { pageWidth, leftMargin, rightMargin, contentWidth, contentX };
};

// ─── KOP SURAT ────────────────────────────────────────────────────────────────

/**
 * Menggambar KOP surat pada dokumen PDF.
 * - Logo di kiri (public/logo.png), fallback tanpa logo jika tidak ada.
 * - Teks identitas sekolah CENTER terhadap SELURUH area cetak (bukan area kanan logo).
 * - Garis ganda simetris mengikuti contentWidth.
 *
 * @param {PDFDocument} doc
 * @param {object} kopData - { namaSekolah, akreditasi, alamat, telepon, email }
 */
export const drawKopSurat = (doc, kopData) => {
    const { contentX, contentWidth } = getPageLayout(doc);
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoExists = fs.existsSync(logoPath);
    const logoSize = 65; // width & height logo
    const logoY = doc.y;

    // Gambar logo di sebelah kiri area cetak
    if (logoExists) {
        try {
            doc.image(logoPath, contentX, logoY, { width: logoSize, height: logoSize });
        } catch {
            // Lanjut tanpa logo jika file gagal di-decode
        }
    }

    // Teks identitas CENTER terhadap contentWidth penuh (bukan area kanan logo)
    const textStartY = logoY;

    doc.fontSize(14)
        .font("Helvetica-Bold")
        .text(
            kopData.namaSekolah || "SMP KATOLIK ST. RAFAEL MANADO",
            contentX,
            textStartY,
            { width: contentWidth, align: "center" },
        );

    doc.fontSize(10)
        .font("Helvetica")
        .text(`AKREDITASI ${kopData.akreditasi || "B"}`, contentX, doc.y + 2, {
            width: contentWidth,
            align: "center",
        });

    doc.text(kopData.alamat || "-", contentX, doc.y + 2, {
        width: contentWidth,
        align: "center",
    });

    doc.text(
        `${kopData.telepon || "-"} | ${kopData.email || "-"}`,
        contentX,
        doc.y + 2,
        { width: contentWidth, align: "center" },
    );

    // Garis ganda horizontal simetris setelah KOP
    // Pastikan garis tidak lebih tinggi dari logo
    const lineY = Math.max(doc.y + 8, logoY + logoSize + 4);

    doc.moveTo(contentX, lineY)
        .lineTo(contentX + contentWidth, lineY)
        .lineWidth(2)
        .stroke();

    doc.moveTo(contentX, lineY + 3)
        .lineTo(contentX + contentWidth, lineY + 3)
        .lineWidth(0.5)
        .stroke();

    // Reset posisi Y ke bawah garis
    doc.x = contentX;
    doc.y = lineY + 12;
};

// ─── JUDUL LAPORAN ────────────────────────────────────────────────────────────

/**
 * Menggambar blok judul laporan secara center terhadap contentWidth.
 *
 * @param {PDFDocument} doc
 * @param {object} opts
 * @param {string} opts.judul          - Baris judul utama (uppercase)
 * @param {string} opts.namaGelombang  - Nama gelombang (uppercase)
 * @param {string} [opts.tahunAjaran]  - e.g. "2025/2026"
 * @param {string} opts.periodeMulai   - Tanggal mulai pendaftaran
 * @param {string} opts.periodeSelesai - Tanggal selesai pendaftaran
 */
export const drawCenteredReportHeader = (doc, opts) => {
    const { contentX, contentWidth } = getPageLayout(doc);

    doc.x = contentX;
    doc.moveDown(0.5);

    doc.fontSize(13)
        .font("Helvetica-Bold")
        .text(opts.judul, contentX, doc.y, { width: contentWidth, align: "center" });

    doc.fontSize(11)
        .font("Helvetica-Bold")
        .text((opts.namaGelombang || "").toUpperCase(), contentX, doc.y + 2, {
            width: contentWidth,
            align: "center",
        });

    if (opts.tahunAjaran) {
        doc.fontSize(10)
            .font("Helvetica")
            .text(`TAHUN AJARAN ${opts.tahunAjaran}`, contentX, doc.y + 2, {
                width: contentWidth,
                align: "center",
            });
    }

    doc.moveDown(0.4);

    doc.fontSize(9)
        .font("Helvetica")
        .text(
            `Periode Pendaftaran: ${opts.periodeMulai} – ${opts.periodeSelesai}`,
            contentX,
            doc.y,
            { width: contentWidth, align: "center" },
        );

    doc.text(`Tanggal Cetak: ${formatLongDate(new Date())}`, contentX, doc.y + 2, {
        width: contentWidth,
        align: "center",
    });

    doc.x = contentX;
    doc.moveDown(1);
};

// ─── TANDA TANGAN ─────────────────────────────────────────────────────────────

/**
 * Menggambar blok tanda tangan kepala sekolah di sisi kanan.
 * Posisi dihitung berdasarkan contentWidth — tidak hardcoded.
 *
 * @param {PDFDocument} doc
 * @param {string} namaKepsek
 */
export const drawSignature = (doc, namaKepsek) => {
    const { contentX, contentWidth } = getPageLayout(doc);

    doc.moveDown(2);

    // Semua teks align right dalam contentWidth
    doc.fontSize(10)
        .font("Helvetica")
        .text(`Manado, ${formatLongDate(new Date())}`, contentX, doc.y, {
            width: contentWidth,
            align: "right",
        });

    doc.text("Kepala Sekolah,", contentX, doc.y + 4, {
        width: contentWidth,
        align: "right",
    });

    doc.moveDown(3.5);

    doc.font("Helvetica-Bold").text(
        namaKepsek || "Kepala Sekolah",
        contentX,
        doc.y,
        { width: contentWidth, align: "right", underline: true },
    );
};

// ─── FACTORY PDF ──────────────────────────────────────────────────────────────

/**
 * Membuat instance PDFDocument baru dengan margin standar A4.
 * @returns {PDFDocument}
 */
export const createPdfDoc = () =>
    new PDFDocument({ margin: 50, size: "A4", autoFirstPage: true });
