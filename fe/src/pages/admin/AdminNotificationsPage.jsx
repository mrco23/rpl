import React, { useState } from "react";
import {
  Megaphone,
  CheckCircle,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Info,
  Calendar,
  Clock,
  ClipboardList,
} from "lucide-react";

function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const stats = [
    {
      title: "Semua Pengumuman",
      value: 12,
      icon: <Megaphone size={20} />,
      color: "bg-blue-900 text-white",
    },
    {
      title: "Diunggah",
      value: 8,
      icon: <CheckCircle size={20} />,
      color: "bg-green-700 text-white",
    },
    {
      title: "Dijadwalkan",
      value: 2,
      icon: <Clock size={20} />,
      color: "bg-yellow-600 text-white",
    },
    {
      title: "Draft",
      value: 2,
      icon: <FileText size={20} />,
      color: "bg-gray-600 text-white",
    },
  ];

  const data = [
    {
      id: 1,
      status: "Diunggah",
      title: "Hasil Seleksi Gelombang 1",
      desc: "Pengumuman hasil seleksi calon peserta didik baru gelombang 1.",
      date: "12 April 2026",
      time: "10:00",
    },
    {
      id: 2,
      status: "Dijadwalkan",
      title: "Pembukaan Gelombang 2",
      desc: "Pendaftaran gelombang 2 akan segera dibuka.",
      date: "02 Mei 2026",
      time: "08:00",
    },
    {
      id: 3,
      status: "Draft",
      title: "Jadwal Wawancara Orang Tua",
      desc: "Informasi jadwal wawancara untuk orang tua/wali.",
      date: "-",
      time: "-",
    },
    {
      id: 4,
      status: "Diunggah",
      title: "Jadwal Daftar Ulang",
      desc: "Informasi daftar ulang bagi pendaftar yang diterima.",
      date: "15 April 2026",
      time: "09:00",
    },
  ];

  const filteredData =
    activeTab === "Semua"
      ? data
      : data.filter((item) => item.status === activeTab);

  const statusColor = (status) => {
    switch (status) {
      case "Diunggah":
        return "text-green-600 bg-green-600/10";
      case "Dijadwalkan":
        return "text-yellow-600 bg-yellow-600/10";
      case "Draft":
        return "text-blue-600 bg-blue-600/10";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Pengumuman PPDB</h1>
        <p className="text-gray-500">
          Kelola informasi dan pengumuman untuk calon peserta didik baru.
        </p>
      </div>

      {/* STAT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
          >
            {/* ICON */}
            <div className={`p-3 rounded-lg ${item.color}`}>{item.icon}</div>

            {/* TEXT */}
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-semibold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KIRI (DAFTAR PENGUMUMAN) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border-md  border-gray-500 p-5 shadow-sm">
            {/* TITLE */}
            <h2 className="flex items-center gap-2 font-semibold mb-3">
              <ClipboardList size={18} />
              Daftar Pengumuman
            </h2>

            {/* TAB */}
            <div className="flex gap-4 mb-4">
              {["Semua", "Diunggah", "Dijadwalkan"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* LIST */}
            <div className="space-y-4">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="shadow-md border-gray-500 rounded-lg p-4 flex justify-between items-start bg-white"
                >
                  {/* LEFT */}
                  <div className="flex gap-4">
                    {/* STATUS */}
                    <span
                      className={`text-xs px-2 py-[2px] h-6 rounded-md font-medium ${statusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>

                    {/* CONTENT */}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>

                      {/* DATE */}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{item.date}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="flex gap-2">
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button className="p-2 border rounded-md hover:bg-red-100 text-red-500 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-3 py-1 border rounded">&lt;</button>
              <button className="px-3 py-1 bg-blue-800 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">&gt;</button>
            </div>
          </div>
        </div>

        {/* KANAN (KOSONG, SESUAI GAMBAR) */}
        <div></div>
      </div>

      {/* NOTE */}
      <div className="mt-6 bg-blue-100 text-blue-700 p-4 rounded-lg text-sm flex items-start gap-3">
        <Info size={18} className="mt-0.5" />

        <p>
          Pengumuman yang sudah diunggah akan langsung terlihat oleh calon
          pendaftar pada halaman pengumuman.
        </p>
      </div>
    </div>
  );
}

export default AdminNotificationsPage;
