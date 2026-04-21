import axios from "axios";

/**
 * Shared Axios Instance
 * Base URL menggunakan environment variable Vite
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "", // Perbaikan nama env
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to prevent 304 Cache issues
apiClient.interceptors.request.use(
  (config) => {
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani response dan error secara global
apiClient.interceptors.response.use(
  (response) => {
    // Pastikan mengembalikan data langsung bila sukses
    return response;
  },
  (error) => {
    // Log error untuk kebutuhan debugging
    console.error("API Call Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Kembalikan error agar bisa di-handle di level service/page
    return Promise.reject(error);
  }
);

export default apiClient;
