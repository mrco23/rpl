import httpClient from "./httpClient.js";

/**
 * Service untuk Berita
 * Endpoint: /api/berita
 */
export const getAllNews = async (params = {}) => {
  try {
    const response = await httpClient.get("/berita", { params });
    
    // Sanitasi: Pastikan data list berita adalah array
    // Tergantung struktur backend, biasanya di dalam data.data atau data
    const data = Array.isArray(response.data?.data) ? response.data.data : [];
    
    return {
      success: true,
      data: data,
      pagination: response.data?.pagination || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data berita",
      data: [],
    };
  }
};

/**
 * Get Detail Berita
 * Endpoint: /api/berita/:id
 */
export const getNewsDetail = async (id) => {
  try {
    const response = await httpClient.get(`/berita/${id}`);
    
    return {
      success: true,
      data: response.data?.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil detail berita",
      data: null,
    };
  }
};

const newsService = {
  getAllNews,
  getNewsDetail,
};

export default newsService;
