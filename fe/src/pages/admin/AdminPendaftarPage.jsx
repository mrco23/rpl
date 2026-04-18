import React, { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import AdminHeader from '@components/features/AdminHeader';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import { getAllPendaftar } from '../../services/adminPendaftarService.js';

export default function AdminPendaftarPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllPendaftar();
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data pendaftar");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredData = data.filter(item => 
    item.nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nisn?.includes(searchQuery)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'menunggu_verifikasi':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Menunggu Verifikasi</span>;
      case 'lulus':
      case 'lolos':
      case 'terverifikasi':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Telah Terverifikasi</span>;
      case 'ditolak':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Ditolak</span>;
      default:
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase">{status?.replace('_', ' ')}</span>;
    }
  };

  return (
    <>
      <AdminHeader
        text="Data Pendaftar"
        subText="Pantau dan lihat informasi pendaftar siswa baru di sini."
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari Nama atau NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#253b80] bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-[#e2e8f0] border-b border-gray-200 text-sm font-bold text-gray-800">
                <th className="p-4">Nama Pendaftar</th>
                <th className="p-4">NISN</th>
                <th className="p-4">Asal Sekolah</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="p-4"><Skeleton className="h-4 w-3/4" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                    <td className="p-4 flex justify-center"><Skeleton className="h-8 w-8 rounded" /></td>
                  </tr>
                ))
              ) : filteredData.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-8 text-center text-gray-500">Tidak ada pendaftar ditemukan</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id_pendaftar} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-800 font-semibold">{item.nama_lengkap}</td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{item.nisn || '-'}</td>
                    <td className="p-4 text-sm text-gray-600">{item.asal_sekolah}</td>
                    <td className="p-4">{getStatusBadge(item.status_pendaftaran)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          title="Lihat Detail Pendaftar"
                          className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Detail Pendaftar"
      >
        {selectedItem && (
          <div className="space-y-4 text-gray-800 max-h-[80vh] overflow-y-auto pr-2">
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500">Nama Lengkap</p>
                  <p className="font-semibold">{selectedItem.nama_lengkap}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">NISN</p>
                  <p className="font-semibold">{selectedItem.nisn || '-'}</p>
               </div>
             </div>
             <div>
               <p className="text-xs text-gray-500">Alamat</p>
               <p className="font-medium whitespace-pre-wrap">{selectedItem.alamat}</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500">Tempat Lahir</p>
                  <p className="font-medium">{selectedItem.tempat_lahir || '-'}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Tanggal Lahir</p>
                  <p className="font-medium">
                    {selectedItem.tanggal_lahir ? new Date(selectedItem.tanggal_lahir).toLocaleDateString('id-ID') : '-'}
                  </p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-medium">{selectedItem.jenis_kelamin}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">No. HP</p>
                  <p className="font-medium">{selectedItem.no_hp}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Asal Sekolah</p>
                  <p className="font-medium">{selectedItem.asal_sekolah}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{selectedItem.email || '-'}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Nama Wali</p>
                  <p className="font-medium">{selectedItem.nama_wali || '-'}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Tanggal Daftar</p>
                  <p className="font-medium">
                    {selectedItem.tanggal_daftar ? new Date(selectedItem.tanggal_daftar).toLocaleDateString('id-ID') : '-'}
                  </p>
               </div>
             </div>
             <div className="pt-2 border-t mt-4">
               <p className="text-xs text-gray-500 mb-1">Status Pendaftaran</p>
               <div>{getStatusBadge(selectedItem.status_pendaftaran)}</div>
             </div>
             
             {selectedItem.catatan_dokumen && selectedItem.status_pendaftaran !== 'menunggu_verifikasi' && (
               <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mt-2">
                 <p className="text-xs font-semibold text-yellow-800">Catatan Rejeksi Dokumen:</p>
                 <p className="text-sm text-yellow-900">{selectedItem.catatan_dokumen}</p>
               </div>
             )}

             <div className="pt-4 flex justify-end gap-3 mt-4">
               <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-medium transition-colors">Tutup Jendela</button>
             </div>
          </div>
        )}
      </Modal>
    </>
  );
}