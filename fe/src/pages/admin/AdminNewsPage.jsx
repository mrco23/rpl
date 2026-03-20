import ContentTablePage from "@components/admin/ContentTablePage.jsx";
import { newsApi } from "@services/siteContentService.js";

export default function AdminNewsPage() {
  return (
    <ContentTablePage
      title="Kelola Berita"
      subtitle="Kelola konten berita agar website publik tetap aktif dan relevan."
      headers={["Judul", "Deskripsi", "Isi", "Operasi"]}
      formTitle="Simpan Data"
      resourceLabel="Berita"
      service={newsApi}
      fields={[
        { name: "judul", label: "Judul berita" },
        { name: "deskripsi", label: "Deskripsi", type: "textarea", rows: 3 },
        { name: "isi", label: "Isi berita", type: "textarea", rows: 5 },
        { name: "gambar", label: "Gambar", type: "file", required: false },
      ]}
      rowRenderer={(item, handleEdit, handleDelete) => (
        <tr key={item.id_berita} className="border-b border-slate-100">
          <td className="px-6 py-4 font-medium text-slate-900">{item.judul}</td>
          <td className="px-6 py-4 text-slate-600">{item.deskripsi}</td>
          <td className="px-6 py-4 text-slate-600">{item.isi}</td>
          <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-xl bg-blue-light text-blue-normal font-semibold">Ubah</button><button onClick={() => handleDelete(item)} className="px-4 py-2 rounded-xl bg-yellow-light text-yellow-dark-active font-semibold">Delete</button></div></td>
        </tr>
      )}
    />
  );
}
