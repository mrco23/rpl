import apiClient from "./apiClient";

/**
 * Service untuk Profil Sekolah (Public)
 * Endpoint: /api/profile/landing-page
 */
export const getLandingPageData = async () => {
  try {
    const response = await apiClient.get("/profile/landing-page");
    
    // Sanitasi data
    const data = response.data?.data || null;
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data profil landing page",
      data: null,
    };
  }
};

/**
 * Service untuk mendapatkan Profil global sekolah
 * Endpoint: /api/profile
 */
export const getPublicProfile = async () => {
  try {
    const response = await apiClient.get("/profile");
    return {
      success: true,
      data: response.data?.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data profil publik",
      data: null,
    };
  }
};

/**
 * Service untuk mendapatkan hanya Visi dan Misi
 * Endpoint: GET /api/profile/visi-misi
 */
export const getVisiMisi = async () => {
  try {
    const response = await apiClient.get("/profile/visi-misi");
    return {
      success: true,
      data: response.data?.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil visi misi",
      data: null,
    };
  }
};

/**
 * Service untuk mendapatkan Profil admin
 */
export const getAdminProfile = async () => {
  const response = await apiClient.get("/profile/admin");
  return response.data?.data || response.data;
};

/**
 * Service untuk update Profil (admin)
 */
export const updateProfile = async (payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (payload[key] !== null && payload[key] !== undefined) {
      formData.append(key, payload[key]);
    }
  });

  const response = await apiClient.put("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data?.data || response.data;
};

const profileService = {
  getLandingPageData,
  getPublicProfile,
  getAdminProfile,
  updateProfile,
  getVisiMisi,
};

export default profileService;
