import React from "react";
import {
  Users,
  ArrowRight,
  UserCircle2,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

function DashboardAdmin() {
  /* ==================================
     DATA (siap backend nanti)
  ================================== */
  const summaryCards = [
    {
      id: 1,
      title: "Ekstrakurikuler",
      total: 5,
      icon: <BookOpen size={22} />,
    },
    {
      id: 2,
      title: "Guru",
      total: 12,
      icon: <Users size={22} />,
    },
    {
      id: 3,
      title: "Pendaftar",
      total: 30,
      icon: <GraduationCap size={22} />,
    },
    {
      id: 4,
      title: "Verifikator",
      total: 4,
      icon: <ShieldCheck size={22} />,
    },
  ];

  const latestApplicants = [
    {
      id: 1,
      name: "Reins Maindjanga",
      nisn: "008xxxxxxx",
      registerDate: "24 Apr 2026",
      status: "Menunggu",
    },
    {
      id: 2,
      name: "Budi Santoso",
      nisn: "008xxxxxxx",
      registerDate: "24 Mar 2026",
      status: "Terverifikasi",
    },
    {
      id: 3,
      name: "Citra Kasih",
      nisn: "008xxxxxxx",
      registerDate: "24 Jan 2026",
      status: "Perlu Revisi",
    },
  ];

  const verifiers = [
    {
      id: 1,
      fullName: "Elegantia Makarawung",
      username: "esyaaa",
    },
    {
      id: 2,
      fullName: "Selomitha Nong",
      username: "mithacia",
    },
    {
      id: 3,
      fullName: "Marcois Makalew",
      username: "mrcois",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Terverifikasi":
        return "bg-green-100 text-green-700";
      case "Perlu Revisi":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className=" bg-gray-100 p-4 md:p-6">
      {/* HEADER */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Beranda Admin
        </h1>

        <p className="text-sm md:text-base text-gray-500 mt-1">
          Selamat datang di dashboard admin.
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {summaryCards.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  {item.total}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                {item.icon}
              </div>
            </div>

            <button className="mt-4 text-sm text-blue-700 flex items-center gap-1 hover:underline">
              Lihat Detail
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PENDAFTAR */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-800">
              Pendaftar Terbaru
            </h2>

            <button className="text-sm text-blue-700 hover:underline flex items-center gap-1">
              Lihat Semua
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {latestApplicants.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <UserCircle2
                    size={42}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="font-medium text-sm">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      NISN : {item.nisn}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {item.registerDate}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* VERIFIKATOR */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-800">
              Daftar Verifikator
            </h2>

            <button className="text-sm text-blue-700 hover:underline flex items-center gap-1">
              Lihat Semua
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {verifiers.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 flex items-center gap-3"
              >
                <UserCircle2
                  size={42}
                  className="text-gray-400"
                />

                <div>
                  <p className="font-medium text-sm">
                    {item.fullName}
                  </p>

                  <p className="text-xs text-gray-500">
                    @{item.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardAdmin;