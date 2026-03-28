import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@components/layout/DashboardLayout.jsx";
import { TableWrapper } from "@components/ui/ui";
import Modal from "@components/ui/Modal.jsx";
import EmptyState from "@components/ui/EmptyState.jsx";
import { adminSidebar } from "@data/navigation.js";

const emptyForm = {
  judul: "",
  nama: "",
  deskripsi: "",
  isi: "",
  mentor: "",
  jadwal: "",
  gambar: null,
};

export default function ContentTablePage({
  title,
  subtitle,
  headers,
  formTitle,
  resourceLabel,
  service,
  fields,
  rowRenderer,
  idField = "id",
  initialForm = emptyForm,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const modalTitle = useMemo(() => editingItem ? `Ubah ${resourceLabel}` : `Tambah ${resourceLabel}`, [editingItem, resourceLabel]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await service.getAdminList();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || `Gagal memuat ${resourceLabel.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingItem(null);
    setError("");
  };

  const handleOpenCreate = () => {
    resetForm();
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    
    // Fill form dynamically based on initialForm structure
    const editForm = { ...initialForm };
    Object.keys(initialForm).forEach((key) => {
      if (item[key] !== undefined && item[key] !== null) {
        // Automatically handle datetime formatting if necessary
        if (typeof item[key] === "string" && item[key].includes("T") && (key.includes("tanggal") || key.includes("date"))) {
          editForm[key] = item[key].substring(0, 16);
        } else {
          editForm[key] = item[key];
        }
      }
    });

    if ('gambar' in editForm) {
      editForm.gambar = null;
    }

    setForm(editForm);
    setOpen(true);
  };

  const handleDelete = async (item) => {
    const ok = window.confirm(`Hapus ${resourceLabel.toLowerCase()} ini?`);
    if (!ok) return;
    try {
      await service.remove(item[idField] || item.id_ekstrakurikuler || item.id_berita || item.id_prestasi);
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || `Gagal menghapus ${resourceLabel.toLowerCase()}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingItem) {
        const id = editingItem[idField] || editingItem.id_ekstrakurikuler || editingItem.id_berita || editingItem.id_prestasi;
        await service.update(id, form);
      } else {
        await service.create(form);
      }
      setOpen(false);
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || `Gagal menyimpan ${resourceLabel.toLowerCase()}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="Admin" title={title} subtitle={subtitle} sidebarItems={adminSidebar}>
      {error && <div className="mb-6 rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm">{error}</div>}
      <TableWrapper
        headers={headers}
        actions={<button onClick={handleOpenCreate} className="px-5 py-3 rounded-2xl bg-blue-dark text-white font-semibold">Tambah Data</button>}
      >
        {items.length > 0 ? items.map((item) => rowRenderer(item, handleEdit, handleDelete)) : (
          <tr>
            <td colSpan={headers.length} className="px-6 py-8">{loading ? <div className="text-slate-500">Memuat data...</div> : <EmptyState title={`Belum ada ${resourceLabel.toLowerCase()}`} />}</td>
          </tr>
        )}
      </TableWrapper>

      <Modal open={open} title={modalTitle} onClose={() => setOpen(false)}>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-2">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea rows={field.rows || 4} value={form[field.name]} onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))} className="w-full px-5 py-4 rounded-2xl border border-slate-200" required={field.required !== false} />
              ) : field.type === "file" ? (
                <input type="file" accept="image/*" onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.files?.[0] || null }))} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white" />
              ) : field.type === "datetime-local" ? (
                <input type="datetime-local" value={form[field.name]} onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white" required={field.required !== false} />
              ) : field.type === "number" ? (
                <input type="number" min={field.min || 0} value={form[field.name]} onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white" required={field.required !== false} />
              ) : (
                <input type="text" value={form[field.name]} onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))} className="w-full px-5 py-4 rounded-2xl border border-slate-200" required={field.required !== false} />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-semibold">Batal</button>
            <button type="submit" disabled={saving} className="px-5 py-3 rounded-2xl bg-blue-dark text-white font-semibold disabled:opacity-60">{saving ? "Menyimpan..." : formTitle}</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
