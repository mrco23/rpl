import ContentTablePage from "@components/admin/ContentTablePage.jsx";
import { achievementApi } from "@services/siteContentService.js";

export default function AdminAchievementsPage() {
  return (
    <ContentTablePage
      title="Kelola Prestasi"
      subtitle="Tambah, edit, atau hapus konten prestasi pada halaman publik."
      headers={["Judul", "Deskripsi", "Operasi"]}
      formTitle="Simpan Data"
      resourceLabel="Prestasi"
      service={achievementApi}
      fields={[
        { name: "judul", label: "Judul prestasi" },
        { name: "deskripsi", label: "Deskripsi", type: "textarea", rows: 4 },
        { name: "gambar", label: "Gambar", type: "file", required: false },
      ]}
      rowRenderer={(item, handleEdit, handleDelete) => (
        <tr key={item.id_prestasi} className="border-b border-slate-100">
          <td className="px-6 py-4 font-medium text-slate-900">{item.judul}</td>
          <td className="px-6 py-4 text-slate-600">{item.deskripsi}</td>
          <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-xl bg-blue-light text-blue-normal font-semibold">Ubah</button><button onClick={() => handleDelete(item)} className="px-4 py-2 rounded-xl bg-yellow-light text-yellow-dark-active font-semibold">Delete</button></div></td>
        </tr>
      )}
    />
  );
}
