import React from 'react';
import { Search, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import AdminHeader from '../../components/features/AdminHeader';

export default function AdminEkstrakurikulerPage() {
  // Data dummy tabel ekstrakurikuler (Sesuai gambar mockup)
  const extracurriculars = [
    { id: 1, name: 'Paskibraka', description: 'Lorem Ipsum Dolor...', advisor: 'Prabowo Subianto' },
    { id: 2, name: 'Kesenian', description: 'Lorem Ipsum Dolor...', advisor: 'Joko Widodo' },
    { id: 3, name: 'Choir', description: 'Lorem Ipsum Dolor...', advisor: 'Megawati' },
    { id: 4, name: 'Paskibraka', description: 'Lorem Ipsum Dolor...', advisor: 'Prabowo Subianto' },
    { id: 5, name: 'Paskibraka', description: 'Lorem Ipsum Dolor...', advisor: 'Prabowo Subianto' },
    { id: 6, name: 'Paskibraka', description: 'Lorem Ipsum Dolor...', advisor: 'Prabowo Subianto' },
  ];

  return (
    <>
      <AdminHeader
        text="Ekstrakurikuler"
        subText="Lorem Ipsum dolor lorem ipsum dolor gipsum"
      />

      <div className="max-w-7xl mx-auto">

        {/* Toolbar: Pencarian & Tombol Buat */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari Ekstrakurikuler ..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-[#253b80] text-[#253b80] hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} strokeWidth={2.5} />
            Buat
          </button>
        </div>

        {/* Tabel Ekstrakurikuler */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4 w-1/4">Ekstrakurikuler</th>
                <th className="p-4 w-1/3">Deskripsi</th>
                <th className="p-4 w-1/4">Pembina</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {extracurriculars.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-800 font-semibold">
                    {item.name}
                  </td>
                  <td className="p-4 text-sm text-gray-800 font-semibold">
                    {item.description}
                  </td>
                  <td className="p-4 text-sm text-gray-800 font-semibold">
                    {item.advisor}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Tombol Lihat */}
                      <button
                        title="Lihat Detail"
                        className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                      >
                        <Eye size={16} />
                      </button>

                      {/* Tombol Edit */}
                      <button
                        title="Edit Ekstrakurikuler"
                        className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors hover:border-blue-300"
                      >
                        <Edit2 size={16} />
                      </button>

                      {/* Tombol Hapus */}
                      <button
                        title="Hapus Ekstrakurikuler"
                        className="p-1.5 border border-red-200 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}