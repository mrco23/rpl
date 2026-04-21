import apiClient from "./apiClient";

/**
 * Service untuk Ekstrakurikuler
 * Endpoint: /api/ekstrakurikuler
 */
export const getEkstrakurikuler = async () => {
  try {
    const response = await apiClient.get("/ekstrakurikuler");
    
    // Sanitasi data: Pastikan array
    const data = Array.isArray(response.data?.data) ? response.data.data : [];
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data ekstrakurikuler",
      data: [],
    };
  }
};

const extracurricularService = {
  getEkstrakurikuler,
};

export default extracurricularService;
