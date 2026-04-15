const data = {
	key: "value",
	key2: "value2",
};
const newData = Object.entries(data);
console.log(newData);

const res = {
	message: "success",
	data: {
		total_data: {
			program_unggulan: 0,
			fasilitas: 0,
			ekstrakurikuler: 0,
			prestasi: 0,
		},
		fasilitas: [
			{
				gambar: "",
				nama_fasilitas: "Laboratorium Komputer",
			},
			{
				gambar: "",
				nama_fasilitas: "example ",
			},
		],
		prestasi: [
			{
				gambar: "",
				nama_prestasi: "Juara 1 Lomba Robotik Tingkat Nasional",
				deskripsi:
					"Tim robotik SMA XYZ berhasil meraih juara 1 dalam kompetisi robotik tingkat nasional yang diselenggarakan di Jakarta pada tanggal 10-12 Desember 2023. Kompetisi ini diikuti oleh 150 tim dari seluruh Indonesia.",
			},
			{
				gambar: "",
				nama_prestasi: "Juara 1 Lomba Robotik Tingkat Nasional",
				deskripsi:
					"Tim robotik SMA XYZ berhasil meraih juara 1 dalam kompetisi robotik tingkat nasional yang diselenggarakan di Jakarta pada tanggal 10-12 Desember 2023. Kompetisi ini diikuti oleh 150 tim dari seluruh Indonesia.",
			},
		],
		berita: [
			{
				gambar: "",
				judul: "example",
				deskripsi: "example",
				tanggal: "example",
			},
			{
				gambar: "",
				judul: "example",
				deskripsi: "example",
				tanggal: "example",
			},
		],
		kepala_sekolah: {
			gambar: "",
			nama: "example",
			kata_sambutan: "example",
		},
	},
};
