export const validatePendaftarRegisterPayload = (payload) => {
	const errors = {};
	const d = {};
	let isValid = true;

	// Helper for trimming strings safely
	const trimStr = (val) => (typeof val === "string" ? val.trim() : val);

	// Basic payload mapping & trim
	const fields = [
		"nama_lengkap",
		"nisn",
		"tempat_lahir",
		"tanggal_lahir",
		"jenis_kelamin",
		"no_hp",
		"asal_sekolah",
		"email",
		"nama_wali",
		"kata_sandi",
	];
	fields.forEach((f) => {
		d[f] = trimStr(payload[f]);
	});

	if (payload.alamat) {
		d.alamat = {
			provinsi: trimStr(payload.alamat.provinsi),
			kota_kabupaten: trimStr(payload.alamat.kota_kabupaten),
			kecamatan: trimStr(payload.alamat.kecamatan),
			kelurahan: trimStr(payload.alamat.kelurahan),
			rt_rw: trimStr(payload.alamat.rt_rw),
			kode_pos: trimStr(payload.alamat.kode_pos),
		};
	} else {
		d.alamat = {};
	}

	const nameRegex = /^[a-zA-Z\s.'-]+$/;
	const repeatRegex = /^(.)\1{4,}$/; // 5 or more repeating chars like AAAAA

	// A. nama_lengkap
	if (!d.nama_lengkap || d.nama_lengkap.length < 3 || d.nama_lengkap.length > 100 || !nameRegex.test(d.nama_lengkap) || repeatRegex.test(d.nama_lengkap.replace(/\s/g, ""))) {
		isValid = false;
		errors.nama_lengkap = "Nama lengkap harus diisi dengan nama yang valid.";
	}

	// B. nisn
	if (!d.nisn || !/^\d{10}$/.test(d.nisn)) {
		isValid = false;
		errors.nisn = "NISN SD harus berisi 10 digit angka.";
	}

	// C. email
	if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
		isValid = false;
		errors.email = "Format email tidak valid.";
	} else {
		d.email = d.email.toLowerCase();
	}

	// D. no_hp
	if (!d.no_hp || !/^(08|62)\d{8,13}$/.test(d.no_hp)) {
		isValid = false;
		errors.no_hp = "Nomor HP harus berisi 10 sampai 15 digit angka.";
	}

	// E. tempat_lahir
	if (!d.tempat_lahir || d.tempat_lahir.length < 3 || !nameRegex.test(d.tempat_lahir)) {
		isValid = false;
		errors.tempat_lahir = "Tempat lahir tidak valid.";
	}

	// F. tanggal_lahir
	if (!d.tanggal_lahir) {
		isValid = false;
		errors.tanggal_lahir = "Tanggal lahir wajib diisi.";
	} else {
		const birthDate = new Date(d.tanggal_lahir);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (isNaN(birthDate.getTime()) || birthDate >= today || age < 10 || age > 16) {
			isValid = false;
			errors.tanggal_lahir = "Tanggal lahir tidak sesuai untuk pendaftaran SMP.";
		}
	}

	// G. jenis_kelamin
	if (d.jenis_kelamin !== "L" && d.jenis_kelamin !== "P") {
		isValid = false;
		errors.jenis_kelamin = "Jenis kelamin harus dipilih (L/P).";
	}

	// H. asal_sekolah
	if (!d.asal_sekolah || /(SMA|SMK|MA\b|MAN\b|Paket C)/i.test(d.asal_sekolah) || !/(SD|MI|Sekolah Dasar)/i.test(d.asal_sekolah)) {
		isValid = false;
		errors.asal_sekolah = "Asal sekolah harus berasal dari SD atau MI.";
	}

	// I. nama_wali
	if (!d.nama_wali || d.nama_wali.length < 3 || d.nama_wali.length > 100 || !nameRegex.test(d.nama_wali) || repeatRegex.test(d.nama_wali.replace(/\s/g, ""))) {
		isValid = false;
		errors.nama_wali = "Nama Wali harus diisi dengan nama yang valid.";
	}

	// J. alamat
	const alamatFields = {
		provinsi: "Provinsi",
		kota_kabupaten: "Kota/Kabupaten",
		kecamatan: "Kecamatan",
		kelurahan: "Kelurahan",
	};
	Object.keys(alamatFields).forEach((f) => {
		const val = d.alamat[f];
		if (!val || val.length < 3 || !nameRegex.test(val) || repeatRegex.test(val.replace(/\s/g, ""))) {
			isValid = false;
			errors[`alamat.${f}`] = `${alamatFields[f]} tidak valid.`;
		}
	});

	if (!d.alamat.rt_rw || !/^\d{3}\/\d{3}$/.test(d.alamat.rt_rw)) {
		isValid = false;
		errors["alamat.rt_rw"] = "RT/RW harus menggunakan format 001/001.";
	}

	if (!d.alamat.kode_pos || !/^\d{5}$/.test(d.alamat.kode_pos)) {
		isValid = false;
		errors["alamat.kode_pos"] = "Kode pos harus berisi 5 digit angka.";
	}

	// K. kata_sandi
	if (!d.kata_sandi || !/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(d.kata_sandi)) {
		isValid = false;
		errors.kata_sandi = "Kata sandi minimal 8 karakter dan harus mengandung huruf serta angka.";
	}

	return {
		isValid,
		errors,
		sanitizedData: d,
	};
};
