/**
 * Helper utilities for handling document URLs and downloads, 
 * especially focusing on compatibility between Cloudinary URLs and local fallback paths.
 */

export const resolveDocumentUrl = (url) => {
  if (!url) return null;
  // If it's already a full HTTP/HTTPS URL (like Cloudinary), return as is
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  // Fallback for older local paths
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}${url}`;
};

export const extractFileNameFromUrl = (url) => {
  if (!url) return "Belum ada file";
  const parts = url.split('/');
  return parts.pop() || "dokumen";
};

export const downloadDocumentFile = async (url, customFileName) => {
  if (!url) return;
  try {
    const resolvedUrl = resolveDocumentUrl(url);
    const response = await fetch(resolvedUrl);
    
    if (!response.ok) {
      throw new Error(`Gagal mengunduh file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = objectUrl;
    link.setAttribute('download', customFileName || extractFileNameFromUrl(url));
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error downloading document:", error);
    // Fallback: Just open the file in a new tab if download fails
    alert("Gagal mengunduh file langsung. File akan dibuka di tab baru.");
    window.open(resolveDocumentUrl(url), '_blank');
  }
};
