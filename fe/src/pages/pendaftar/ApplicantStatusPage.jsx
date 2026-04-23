import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  FileSearch, 
  CheckCircle2, 
  Users, 
  Trophy, 
  ClipboardCheck,
  AlertCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { getPendaftarMe } from '../../services/pendaftarService.js';

export default function ApplicantStatusPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPendaftarMe();
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  const status = data?.status_pendaftaran || 'menunggu verifikasi';
  const isLulus = status === 'lulus';
  const isTidakLulus = status === 'tidak lulus';

  const steps = [
    { title: 'Akun Dibuat', status: 'completed', icon: <UserPlus />, color: 'green' },
    { title: 'Menunggu Verifikasi', status: ['menunggu verifikasi', 'perlu perbaikan', 'unggah ulang', 'terverifikasi', 'wawancara orang tua', 'lulus', 'tidak lulus'].includes(status) ? 'completed' : 'pending', icon: <FileSearch />, color: 'blue' },
    { title: 'Terverifikasi', status: ['terverifikasi', 'wawancara orang tua', 'lulus', 'tidak lulus'].includes(status) ? 'completed' : 'pending', icon: <CheckCircle2 />, color: 'green' },
    { title: 'Wawancara Orang Tua', status: ['wawancara orang tua', 'lulus', 'tidak lulus'].includes(status) ? 'completed' : 'pending', icon: <Users />, color: 'indigo' },
    { 
      title: 'Pengumuman Hasil', 
      status: ['lulus', 'tidak lulus'].includes(status) ? 'completed' : 'pending', 
      icon: <Trophy />, 
      color: isLulus ? 'green' : (isTidakLulus ? 'red' : 'gray'),
      sublabel: isLulus ? 'LULUS' : (isTidakLulus ? 'TIDAK LULUS' : null)
    },
    { 
      title: 'Daftar Ulang', 
      status: status === 'lulus' ? 'pending' : (isTidakLulus ? 'hidden' : 'pending'), 
      icon: <ClipboardCheck />, 
      color: 'green' 
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Status Pendaftaran</h1>
          <p className="text-gray-600 mt-2">Pantau setiap tahapan proses agar Anda tahu perkembangan pendaftaran Anda.</p>
        </header>

        {status === 'perlu perbaikan' || status === 'unggah ulang' ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10 flex items-start gap-4">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-amber-800">Perhatian: Perlu Perbaikan</h4>
              <p className="text-amber-700 text-sm mt-1">{data?.catatan_dokumen || "Ada dokumen yang perlu diperbaiki / diunggah ulang. Cek halaman Unggah Dokumen."}</p>
            </div>
          </div>
        ) : null}

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-ml-px"></div>

          <div className="space-y-12 relative">
            {steps.filter(s => s.status !== 'hidden').map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = !isCompleted && step.status !== 'pending';
              
              let bgColor = 'bg-gray-100 text-gray-400';
              let iconColor = 'text-gray-400';
              let ringColor = 'ring-gray-100';

              if (isCompleted) {
                if (step.color === 'green') {
                    bgColor = 'bg-green-100 text-green-600';
                    iconColor = 'text-green-600';
                    ringColor = 'ring-green-50';
                } else if (step.color === 'red') {
                    bgColor = 'bg-red-100 text-red-600';
                    iconColor = 'text-red-600';
                    ringColor = 'ring-red-50';
                } else {
                    bgColor = 'bg-blue-100 text-blue-600';
                    iconColor = 'text-blue-600';
                    ringColor = 'ring-blue-50';
                }
              }

              return (
                <div key={idx} className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="hidden md:block md:w-5/12"></div>
                  
                  {/* Step Marker */}
                  <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ring-8 ${ringColor} ${bgColor} transition-all duration-500`}>
                    {React.cloneElement(step.icon, { size: 24 })}
                  </div>

                  <div className="ml-6 md:ml-0 md:w-5/12 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <h3 className={`font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isCompleted ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                            {isCompleted ? 'Selesai' : 'Tahap Berikutnya'}
                        </span>
                        {step.sublabel && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step.color === 'green' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                {step.sublabel}
                            </span>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {isLulus && (
            <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white shadow-xl text-center">
                <Trophy size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Selamat, Anda Lulus!</h2>
                <p className="text-blue-100 mb-6 font-medium">Segera lakukan proses daftar ulang sesuai jadwal yang ditentukan.</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all cursor-pointer">
                    Detail Daftar Ulang
                </button>
            </div>
        )}

        {isTidakLulus && (
            <div className="mt-16 bg-gray-100 rounded-2xl p-8 text-gray-600 text-center border border-gray-200">
                <XCircle size={48} className="mx-auto mb-4 text-red-400" />
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Mohon Maaf</h2>
                <p className="mb-2">Anda belum berhasil pada pendaftaran kali ini.</p>
                <p className="text-sm">Jangan menyerah, masih banyak kesempatan lain di depan mata.</p>
            </div>
        )}
      </div>
    </div>
  );
}

