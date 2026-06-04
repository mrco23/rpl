import http from "http";

const data = JSON.stringify({
    nama_lengkap: "Test Register",
    nisn: "1234567890",
    tempat_lahir: "Jakarta",
    tanggal_lahir: "2012-05-01",
    jenis_kelamin: "L",
    no_hp: "081234567890",
    asal_sekolah: "SD Negeri 1 Jakarta",
    email: "test@example.com",
    nama_wali: "Budi Santoso",
    kata_sandi: "Password@123",
    alamat: {
        provinsi: "DKI Jakarta",
        kota_kabupaten: "Jakarta Selatan",
        kecamatan: "Kebayoran Baru",
        kelurahan: "Senayan",
        rt_rw: "001/001",
        kode_pos: "12190"
    }
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/pendaftar/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response Body: ${responseBody}`);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
