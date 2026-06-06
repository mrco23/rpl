import React, { useEffect, useState, useMemo } from "react";
import newsService from "../services/newsService";
import NewsCard from "../components/NewsCard";
import NewsCardSkeleton from "../components/NewsCardSkeleton";
import SearchSortBar from "../components/SearchSortBar";
import Pagination from "../components/Pagination";

export default function BeritaPage() {
  const [news, setNews] = useState([]);
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
        const res = await newsService.getAllNews();
        setNews(res.data || []);
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

  const filteredNews = useMemo(() => {
    let filtered = news.filter((item) => {
      const title = item.judul_berita || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.tanggal_dibuat) - new Date(a.tanggal_dibuat));
    } else {
      filtered.sort((a, b) => new Date(a.tanggal_dibuat) - new Date(b.tanggal_dibuat));
    }

    return filtered;
  }, [news, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showingStart = filteredNews.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredNews.length);

  return (
    <>
      {/* HEADER BIRU */}
      <section className="w-full bg-blue-dark text-white rounded-b-3xl py-12 mb-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-semibold mb-3">Berita Sekolah</h1>
          <p className="text-blue-light text-lg">Kabar terkini dan kegiatan SMP Katolik St. Rafael Manado</p>
        </div>
      </section>

      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <SearchSortBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            searchPlaceholder="Cari judul berita..."
          />

          {!loading && !error && (
            <div className="flex justify-between items-center mb-6 text-sm">
              <p className="text-gray-600">
                Menampilkan <span className="font-semibold text-blue-dark">{showingStart}-{showingEnd}</span> dari <span className="font-semibold">{filteredNews.length}</span> berita
              </p>
            </div>
          )}

          {/* State Renderings */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
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
          ) : filteredNews.length === 0 ? (
            <div className="py-10 text-center text-xl text-gray-600">
              Berita tidak ditemukan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* GRID */}
              {paginatedNews.map((item, index) => (
                <div key={item.id_berita || index} className="w-[90%] mx-auto">
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredNews.length > 0 && (
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
