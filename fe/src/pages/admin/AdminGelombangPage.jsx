import React, { useState } from "react";
import {
  Plus,
  CalendarDays,
  Users,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock3,
  FileCheck,
  Search,
  X,
} from "lucide-react";
import AdminHeader from "@components/features/AdminHeader";

function AdminGelombang() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedGelombang, setSelectedGelombang] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dataGelombang = [
    {
      id: 1,
      nama: "Gelombang 1",
      tanggal: "1 Jan - 31 Jan",
      kuota: 100,
      peserta: 100,
      status: "Selesai",
    },
    {
      id: 2,
      nama: "Gelombang 2",
      tanggal: "1 Feb - 28 Feb",
      kuota: 100,
      peserta: 70,
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Gelombang 3",
      tanggal: "1 Mar - 31 Mar",
      kuota: 100,
      peserta: 0,
      status: "Akan Datang",
    },
  ];

  const dataPendaftar = [
    {
      nama: "Reins Orlando",
      nisn: "123456",
      status: "Lolos",
      tanggal: "12 Jan 2026",
    },
    {
      nama: "Andi Saputra",
      nisn: "789101",
      status: "Pending",
      tanggal: "13 Jan 2026",
    },
    {
      nama: "Maria Clara",
      nisn: "112233",
      status: "Ditolak",
      tanggal: "14 Jan 2026",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Aktif") return "bg-green-100 text-green-700";

    if (status === "Selesai") return "bg-gray-200 text-gray-700";

    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusPeserta = (status) => {
    if (status === "Lolos") return "bg-green-100 text-green-700";

    if (status === "Pending") return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  const progressWidth = (peserta, kuota) => {
    return `${(peserta / kuota) * 100}%`;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* BUTTON */}
        <div className="flex justify-between items-start mb-6">
          <AdminHeader
            text="Gelombang"
            subText="Kelola periode pendaftaran calon peserta didik"
          />

          <button className="bg-[#2f4aa0] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-[#253b80]">
            <Plus size={16} />
            Tambah Gelombang
          </button>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <InfoCard
            icon={<FileCheck size={18} />}
            title="Total Gelombang"
            value="3"
            desc="Gelombang"
            color="text-blue-600"
          />

          <InfoCard
            icon={<CheckCircle2 size={18} />}
            title="Gelombang Aktif"
            value="1"
            desc="Aktif"
            color="text-green-600"
          />

          <InfoCard
            icon={<Clock3 size={18} />}
            title="Akan Datang"
            value="1"
            desc="Gelombang"
            color="text-indigo-500"
          />

          <InfoCard
            icon={<FileCheck size={18} />}
            title="Selesai"
            value="1"
            desc="Selesai"
            color="text-blue-600"
          />
        </div>

        {/* CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dataGelombang.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{item.nama}</h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <hr className="my-4" />

              <div className="flex items-center gap-3 mb-4">
                <CalendarDays size={18} className="text-[#2f4aa0]" />
                {item.tanggal}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <Users size={18} className="text-[#2f4aa0]" />
                {item.peserta}/{item.kuota} Peserta
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mb-5">
                <div
                  className="h-2 bg-[#2f4aa0] rounded-full"
                  style={{
                    width: progressWidth(item.peserta, item.kuota),
                  }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setSelectedGelombang(item);
                    setOpenModal(true);
                  }}
                  className="border rounded-md py-2 flex justify-center hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>

                <button className="border rounded-md py-2 flex justify-center hover:bg-blue-50 cursor-pointer">
                  <Pencil size={16} className="text-blue-600" />
                </button>

                <button className="border rounded-md py-2 flex justify-center hover:bg-red-50 cursor-pointer">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL BESAR */}
      {openModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex justify-center items-center p-5">
          <div className="bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-2xl shadow-xl">
            {/* HEADER */}
            <div className="flex justify-between items-start p-6 ">
              <div>
                <h2 className="text-3xl font-bold">Daftar Pendaftar</h2>

                <p className="text-gray-500 mt-1">
                  {selectedGelombang.nama} • {selectedGelombang.tanggal}
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className=" px-3 py-1 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-50"
              >
                <X size={20} />
                
              </button>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-6">
              <StatCard
                title="Total Peserta"
                value="3"
                color="text-slate-800"
              />

              <StatCard title="Lolos" value="1" color="text-green-600" />

              <StatCard title="Pending" value="1" color="text-yellow-600" />

              <StatCard title="Ditolak" value="1" color="text-red-600" />
            </div>

            {/* TABLE */}
            <div className="px-6 pb-6">
              <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-400 ">
                  <div className="relative w-72">
                    <Search
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Cari peserta..."
                      className="w-full border border-gray-500 rounded-lg pl-10 pr-4 py-2"
                    />
                  </div>
                </div>

                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="p-4">Nama</th>
                      <th className="p-4">NISN</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Tanggal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataPendaftar.map((item, index) => (
                      <tr key={index} className="border border-gray-100">
                        <td className="p-4">{item.nama}</td>

                        <td className="p-4">{item.nisn}</td>

                        <td className="p-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-md ${getStatusPeserta(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="p-4">{item.tanggal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* PAGINATION */}

                <div className="p-4 flex justify-end items-center gap-2 bg-white">
                  {/* PREV */}
                  <button
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  >
                    {"<"}
                  </button>

                  {/* PAGE 1 */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-9 h-9 rounded-lg ${
                      currentPage === 1
                        ? "bg-[#2f4aa0] text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    1
                  </button>

                  {/* PAGE 2 */}
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-9 h-9 rounded-lg ${
                      currentPage === 2
                        ? "bg-[#2f4aa0] text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    2
                  </button>

                  {/* PAGE 3 */}
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-9 h-9 rounded-lg ${
                      currentPage === 3
                        ? "bg-[#2f4aa0] text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    3
                  </button>

                  {/* NEXT */}
                  <button
                    onClick={() =>
                      currentPage < 3 && setCurrentPage(currentPage + 1)
                    }
                    className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InfoCard({ icon, title, value, desc, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <div className="flex gap-3 mb-3">
        <div className={color}>{icon}</div>
        <h4 className="text-sm text-gray-500">{title}</h4>
      </div>

      <div className="flex gap-2 items-end">
        <span className="text-2xl font-bold">{value}</span>

        <span className="text-sm text-gray-500 pb-1">{desc}</span>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#f8f9fc] rounded-2xl p-5 border">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
    </div>
  );
}

export default AdminGelombang;
