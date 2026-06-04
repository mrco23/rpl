import { requestAPI } from "../../../services/httpClient.js";

export const getKepalaSekolahList = async () => {
  const response = await requestAPI({
    method: "GET",
    url: "/admin/kepala-sekolah",
  });
  return response;
};

export const createKepalaSekolah = async (data) => {
  const response = await requestAPI({
    method: "POST",
    url: "/admin/kepala-sekolah",
    data,
  });
  return response;
};

export const updateKepalaSekolah = async (id, data) => {
  const response = await requestAPI({
    method: "PUT",
    url: `/admin/kepala-sekolah/${id}`,
    data,
  });
  return response;
};

export const updateStatusKepalaSekolah = async (id, status_aktif) => {
  const response = await requestAPI({
    method: "PATCH",
    url: `/admin/kepala-sekolah/${id}/status`,
    data: { status_aktif },
  });
  return response;
};

export const deleteKepalaSekolah = async (id) => {
  const response = await requestAPI({
    method: "DELETE",
    url: `/admin/kepala-sekolah/${id}`,
  });
  return response;
};
