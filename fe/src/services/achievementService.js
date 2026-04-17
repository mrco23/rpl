import apiClient from "./apiClient";

/**
 * Service untuk Prestasi (Public)
 * Endpoint: /api/prestasi/public
 */
export const getPublicAchievements = async () => {
  try {
    const response = await apiClient.get("/prestasi/public");
    
    // Sanitasi data: Pastikan array
    const data = Array.isArray(response.data?.data) ? response.data.data : [];
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data prestasi",
      data: [],
    };
  }
};

const achievementService = {
  getPublicAchievements,
};

export default achievementService;
