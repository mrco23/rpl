import apiClient from "./apiClient";

/**
 * Service untuk Fasilitas
 * Endpoint: /api/fasilitas
 */
export const getFasilitas = async () => {
  try {
    const response = await apiClient.get("/fasilitas");
    
    // Sanitasi data: Pastikan array
    const data = Array.isArray(response.data?.data) ? response.data.data : [];
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data fasilitas",
      data: [],
    };
  }
};

const fasilitasService = {
  getFasilitas,
};

export default fasilitasService;
