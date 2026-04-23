import { requestAPI } from "./api.js";

export const getMyDocuments = () => {
	return requestAPI({
		method: "GET",
		url: "/dokumen/me",
	});
};

export const getPendaftarDocuments = (idPendaftar) => {
	return requestAPI({
		method: "GET",
		url: `/dokumen/pendaftar/${idPendaftar}`,
	});
};

export const uploadDocument = (namaDokumen, file) => {
	const formData = new FormData();
	formData.append("nama_dokumen", namaDokumen);
	formData.append("file", file);

	return requestAPI({
		method: "POST",
		url: "/dokumen/upload",
		data: formData,
		isMultipart: true,
	});
};
