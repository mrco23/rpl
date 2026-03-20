import axios from "axios";
import { getToken } from "../utils/token.js";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* 
  Flexible Reusable API Function
  Mendukung format Multipart Form Data maupun JSON biasa
*/
export const requestAPI = async ({
  method,
  url,
  data = null,
  params = null,
  isMultipart = false,
}) => {
  try {
    const headers = {};
    if (isMultipart) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response = await api({
      method,
      url,
      data,
      params,
      headers,
    });

    return response.data; // Mengembalikan payload 'data' dari response otomatis
  } catch (error) {
    console.error(`API Error [${method.toUpperCase()} ${url}]:`, error);
    // Mengembalikan error handling yang rapi agar UI mudah membacanya
    throw error.response?.data || { message: error.message };
  }
};

export default api;
