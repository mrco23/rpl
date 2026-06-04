import httpClient from "./httpClient.js";

/**
 * Base service class untuk menangani operasi CRUD standar
 * yang menggunakan HTTP Client yang telah distandardisasi.
 */
class ResourceService {
  /**
   * @param {string} endpoint - Base endpoint (contoh: '/berita')
   */
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * Mendapatkan daftar data (List)
   * @param {Object} params - Query parameters
   * @returns {Promise<{data, message, meta}>}
   */
  list(params = {}) {
    return httpClient.get(this.endpoint, { params });
  }

  /**
   * Mendapatkan detail data (Read)
   * @param {string|number} id - ID data
   * @returns {Promise<{data, message, meta}>}
   */
  detail(id) {
    return httpClient.get(`${this.endpoint}/${id}`);
  }

  /**
   * Membuat data baru (Create)
   * @param {Object|FormData} payload - Data baru
   * @returns {Promise<{data, message, meta}>}
   */
  create(payload) {
    return httpClient.post(this.endpoint, payload);
  }

  /**
   * Mengubah data (Update)
   * @param {string|number} id - ID data
   * @param {Object|FormData} payload - Data perubahan
   * @returns {Promise<{data, message, meta}>}
   */
  update(id, payload) {
    return httpClient.put(`${this.endpoint}/${id}`, payload);
  }

  /**
   * Menghapus data (Delete)
   * @param {string|number} id - ID data
   * @returns {Promise<{data, message, meta}>}
   */
  remove(id) {
    return httpClient.delete(`${this.endpoint}/${id}`);
  }
}

export default ResourceService;
