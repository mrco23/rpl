import React, { useState } from "react";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import img from "@assets/berita.jpg";

function AdminBerita() {
  const [berita, setBerita] = useState([
    {
      id: 1,
      nama: "Kegiatan Menyanyi",
      gambar: img,
      deskripsi: "Lorem ipsum dolor sit amet",
      tanggal: "2028-04-24",
    },
    {
      id: 2,
      nama: "Festival Menari",
      gambar: img,
      deskripsi: "Lorem ipsum dolor sit amet",
      tanggal: "2028-04-24",
    },
    {
      id: 3,
      nama: "Lomba Melukis",
      gambar: img,
      deskripsi: "Lorem ipsum dolor sit amet",
      tanggal: "2028-04-24",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus data?")) return;
    setBerita((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = berita.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  // FORMAT TANPA KOMA
  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);

    const hari = date.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggalNum = date.getDate();
    const bulan = date.toLocaleDateString("id-ID", { month: "long" });
    const tahun = date.getFullYear();

    return `${hari} ${tanggalNum} ${bulan} ${tahun}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-4">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Berita</h1>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor lorem ipsum dolor gipsum
          </p>
        </div>

        {/* SEARCH & BUTTON */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Cari Berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-blue-800 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50">
            <Plus size={16} />
            Buat
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[700px]">
              
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Judul Berita</th>
                  <th className="px-4 py-3">Gambar</th>
                  <th className="px-4 py-3">Deskripsi</th>
                  <th className="px-4 py-3">Tanggal Dibuat</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">

                      <td className="px-4 py-3 font-medium">
                        {item.nama}
                      </td>

                      <td className="px-4 py-3">
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>

                      <td className="px-4 py-3 truncate max-w-xs">
                        {item.deskripsi}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatTanggal(item.tanggal)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap justify-center gap-2">

                          <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                            <Plus size={14} /> Tambah
                          </button>

                          <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded">
                            <Pencil size={14} /> Ubah
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminBerita; 