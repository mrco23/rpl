/**
 * Helper untuk mendapatkan URL gambar yang valid.
 * Menangani URL Cloudinary (dimulai dengan http/https) 
 * maupun nama file lokal (perlu prefix URL backend).
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Jika sudah berupa URL lengkap (misal dari Cloudinary), kembalikan langsung
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Jika hanya berupa nama file, berikan prefix URL backend
  // Ambil API URL dari environment, buang path /api di akhir jika ada
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  // Pastikan tidak ada double slash
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}/uploads/${imagePath}`;
};
