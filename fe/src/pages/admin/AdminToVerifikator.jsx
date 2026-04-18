import React, { useState } from "react";
import { Search, Pencil, Trash2, User, Plus } from "lucide-react";

function AdminToVerifikator() {
  const [search, setSearch] = useState("");

  const [verifikator, setVerifikator] = useState([
    {
      id: 1,
      username: "Reins",
      nama: "Reins Orlando",
    },
    {
      id: 2,
      username: "selomitha",
      nama: "Selomitha Nong",
    },
    {
      id: 3,
      username: "marcois",
      nama: "Marcois Makalew",
    },
    {
      id: 4,
      username: "Lando",
      nama: "Orlando Maindjanga",
    },
  ]);

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus akun?")) return;
    setVerifikator((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = verifikator.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-4">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Manajemen Akun Verifikator
          </h1>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor lorem ipsum dolor gipsum
          </p>
        </div>

        {/* SEARCH & BUTTON */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Cari nama / username..."
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
            <table className="w-full text-sm text-left min-w-[500px]">
              
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Akun Verifikator</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                            <User className="text-gray-500" size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.username}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {item.nama}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap justify-center gap-2">

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
                    <td colSpan="2" className="text-center py-6 text-gray-500">
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

export default AdminToVerifikator;