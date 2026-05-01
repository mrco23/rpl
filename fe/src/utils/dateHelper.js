/**
 * Utility for formatting dates to Indonesian locale
 */

/**
 * Formats a date string to a long Indonesian format
 * Example: "2026-01-02" -> "Jumat, 2 Januari 2026"
 * @param {string|Date} dateString 
 * @param {boolean} includeDay 
 * @returns {string}
 */
export const formatIndonesianDate = (dateString, includeDay = true) => {
  if (!dateString) return "-";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    if (includeDay) {
      options.weekday = 'long';
    }

    return new Intl.DateTimeFormat('id-ID', options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

/**
 * Formats a date string to a short Indonesian format
 * Example: "2026-01-02" -> "02/01/2026"
 * @param {string|Date} dateString 
 * @returns {string}
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return "-";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

/**
 * Formats a date string to "Day Month Year" (without day name)
 * Example: "2026-01-02" -> "2 Januari 2026"
 */
export const formatMediumDate = (dateString) => {
  return formatIndonesianDate(dateString, false);
};
