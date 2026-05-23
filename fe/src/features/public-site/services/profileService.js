import httpClient from "../../../services/httpClient.js";

/**
 * Service untuk Profil Sekolah (Public)
 * Endpoint: /api/profile/landing-page
 */
export const getLandingPageData = async () => {
  try {
    const response = await httpClient.get("/profile/landing-page");
    return {
      success: true,
      data: response.data || null,
      message: response.message,
    };
  } catch (error) {
    console.error("[profileService.getLandingPageData]", error);
    return {
      success: false,
      message: error.message || "Gagal mengambil data profil landing page",
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
    const response = await httpClient.get("/profile");
    return {
      success: true,
      data: response.data || null,
      message: response.message,
    };
  } catch (error) {
    console.error("[profileService.getPublicProfile]", error);
    return {
      success: false,
      message: error.message || "Gagal mengambil data profil publik",
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
    const response = await httpClient.get("/profile/visi-misi");
    return {
      success: true,
      data: response.data || null,
      message: response.message,
    };
  } catch (error) {
    console.error("[profileService.getVisiMisi]", error);
    return {
      success: false,
      message: error.message || "Gagal mengambil visi misi",
      data: null,
    };
  }
};

/**
 * Service untuk mendapatkan data Footer
 * Endpoint: GET /api/profile/footer
 */
export const getFooterData = async () => {
  try {
    const response = await httpClient.get("/profile/footer");
    return {
      success: true,
      data: response.data || null,
      message: response.message,
    };
  } catch (error) {
    console.error("[profileService.getFooterData]", error);
    return {
      success: false,
      message: error.message || "Gagal mengambil data footer",
      data: null,
    };
  }
};

/**
 * Service untuk mendapatkan Profil admin
 */
export const getAdminProfile = async () => {
  const response = await httpClient.get("/profile/admin");
  return response.data || null;
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

  const response = await httpClient.put("/profile", formData);
  return response.data || null;
};

const profileService = {
  getLandingPageData,
  getPublicProfile,
  getAdminProfile,
  updateProfile,
  getVisiMisi,
  getFooterData,
};

export default profileService;
