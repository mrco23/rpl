import apiClient from "./apiClient";

/**
 * Service untuk Program Unggulan (Public)
 * Endpoint: /api/program-unggulan/public
 */
export const getPublicPrograms = async () => {
  try {
    const response = await apiClient.get("/program-unggulan/public");
    
    // Sanitasi: Pastikan mengembalikan array meskipun API gagal atau data kosong
    const data = Array.isArray(response.data?.data) ? response.data.data : [];
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data program unggulan",
      data: [],
    };
  }
};

const programService = {
  getPublicPrograms,
};

export default programService;
