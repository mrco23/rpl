import { useState, useEffect } from 'react';
import { getPublicProfile } from '../../services/profileService';
import CardSkeleton from '../../components/features/CardSkeleton';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getPublicProfile();
        if (res.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container p-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="container p-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-blue-900">{profile?.nama_sekolah}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <img
            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${profile?.foto_kepala_sekolah}`}
            alt="Kepala Sekolah"
            className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold">{profile?.nama_kepala_sekolah}</h2>
          <p className="text-gray-600">Kepala Sekolah</p>
        </section>
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Visi</h3>
            <p className="text-gray-700 leading-relaxed">{profile?.visi}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Misi</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile?.misi}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
