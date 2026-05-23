const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('g:/Code/rpl/fe/src');

const mapping = [
  { file: 'features/admin/services/adminNewsService.js', endpoint: '/berita', exports: ['getAllBerita', 'getBeritaById', 'createBerita', 'updateBeritaData', 'updateBeritaImage', 'deleteBerita'] },
  { file: 'features/admin/services/adminFasilitasService.js', endpoint: '/fasilitas', exports: ['getAllFasilitas', 'createFasilitas', 'updateFasilitasData', 'updateFasilitasImage', 'deleteFasilitas'] },
  { file: 'features/admin/services/adminAchievementService.js', endpoint: '/prestasi', exports: ['getAllAchievement', 'getAchievementById', 'createAchievement', 'updateAchievementData', 'updateAchievementImage', 'deleteAchievement'] },
  { file: 'features/admin/services/adminEkskulService.js', endpoint: '/ekskul', exports: ['getAllEkskul', 'getEkskulById', 'createEkskul', 'updateEkskulData', 'updateEkskulImage', 'deleteEkskul'] },
  { file: 'features/admin/services/adminProgramService.js', endpoint: '/program-unggulan', exports: ['getAllProgram', 'getProgramById', 'createProgram', 'updateProgramData', 'updateProgramImage', 'deleteProgram'] },
  { file: 'features/admin/services/adminGelombangService.js', endpoint: '/gelombang', exports: ['getAllGelombang', 'getGelombangById', 'createGelombang', 'updateGelombang', 'deleteGelombang', 'getGelombangAktif'] },
  { file: 'features/admin/services/adminPengumumanService.js', endpoint: '/pengumuman', exports: ['getAllPengumuman', 'getPengumumanById', 'createPengumuman', 'updatePengumumanData', 'updatePengumumanDokumen', 'deletePengumuman'] },
  { file: 'features/admin/services/adminPendaftarService.js', endpoint: '/pendaftar', exports: ['getAllPendaftar', 'getPendaftarById', 'updatePendaftarStatus', 'exportPendaftar', 'deletePendaftar'] }
];

for (let s of mapping) {
  const fullPath = path.join(srcDir, s.file);
  
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  let newContent = `import ResourceService from "../../../services/resourceService.js";\nimport httpClient from "../../../services/httpClient.js";\n\nconst service = new ResourceService("${s.endpoint}");\n\n`;

  for (const exp of s.exports) {
    if (exp.includes('Image') || exp.includes('Dokumen')) {
      newContent += `export const ${exp} = (id, payload) => httpClient.patch(\`${s.endpoint}/\${id}/${exp.includes('Image') ? 'image' : 'dokumen'}\`, payload);\n`;
    } else if (exp.startsWith('getAll')) {
      newContent += `export const ${exp} = (params) => service.list(params);\n`;
    } else if (exp.startsWith('get') && exp.endsWith('ById')) {
      newContent += `export const ${exp} = (id) => service.detail(id);\n`;
    } else if (exp.startsWith('create')) {
      newContent += `export const ${exp} = (payload) => service.create(payload);\n`;
    } else if (exp.startsWith('update') && exp.endsWith('Data')) {
      newContent += `export const ${exp} = (id, payload) => service.update(id, payload);\n`;
    } else if (exp.startsWith('update')) {
      // updateGelombang etc
      newContent += `export const ${exp} = (id, payload) => service.update(id, payload);\n`;
    } else if (exp.startsWith('delete')) {
      newContent += `export const ${exp} = (id) => service.remove(id);\n`;
    } else if (exp === 'getGelombangAktif') {
      newContent += `export const ${exp} = () => httpClient.get(\`${s.endpoint}/aktif\`);\n`;
    } else if (exp === 'updatePendaftarStatus') {
      newContent += `export const ${exp} = (id, payload) => httpClient.patch(\`${s.endpoint}/\${id}/status\`, payload);\n`;
    } else if (exp === 'exportPendaftar') {
      newContent += `export const ${exp} = () => httpClient.get(\`${s.endpoint}/export\`, { responseType: 'blob' });\n`;
    }
  }

  fs.writeFileSync(fullPath, newContent);
  console.log(`Refactored Admin Service: ${s.file}`);
}
