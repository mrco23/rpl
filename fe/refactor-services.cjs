const fs = require('fs');
const path = require('path');

const baseService = `import ResourceService from "../../../services/resourceService.js";

class SERVICE_CLASS_NAME extends ResourceService {
  constructor() {
    super("ENDPOINT_URL");
  }
}

export default new SERVICE_CLASS_NAME();
`;

// Map of service files and their basic endpoints.
// Some might have custom methods, I will manually inspect them later if they do.
const servicesToRefactor = [
  { path: 'features/public-site/services/newsService.js', name: 'NewsService', endpoint: '/berita' },
  { path: 'features/public-site/services/fasilitasService.js', name: 'FasilitasService', endpoint: '/fasilitas' },
  { path: 'features/public-site/services/achievementService.js', name: 'AchievementService', endpoint: '/prestasi' },
  { path: 'features/public-site/services/extracurricularService.js', name: 'ExtracurricularService', endpoint: '/ekskul' },
  { path: 'features/public-site/services/programService.js', name: 'ProgramService', endpoint: '/program-unggulan' },
  { path: 'features/public-site/services/waveService.js', name: 'WaveService', endpoint: '/gelombang' },
];

const srcDir = path.resolve('g:/Code/rpl/fe/src');

for (const s of servicesToRefactor) {
  const fullPath = path.resolve(srcDir, s.path);
  if (fs.existsSync(fullPath)) {
    // Basic overwrite for services that strictly just have CRUD
    let content = baseService
      .replace(/SERVICE_CLASS_NAME/g, s.name)
      .replace(/ENDPOINT_URL/g, s.endpoint);
    fs.writeFileSync(fullPath, content);
    console.log(`Refactored ${s.path}`);
  }
}

const adminServicesToRefactor = [
  { path: 'features/admin/services/adminNewsService.js', name: 'AdminNewsService', endpoint: '/berita' },
  { path: 'features/admin/services/adminFasilitasService.js', name: 'AdminFasilitasService', endpoint: '/fasilitas' },
  { path: 'features/admin/services/adminAchievementService.js', name: 'AdminAchievementService', endpoint: '/prestasi' },
  { path: 'features/admin/services/adminEkskulService.js', name: 'AdminEkskulService', endpoint: '/ekskul' },
  { path: 'features/admin/services/adminProgramService.js', name: 'AdminProgramService', endpoint: '/program-unggulan' },
  { path: 'features/admin/services/adminGelombangService.js', name: 'AdminGelombangService', endpoint: '/gelombang' },
  { path: 'features/admin/services/adminPengumumanService.js', name: 'AdminPengumumanService', endpoint: '/pengumuman' },
  { path: 'features/admin/services/adminPendaftarService.js', name: 'AdminPendaftarService', endpoint: '/pendaftar' },
];

for (const s of adminServicesToRefactor) {
  const fullPath = path.resolve(srcDir, s.path);
  if (fs.existsSync(fullPath)) {
    // Instead of completely overwriting with a class, the old ones exported individual functions!
    // Exporting class instance as default breaks imports like: import { getAllBerita } from "..."
    console.log(`Admin Service requires manual or function-based refactor: ${s.path}`);
  }
}
