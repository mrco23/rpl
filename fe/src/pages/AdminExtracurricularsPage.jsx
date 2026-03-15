import ContentTablePage from "@components/admin/ContentTablePage.jsx";
import { extracurricularApi } from "@services/siteContentService.js";

export default function AdminExtracurricularsPage() {
  return (
    <ContentTablePage
      title="Kelola Ekstrakurikuler"
      subtitle="Kelola daftar ekstrakurikuler beserta mentor dan jadwalnya."
      headers={["Nama", "Deskripsi", "Mentor", "Jadwal", "Operasi"]}
      formTitle="Simpan Data"
      resourceLabel="Ekstrakurikuler"
      service={extracurricularApi}
      fields={[
        { name: "nama", label: "Nama ekstrakurikuler" },
        { name: "mentor", label: "Mentor" },
        { name: "jadwal", label: "Jadwal" },
        { name: "deskripsi", label: "Deskripsi", type: "textarea", rows: 4 },
        { name: "gambar", label: "Gambar", type: "file", required: false },
      ]}
      rowRenderer={(item, handleEdit, handleDelete) => (
        <tr key={item.id_ekstrakurikuler} className="border-b border-slate-100">
          <td className="px-6 py-4 font-medium text-slate-900">{item.nama}</td>
          <td className="px-6 py-4 text-slate-600">{item.deskripsi}</td>
          <td className="px-6 py-4 text-slate-600">{item.mentor}</td>
          <td className="px-6 py-4 text-slate-600">{item.jadwal}</td>
          <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-xl bg-blue-light text-blue-normal font-semibold">Ubah</button><button onClick={() => handleDelete(item)} className="px-4 py-2 rounded-xl bg-yellow-light text-yellow-dark-active font-semibold">Delete</button></div></td>
        </tr>
      )}
    />
  );
}
