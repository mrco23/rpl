const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('g:/Code/rpl/fe/src');

const moveMap = {
    'App.jsx': 'app/App.jsx',
    'index.css': 'app/index.css',
    'main.jsx': 'app/main.jsx',
    'assets/hero.webp': 'shared/assets/hero.webp',
    'assets/logo.png': 'shared/assets/logo.png',
    'components/admin/ContentTablePage.jsx': 'features/admin/components/ContentTablePage.jsx',
    'components/common/Footer.jsx': 'features/public-site/components/Footer.jsx',
    'components/common/Navbar.jsx': 'features/public-site/components/Navbar.jsx',
    'components/common/NavbarAbout.jsx': 'features/public-site/components/NavbarAbout.jsx',
    'components/common/ScrolTop.jsx': 'shared/components/ScrolTop.jsx',
    'components/common/SidebarAdmin.jsx': 'features/admin/components/SidebarAdmin.jsx',
    'components/common/SidebarPendaftar.jsx': 'features/pendaftar/components/SidebarPendaftar.jsx',
    'components/common/SidebarVerifikator.jsx': 'features/verifikator/components/SidebarVerifikator.jsx',
    'components/features/AdminHeader.jsx': 'features/admin/components/AdminHeader.jsx',
    'components/features/CardSkeleton.jsx': 'shared/components/CardSkeleton.jsx',
    'components/features/Hero.jsx': 'features/public-site/components/Hero.jsx',
    'components/features/PreviewBerita.jsx': 'features/public-site/components/PreviewBerita.jsx',
    'components/features/PreviewFasilitas.jsx': 'features/public-site/components/PreviewFasilitas.jsx',
    'components/features/PreviewPrestasi.jsx': 'features/public-site/components/PreviewPrestasi.jsx',
    'components/features/Sambutan.jsx': 'features/public-site/components/Sambutan.jsx',
    'components/features/VerifikatorHeader.jsx': 'features/verifikator/components/VerifikatorHeader.jsx',
    'components/layout/AdminLayout.jsx': 'features/admin/layouts/AdminLayout.jsx',
    'components/layout/DashboardLayout.jsx': 'shared/components/layouts/DashboardLayout.jsx',
    'components/layout/PendaftarLayout.jsx': 'features/pendaftar/layouts/PendaftarLayout.jsx',
    'components/layout/PublicLayout.jsx': 'features/public-site/layouts/PublicLayout.jsx',
    'components/layout/VerifikatorLayout.jsx': 'features/verifikator/layouts/VerifikatorLayout.jsx',
    'components/ui/AuthShell.jsx': 'features/auth/components/AuthShell.jsx',
    'components/ui/Button.jsx': 'shared/components/Button.jsx',
    'components/ui/EmptyState.jsx': 'shared/components/EmptyState.jsx',
    'components/ui/LoadingSpinner.jsx': 'shared/components/LoadingSpinner.jsx',
    'components/ui/Modal.jsx': 'shared/components/Modal.jsx',
    'components/ui/MoreButton.jsx': 'shared/components/MoreButton.jsx',
    'components/ui/Skeleton.jsx': 'shared/components/Skeleton.jsx',
    'components/ui/Toast.jsx': 'shared/components/Toast.jsx',
    'components/ui/ui.jsx': 'shared/components/ui.jsx',
    'config/school.js': 'shared/config/school.js',
    'constants/pendaftarStatus.js': 'shared/constants/pendaftarStatus.js',
    'contexts/AuthContext.jsx': 'features/auth/contexts/AuthContext.jsx',
    'contexts/useAuth.js': 'features/auth/contexts/useAuth.js',
    'data/mockData.js': 'shared/data/mockData.js',
    'data/navigation.js': 'shared/data/navigation.js',
    'hooks/useAos.js': 'shared/hooks/useAos.js',
    'pages/admin/AdminAchievementsPage.jsx': 'features/admin/pages/AdminAchievementsPage.jsx',
    'pages/admin/AdminBerandaPage.jsx': 'features/admin/pages/AdminBerandaPage.jsx',
    'pages/admin/AdminBeritaPage.jsx': 'features/admin/pages/AdminBeritaPage.jsx',
    'pages/admin/AdminEkstrakurikulerPage.jsx': 'features/admin/pages/AdminEkstrakurikulerPage.jsx',
    'pages/admin/AdminFasilitasPage.jsx': 'features/admin/pages/AdminFasilitasPage.jsx',
    'pages/admin/AdminGelombangPage.jsx': 'features/admin/pages/AdminGelombangPage.jsx',
    'pages/admin/AdminPendaftarPage.jsx': 'features/admin/pages/AdminPendaftarPage.jsx',
    'pages/admin/AdminPengumumanPage.jsx': 'features/admin/pages/AdminPengumumanPage.jsx',
    'pages/admin/AdminProfilSekolahPage.jsx': 'features/admin/pages/AdminProfilSekolahPage.jsx',
    'pages/admin/AdminProgramUnggulanPage.jsx': 'features/admin/pages/AdminProgramUnggulanPage.jsx',
    'pages/admin/AdminVerifikatorPage.jsx': 'features/admin/pages/AdminVerifikatorPage.jsx',
    'pages/auth/LoginPage.jsx': 'features/auth/pages/LoginPage.jsx',
    'pages/auth/PendaftaranPage.jsx': 'features/auth/pages/PendaftaranPage.jsx',
    'pages/auth/UbahKataSandiPage.jsx': 'features/auth/pages/UbahKataSandiPage.jsx',
    'pages/pendaftar/BerandaPendaftarPage.jsx': 'features/pendaftar/pages/BerandaPendaftarPage.jsx',
    'pages/pendaftar/PendaftarPengumumanPage.jsx': 'features/pendaftar/pages/PendaftarPengumumanPage.jsx',
    'pages/pendaftar/StatusVerifikasiPage.jsx': 'features/pendaftar/pages/StatusVerifikasiPage.jsx',
    'pages/pendaftar/UnggahDokumenPage.jsx': 'features/pendaftar/pages/UnggahDokumenPage.jsx',
    'pages/public/BeritaPage.jsx': 'features/public-site/pages/BeritaPage.jsx',
    'pages/public/DetailBeritaPage.jsx': 'features/public-site/pages/DetailBeritaPage.jsx',
    'pages/public/EkstrakurikulerPage.jsx': 'features/public-site/pages/EkstrakurikulerPage.jsx',
    'pages/public/FasilitasPage.jsx': 'features/public-site/pages/FasilitasPage.jsx',
    'pages/public/LandingPage.jsx': 'features/public-site/pages/LandingPage.jsx',
    'pages/public/NotFoundPage.jsx': 'features/public-site/pages/NotFoundPage.jsx',
    'pages/public/PanduanPage.jsx': 'features/public-site/pages/PanduanPage.jsx',
    'pages/public/PrestasiPage.jsx': 'features/public-site/pages/PrestasiPage.jsx',
    'pages/public/ProfilePage.jsx': 'features/public-site/pages/ProfilePage.jsx',
    'pages/public/ProgramPage.jsx': 'features/public-site/pages/ProgramPage.jsx',
    'pages/public/SejarahPage.jsx': 'features/public-site/pages/SejarahPage.jsx',
    'pages/public/VisiMisiPage.jsx': 'features/public-site/pages/VisiMisiPage.jsx',
    'pages/verifikator/VerifikatorBerandaPage.jsx': 'features/verifikator/pages/VerifikatorBerandaPage.jsx',
    'pages/verifikator/VerifikatorVerifikasiPage.jsx': 'features/verifikator/pages/VerifikatorVerifikasiPage.jsx',
    'security/ProtectedRoute.jsx': 'shared/security/ProtectedRoute.jsx',
    'services/achievementService.js': 'features/public-site/services/achievementService.js',
    'services/adminAchievementService.js': 'features/admin/services/adminAchievementService.js',
    'services/adminAxios.js': 'services/adminAxios.js',
    'services/adminDashboardService.js': 'features/admin/services/adminDashboardService.js',
    'services/adminEkskulService.js': 'features/admin/services/adminEkskulService.js',
    'services/adminFasilitasService.js': 'features/admin/services/adminFasilitasService.js',
    'services/adminGelombangService.js': 'features/admin/services/adminGelombangService.js',
    'services/adminNewsService.js': 'features/admin/services/adminNewsService.js',
    'services/adminPendaftarService.js': 'features/admin/services/adminPendaftarService.js',
    'services/adminPengumumanService.js': 'features/admin/services/adminPengumumanService.js',
    'services/adminProfileService.js': 'features/admin/services/adminProfileService.js',
    'services/adminProgramService.js': 'features/admin/services/adminProgramService.js',
    'services/adminVerifikasiService.js': 'features/admin/services/adminVerifikasiService.js',
    'services/adminVerifikatorService.js': 'features/admin/services/adminVerifikatorService.js',
    'services/api.js': 'services/api.js',
    'services/apiClient.js': 'services/apiClient.js',
    'services/authService.js': 'features/auth/services/authService.js',
    'services/contentService.js': 'features/public-site/services/contentService.js',
    'services/dokumenService.js': 'features/pendaftar/services/dokumenService.js',
    'services/extracurricularService.js': 'features/public-site/services/extracurricularService.js',
    'services/fasilitasService.js': 'features/public-site/services/fasilitasService.js',
    'services/newsService.js': 'features/public-site/services/newsService.js',
    'services/pendaftarPengumumanService.js': 'features/pendaftar/services/pendaftarPengumumanService.js',
    'services/pendaftarService.js': 'features/pendaftar/services/pendaftarService.js',
    'services/profileService.js': 'features/public-site/services/profileService.js',
    'services/programService.js': 'features/public-site/services/programService.js',
    'services/siteContentService.js': 'features/public-site/services/siteContentService.js',
    'services/verifikatorVerifikasiService.js': 'features/verifikator/services/verifikatorVerifikasiService.js',
    'services/waveService.js': 'features/public-site/services/waveService.js',
    'utils/dateHelper.js': 'shared/utils/dateHelper.js',
    'utils/docs.md': 'shared/utils/docs.md',
    'utils/documentHelper.js': 'shared/utils/documentHelper.js',
    'utils/formateDate.js': 'shared/utils/formateDate.js',
    'utils/imageHelper.js': 'shared/utils/imageHelper.js',
    'utils/token.js': 'shared/utils/token.js'
};

const oldAliases = {
    '@components': path.resolve(srcDir, 'components'),
    '@contexts': path.resolve(srcDir, 'contexts'),
    '@utils': path.resolve(srcDir, 'utils'),
    '@services': path.resolve(srcDir, 'services'),
    '@data': path.resolve(srcDir, 'data'),
    '@assets': path.resolve(srcDir, 'assets')
};

// 1. Read all files into memory BEFORE moving them, so we can process them
let filesData = [];

for (const [oldRel, newRel] of Object.entries(moveMap)) {
    const oldAbs = path.resolve(srcDir, oldRel);
    const newAbs = path.resolve(srcDir, newRel);
    if (fs.existsSync(oldAbs)) {
        filesData.push({
            oldAbs,
            newAbs,
            content: fs.readFileSync(oldAbs, 'utf8'),
            isJs: oldAbs.endsWith('.js') || oldAbs.endsWith('.jsx')
        });
    }
}

// Map of absolute old path -> absolute new path
const absOldToNew = {};
for (const [oldRel, newRel] of Object.entries(moveMap)) {
    absOldToNew[path.resolve(srcDir, oldRel).replace(/\\\\/g, '/')] = path.resolve(srcDir, newRel).replace(/\\\\/g, '/');
}

// Function to resolve import path
function resolveImportPath(currentDirOld, importStr) {
    if (importStr.startsWith('.')) {
        return path.resolve(currentDirOld, importStr).replace(/\\\\/g, '/');
    }
    for (const [alias, aliasPath] of Object.entries(oldAliases)) {
        if (importStr.startsWith(alias)) {
            return path.resolve(aliasPath, importStr.substring(alias.length).replace(/^\//, '')).replace(/\\/g, '/');
        }
    }
    return null;
}

// 2. Rewrite imports in memory
const importRegex = /from\s+['"]([^'"]+)['"]/g;
const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

filesData.forEach(file => {
    if (!file.isJs) return;

    const currentDirOld = path.dirname(file.oldAbs);
    const currentDirNew = path.dirname(file.newAbs);

    file.content = file.content.replace(importRegex, (match, importStr) => {
        let absImportOld = resolveImportPath(currentDirOld, importStr);
        if (absImportOld) {
            // Check if exact file exists
            if (!fs.existsSync(absImportOld)) {
                // Try appending .js or .jsx
                if (fs.existsSync(absImportOld + '.js')) absImportOld += '.js';
                else if (fs.existsSync(absImportOld + '.jsx')) absImportOld += '.jsx';
                else if (fs.existsSync(path.join(absImportOld, 'index.js'))) absImportOld = path.join(absImportOld, 'index.js');
            }

            absImportOld = absImportOld.replace(/\\\\/g, '/');
            const absImportNew = absOldToNew[absImportOld] || absOldToNew[absImportOld + '.js'] || absOldToNew[absImportOld + '.jsx'];

            if (absImportNew) {
                // Replace with relative path
                let relPath = path.relative(currentDirNew, absImportNew).replace(/\\\\/g, '/');
                if (!relPath.startsWith('.')) relPath = './' + relPath;
                // Remove extension if it was not there originally
                if (!importStr.endsWith('.js') && !importStr.endsWith('.jsx')) {
                    relPath = relPath.replace(/\\.jsx?$/, '');
                }
                return `from "${relPath}"`;
            }
        }
        return match;
    });

    file.content = file.content.replace(dynamicImportRegex, (match, importStr) => {
        let absImportOld = resolveImportPath(currentDirOld, importStr);
        if (absImportOld) {
            if (!fs.existsSync(absImportOld)) {
                if (fs.existsSync(absImportOld + '.js')) absImportOld += '.js';
                else if (fs.existsSync(absImportOld + '.jsx')) absImportOld += '.jsx';
            }

            absImportOld = absImportOld.replace(/\\\\/g, '/');
            const absImportNew = absOldToNew[absImportOld] || absOldToNew[absImportOld + '.js'] || absOldToNew[absImportOld + '.jsx'];

            if (absImportNew) {
                let relPath = path.relative(currentDirNew, absImportNew).replace(/\\\\/g, '/');
                if (!relPath.startsWith('.')) relPath = './' + relPath;
                if (!importStr.endsWith('.js') && !importStr.endsWith('.jsx')) {
                    relPath = relPath.replace(/\\.jsx?$/, '');
                }
                return `import("${relPath}")`;
            }
        }
        return match;
    });
});

// 3. Move files and write new contents
filesData.forEach(file => {
    fs.mkdirSync(path.dirname(file.newAbs), { recursive: true });
    fs.writeFileSync(file.newAbs, file.content);
    // don't delete old files yet, just in case some other things break, we delete at the end
});

// Update index.html
const indexHtmlPath = path.resolve(srcDir, '../index.html');
if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    indexHtml = indexHtml.replace('/src/main.jsx', '/src/app/main.jsx');
    fs.writeFileSync(indexHtmlPath, indexHtml);
}

// Update vite.config.js to remove aliases, or rewrite them
const viteConfigPath = path.resolve(srcDir, '../vite.config.js');
if (fs.existsSync(viteConfigPath)) {
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    viteConfig = viteConfig.replace(/alias:\s*\{[^}]+\}/, `alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@features': path.resolve(__dirname, './src/features'),
            '@services': path.resolve(__dirname, './src/services')
        }`);
    fs.writeFileSync(viteConfigPath, viteConfig);
}

// Delete old empty directories recursively
function removeEmptyDirectories(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    if (files.length > 0) {
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                removeEmptyDirectories(fullPath);
            }
        });
    }
    // Check again after removing subdirectories
    if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
    }
}

// We need to delete the original files that were moved
for (const [oldRel, newRel] of Object.entries(moveMap)) {
    const oldAbs = path.resolve(srcDir, oldRel);
    const newAbs = path.resolve(srcDir, newRel);
    if (fs.existsSync(oldAbs) && oldAbs !== newAbs) {
        fs.unlinkSync(oldAbs);
    }
}

['components', 'config', 'constants', 'contexts', 'data', 'hooks', 'pages', 'security', 'services', 'utils', 'assets'].forEach(dir => {
    removeEmptyDirectories(path.resolve(srcDir, dir));
});

console.log("Refactoring complete");
