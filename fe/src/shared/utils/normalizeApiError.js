/**
 * Standarisasi error object dari Axios ke format yang konsisten.
 * @param {Error} error - Error object dari Axios (error.response)
 * @returns {Object} - { message, status, errors }
 */
export const normalizeApiError = (error) => {
  // Jika response tidak ada, berarti masalah jaringan atau timeout
  if (!error.response) {
    return {
      message: error.message || "Gagal terhubung ke server",
      status: 0,
      errors: null,
    };
  }

  const { status, data } = error.response;
  
  return {
    message: data?.message || "Terjadi kesalahan pada server",
    status: status || 500,
    errors: data?.errors || null,
    error: data?.error || null,
  };
};
