import axios from "axios";

/**
 * Axios instance khusus untuk request admin/verifikator.
 * Menggunakan VITE_API_URL dari .env (http://localhost:3000/api).
 * Otomatis menyisipkan header Authorization: Bearer <token>.
 */
const adminAxios = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "",
});

adminAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// Prevent 304 Cache issues
		config.headers["Cache-Control"] = "no-cache";
		config.headers["Pragma"] = "no-cache";
		config.headers["Expires"] = "0";
		return config;
	},
	(error) => Promise.reject(error),
);

adminAxios.interceptors.response.use(
	(response) => response.data, // Biasanya kita mau langsung ambil `.data`
	(error) => {
		console.error("Admin API Error:", error.response?.data || error.message);
		return Promise.reject(error.response?.data || error);
	},
);

export default adminAxios;
