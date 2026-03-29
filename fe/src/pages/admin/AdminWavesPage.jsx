import ContentTablePage from "@components/admin/ContentTablePage.jsx";
import { waveApi } from "@services/waveService.js";

const headers = ["Nama Gelombang", "Tanggal Mulai", "Tanggal Selesai", "Kuota", "Aksi"];

const fields = [
  { name: "nama", label: "Nama Gelombang", type: "text" },
  { name: "tanggal_mulai", label: "Tanggal Mulai", type: "datetime-local" },
  { name: "tanggal_selesai", label: "Tanggal Selesai", type: "datetime-local" },
  { name: "kuota", label: "Kuota Pendaftar", type: "number", min: 1 },
];

const emptyForm = {
  nama: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
  kuota: 0,
};

export default function AdminWavesPage() {
  const rowRenderer = (item, onEdit, onDelete) => (
    <tr key={item.id_gelombang} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-800">{item.nama}</td>
      <td className="px-6 py-4 text-slate-600">
        {new Date(item.tanggal_mulai).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}
      </td>
      <td className="px-6 py-4 text-slate-600">
        {new Date(item.tanggal_selesai).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}
      </td>
      <td className="px-6 py-4 text-slate-600">{item.kuota} Siswa</td>
      <td className="px-6 py-4 text-right space-x-3">
        <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
        <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
      </td>
    </tr>
  );

  return (
    <ContentTablePage
      title="Kelola Gelombang"
      subtitle="Manajemen gelombang pendaftaran siswa baru"
      headers={headers}
      formTitle="Simpan Gelombang"
      resourceLabel="Gelombang"
      service={waveApi}
      fields={fields}
      rowRenderer={rowRenderer}
      idField="id_gelombang"
      initialForm={emptyForm}
    />
  );
}
