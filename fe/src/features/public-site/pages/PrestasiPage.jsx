import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../shared/utils/imageHelper";
import CardSkeleton from "../../../shared/components/CardSkeleton";
import achievementService from "../services/achievementService";
import SearchSortBar from "../components/SearchSortBar";
import Pagination from "../components/Pagination";

export default function PrestasiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await achievementService.getPublicAchievements();
        setData(res.data || []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOrder]);

  const filteredData = useMemo(() => {
    let filtered = data.filter((item) => {
      const title = item.judul_prestasi || item.nama_prestasi || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (sortOrder === "newest") {
      filtered.sort((a, b) => {
        const dateA = a.tanggal_dibuat ? new Date(a.tanggal_dibuat) : new Date(0);
        const dateB = b.tanggal_dibuat ? new Date(b.tanggal_dibuat) : new Date(0);
        if (dateA.getTime() === dateB.getTime()) return (b.id_prestasi || 0) - (a.id_prestasi || 0);
        return dateB - dateA;
      });
    } else {
      filtered.sort((a, b) => {
        const dateA = a.tanggal_dibuat ? new Date(a.tanggal_dibuat) : new Date(0);
        const dateB = b.tanggal_dibuat ? new Date(b.tanggal_dibuat) : new Date(0);
        if (dateA.getTime() === dateB.getTime()) return (a.id_prestasi || 0) - (b.id_prestasi || 0);
        return dateA - dateB;
      });
    }

    return filtered;
  }, [data, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showingStart = filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <>
      <section className="w-full bg-blue-dark text-white rounded-b-3xl py-8 px-6 md:px-20 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Prestasi Siswa</h2>
      </section>

      <div className="px-20 py-2 text-md text-gray-600 hidden sm:flex gap-6 -mt-5 mb-8">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className="text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>
        <Link
          to="/ekstrakurikuler"
          className="text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Ekstrakurikuler
        </Link>
        <span className="text-blue-600 font-medium">Prestasi Siswa</span>
      </div>

      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">


          <SearchSortBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            searchPlaceholder="Cari judul prestasi..."
          />

          {!loading && !error && (
            <div className="flex justify-between items-center mb-6 text-sm">
              <p className="text-gray-600">
                Menampilkan <span className="font-semibold text-blue-dark">{showingStart}-{showingEnd}</span> dari <span className="font-semibold">{filteredData.length}</span> prestasi
              </p>
            </div>
          )}

          {/* State Renderings */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : error ? (
            <div className="py-10 text-center flex flex-col items-center">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-dark px-4 py-2 text-white rounded-md hover:bg-blue-dark-hover transition"
              >
                Coba Lagi
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-10 text-center text-xl text-gray-600">
              Prestasi tidak ditemukan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card Grid */}
              {paginatedData.map((item, index) => {
                const displayTitle = item.judul_prestasi || item.nama_prestasi || "Tanpa Judul";
                const displayDesc = item.deskripsi || "Tidak ada deskripsi";
                const displayImage = item.gambar_prestasi || item.gambar || null;
                const displayKategori = item.peraih_prestasi || "Peraih Prestasi";

                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group w-full"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={getImageUrl(displayImage)}
                        alt={displayTitle}
                        className="w-full h-52 object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">
                        Peraih: {displayKategori}
                      </p>
                      <h3 className="text-blue-900 font-bold text-lg mb-4 line-clamp-2 group-hover:text-blue-normal transition-colors">
                        {displayTitle}
                      </h3>

                      <p className="text-sm text-gray-600 font-medium leading-relaxed line-clamp-3">
                        {displayDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredData.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

        </div>
      </section>
    </>
  );
}
