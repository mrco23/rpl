import axios from "axios";
import { getToken } from "../shared/utils/token.js";
import { normalizeApiError } from "../shared/utils/normalizeApiError.js";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 15000,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getToken() || localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (import.meta.env.DEV) {
      console.info(
        "[API Request]",
        config.method?.toUpperCase(),
        (config.baseURL || "") + (config.url || ""),
        "| Params:",
        config.params,
        "| Token:",
        token ? "Exists" : "None"
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.info(
        "[API Response Success]",
        response.config?.method?.toUpperCase(),
        (response.config?.baseURL || "") + (response.config?.url || ""),
        "| Status:",
        response.status
      );
    }

    const resData = response.data;

    return {
      data: resData?.data !== undefined ? resData.data : resData,
      message: resData?.message || "Operasi berhasil",
      meta: resData?.pagination || resData?.meta || null,
    };
  },
  (error) => {
    const normalizedError = normalizeApiError(error);

    const method = error.config?.method?.toUpperCase() || "UNKNOWN";

    const url =
      (error.config?.baseURL || "") +
      (error.config?.url || "");

    const status =
      error.response?.status || "NETWORK_ERROR";

    console.error(
      `[API Error] ${method} ${url} ${status} ${normalizedError.message}`
    );

    return Promise.reject(normalizedError);
  }
);

// Backward compatibility helper
export const requestAPI = async ({
  method,
  url,
  data = null,
  params = null,
  isMultipart = false,
  responseType = "json",
}) => {
  return httpClient({
    method,
    url,
    data,
    params,
    responseType,
  });
};

export default httpClient;