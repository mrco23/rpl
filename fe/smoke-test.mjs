import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // backend base url
});

async function runTests() {
  const results = [];

  const addResult = (testName, endpoint, status, result, note = '-') => {
    results.push({
      Test: testName,
      Endpoint: endpoint,
      Status: status,
      Hasil: result,
      Catatan: note
    });
  };

  try {
    // 1. Admin Login
    let adminToken = null;
    try {
      const loginRes = await api.post('/admin/login', { username: 'admin', password: 'Admin123!' });
      adminToken = loginRes.data.data.token;
      addResult('Login Admin', '/admin/login', loginRes.status, 'Berhasil', 'Admin berhasil login');
    } catch (e) {
      addResult('Login Admin', '/admin/login', e.response?.status || 'Error', 'Gagal', e.message);
    }

    if (adminToken) {
      try {
        const berandaRes = await api.get('/admin/beranda', { headers: { Authorization: `Bearer ${adminToken}` } });
        addResult('Admin Beranda', '/admin/beranda', berandaRes.status, 'Berhasil', 'Status 200 OK');
      } catch (e) {
        addResult('Admin Beranda', '/admin/beranda', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 403');
      }

      try {
        const profileRes = await api.get('/profile/admin', { headers: { Authorization: `Bearer ${adminToken}` } });
        addResult('Admin Profile', '/profile/admin', profileRes.status, 'Berhasil', 'Status 200 OK');
      } catch (e) {
        addResult('Admin Profile', '/profile/admin', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 403');
      }
    }

    // 2. Verifikator Login
    let verifikatorToken = null;
    try {
      const loginRes = await api.post('/verifikator/login', { username: 'selomitha', password: 'Mitha123!' }); 
      verifikatorToken = loginRes.data.data.token;
      addResult('Login Verifikator', '/verifikator/login', loginRes.status, 'Berhasil', 'Verifikator berhasil login');
    } catch (e) {
      addResult('Login Verifikator', '/verifikator/login', e.response?.status || 'Error', 'Gagal', e.message);
    }

    if (verifikatorToken) {
      try {
        const berandaRes = await api.get('/verifikator/beranda', { headers: { Authorization: `Bearer ${verifikatorToken}` } });
        addResult('Verifikator Beranda', '/verifikator/beranda', berandaRes.status, 'Berhasil', 'Status 200 OK');
      } catch (e) {
        addResult('Verifikator Beranda', '/verifikator/beranda', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 403');
      }

      try {
        const pendaftarRes = await api.get('/verifikator/pendaftar', { headers: { Authorization: `Bearer ${verifikatorToken}` } });
        addResult('Verifikator Pendaftar', '/verifikator/pendaftar', pendaftarRes.status, 'Berhasil', 'Status 200 OK');
      } catch (e) {
        addResult('Verifikator Pendaftar', '/verifikator/pendaftar', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 403');
      }

      try {
        const pendaftarAssignedRes = await api.get('/verifikator/pendaftar/assigned', { headers: { Authorization: `Bearer ${verifikatorToken}` } });
        addResult('Verifikator Assigned', '/verifikator/pendaftar/assigned', pendaftarAssignedRes.status, 'Berhasil', 'Status 200 OK');
      } catch (e) {
        addResult('Verifikator Assigned', '/verifikator/pendaftar/assigned', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 403');
      }
    }

    // 3. Ekstrakurikuler Endpoint Validation (Public/Admin logic shouldn't hit /ekskul)
    try {
      const wrongEkskulRes = await api.get('/ekskul', { headers: { Authorization: `Bearer ${adminToken}` } });
      addResult('Salah Ekstrakurikuler', '/ekskul', wrongEkskulRes.status, 'Gagal', 'Harusnya 404');
    } catch (e) {
      addResult('Salah Ekstrakurikuler', '/ekskul', e.response?.status || 'Error', 'Berhasil', 'Benar dapat 404');
    }

    try {
      const correctEkskulRes = await api.get('/ekstrakurikuler', { headers: { Authorization: `Bearer ${adminToken}` } });
      addResult('Benar Ekstrakurikuler', '/ekstrakurikuler', correctEkskulRes.status, 'Berhasil', 'Status 200 OK');
    } catch (e) {
      addResult('Benar Ekstrakurikuler', '/ekstrakurikuler', e.response?.status || 'Error', 'Gagal', 'Seharusnya tidak 404');
    }

    console.table(results);

  } catch (error) {
    console.error("Test execution failed:", error);
  }
}

runTests();
