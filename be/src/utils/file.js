export const buildFileUrl = (req, fileName) => {
  if (!fileName) return null;
  if (/^https?:\/\//i.test(fileName)) return fileName;
  return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
};
