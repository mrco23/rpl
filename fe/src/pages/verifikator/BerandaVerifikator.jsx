import React from "react";
import {
  Users,
  Clock3,
  AlertTriangle,
  BadgeCheck,
  Info,
  ArrowRight,
} from "lucide-react";

function BerandaVerifikator() {
  const cards = [
    {
      title: "Total Pendaftar",
      total: 128,
      color: "border-blue-500",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      icon: <Users size={22} className="text-blue-700" />,
      link: "Lihat Semua",
    },
    {
      title: "Menunggu Verifikasi",
      total: 24,
      color: "border-yellow-500",
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      icon: <Clock3 size={22} className="text-yellow-700" />,
      link: "Mulai Verifikasi",
    },
    {
      title: "Perlu Perbaikan",
      total: 12,
      color: "border-red-500",
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      icon: <AlertTriangle size={22} className="text-red-600" />,
      link: "Lihat yang perlu revisi",
    },
    {
      title: "Terverifikasi",
      total: 128,
      color: "border-green-500",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      icon: <BadgeCheck size={22} className="text-green-700" />,
      link: "Lihat Semua",
    },
  ];

  return (
    <div className="p-7 bg-gray-100 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Beranda Verifikator
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Selamat datang di sistem verifikasi dokumen PPDB
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-4 gap-5 mt-8">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl border-l-4 ${item.color} ${item.bg} shadow-sm px-5 py-4`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>

                <div className="flex items-end gap-2 mt-1">
                  <h2 className="text-4xl font-bold text-slate-800">
                    {item.total}
                  </h2>
                  <span className="text-sm text-gray-500 mb-1">siswa</span>
                </div>
              </div>

              <div className={`p-3 rounded-full ${item.iconBg}`}>
                {item.icon}
              </div>
            </div>

            <button className="mt-5 flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline">
              {item.link}
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Informasi */}
      <div className="mt-8 bg-white rounded-2xl shadow-md  px-6 py-5">
        <div className="flex gap-4">
          <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center">
            <Info size={18} />
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-800">Informasi</h3>
            <p className="text-gray-600 mt-1">
              Periksa dan verifikasi dokumen pendaftar dengan teliti. Jika ada
              kekurangan, pilih “Perlu Revisi” dan tuliskan catatan yang jelas.
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-2 gap-5 mt-8">
        {/* Pendaftar Baru */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-slate-700">
              Pendaftar Terbaru
            </h3>

            <button className="text-sm border px-3 py-1 rounded-lg text-blue-700">
              Lihat Semua
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left p-3">Nama Siswa</th>
                  <th className="text-left p-3">Tanggal Daftar</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-3">Elegantia Makarawung</td>
                  <td className="p-3">24 Apr 2026</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Menunggu
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Selomitha Nong</td>
                  <td className="p-3">24 Mar 2026</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Terverifikasi
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Reins Maindjanga</td>
                  <td className="p-3">24 Jan 2026</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Perlu Revisi
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="mt-5 text-blue-700 text-sm font-medium flex items-center gap-2">
            Lihat Semua Pendaftar
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Perlu Revisi */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-slate-700">
              Yang Perlu Revisi
            </h3>

            <button className="text-sm border px-3 py-1 rounded-lg text-blue-700">
              Lihat Semua
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-2">
            <table className="w-full text-sm mt-2">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left p-3">Nama Siswa</th>
                  <th className="text-left p-3">Dokumen</th>
                  <th className="text-left p-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-3">Marcois Makalew</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Pas Foto
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="border text-blue-700 px-3 py-1 rounded-lg text-xs">
                      Periksa Ulang
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Citra Manopo</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Pas Foto
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="border text-blue-700 px-3 py-1 rounded-lg text-xs">
                      Periksa Ulang
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Michael Tawas</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Pas Foto
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="border text-blue-700 px-3 py-1 rounded-lg text-xs">
                      Periksa Ulang
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="mt-4 text-blue-700 text-sm font-medium flex items-center gap-2">
            Lihat Semua yang Perlu Revisi
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BerandaVerifikator;
