import React from 'react';
import {
  LayoutDashboard, User, Users, Trophy, Newspaper,
  Building, Star, Settings, FileText, Megaphone,
  LogOut, ArrowRight, UserCircle2
} from 'lucide-react';

export default function AdminBeranda() {
  // Data dummy untuk tabel pendaftar
  const recentApplicants = [
    { id: 1, name: 'Reins Maindjanga', nisn: '008xxxxxxx', date: '24 Apr 2026', status: 'Menunggu' },
    { id: 2, name: 'Budi Santoso', nisn: '008xxxxxxx', date: '24 Mar 2026', status: 'Terverifikasi' },
    { id: 3, name: 'Citra Kasih', nisn: '008xxxxxxx', date: '24 Jan 2026', status: 'Perlu Revisi' },
  ];

  // Data dummy untuk tabel verifikator
  const verifiers = [
    { id: 1, name: 'Elegantia Makarawung', username: 'esyaaa' },
    { id: 2, name: 'Selomitha Nong', username: 'mithacia' },
    { id: 3, name: 'Marcois Makalew', username: 'mrcois' },
  ];

  // Fungsi pembantu untuk warna badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-700';
      case 'Terverifikasi':
        return 'bg-green-100 text-green-700';
      case 'Perlu Revisi':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex bg-slate-50 font-sans">

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Beranda Admin</h1>
            <p className="text-gray-500">Lorem Ipsum dolor lorem ipsum dolor gipsum</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col border-l-4 border-l-[#253b80]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Ekstrakurikuler</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
                  </div>
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Users size={24} />
                  </div>
                </div>
                <a href="#" className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline">
                  Lihat Selengkapnya <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Pendaftar Terbaru Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="p-6 text-center border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#253b80]">Pendaftar Terbaru</h2>
              </div>
              <div className="flex-1 p-6">
                <div className="w-full text-left">
                  <div className="grid grid-cols-12 gap-4 bg-[#e2e8f0] text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
                    <div className="col-span-6">Nama Siswa</div>
                    <div className="col-span-3">Tanggal Daftar</div>
                    <div className="col-span-3 text-center">Status</div>
                  </div>
                  <div className="flex flex-col">
                    {recentApplicants.map((app) => (
                      <div key={app.id} className="grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="col-span-6 flex items-center gap-3">
                          <UserCircle2 size={40} className="text-gray-300" />
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{app.name}</p>
                            <p className="text-xs text-gray-500">NISN : {app.nisn}</p>
                          </div>
                        </div>
                        <div className="col-span-3 text-sm text-gray-800 font-medium">
                          {app.date}
                        </div>
                        <div className="col-span-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 text-center">
                <a href="#" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline">
                  Lihat Semua Pendaftar <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Daftar Verifikator Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="p-6 text-center border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#253b80]">Daftar Verifikator</h2>
              </div>
              <div className="flex-1 p-6">
                <div className="w-full text-left">
                  <div className="bg-[#e2e8f0] text-gray-700 font-semibold text-sm p-3 rounded-t-lg">
                    Nama
                  </div>
                  <div className="flex flex-col">
                    {verifiers.map((verifier) => (
                      <div key={verifier.id} className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50">
                        <UserCircle2 size={40} className="text-gray-300" />
                        <div>
                          <p className="font-semibold text-sm text-gray-800">{verifier.name}</p>
                          <p className="text-xs text-gray-500">{verifier.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 text-center">
                <a href="#" className="text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:underline">
                  Lihat Semua Verifikator <ArrowRight size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-komponen untuk item navigasi Sidebar
function NavItem({ icon, text }) {
  return (
    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-white/90 hover:bg-white/10 hover:text-white rounded-md transition-colors">
      {icon}
      <span className="text-sm">{text}</span>
    </a>
  );
}