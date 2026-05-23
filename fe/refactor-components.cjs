const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('g:/Code/rpl/fe/src');

const componentFiles = [
  'features/public-site/components/Footer.jsx',
  'features/public-site/layouts/PublicLayout.jsx',
  'features/public-site/pages/BeritaPage.jsx',
  'features/public-site/pages/DetailBeritaPage.jsx',
  'features/public-site/pages/EkstrakurikulerPage.jsx',
  'features/public-site/pages/FasilitasPage.jsx',
  'features/public-site/pages/LandingPage.jsx',
  'features/public-site/pages/PrestasiPage.jsx',
  'features/public-site/pages/ProfilePage.jsx',
  'features/public-site/pages/ProgramPage.jsx',
  'features/public-site/pages/VisiMisiPage.jsx'
];

for (const relPath of componentFiles) {
  const fullPath = path.join(srcDir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Simple string replacements for common patterns
  content = content.replace(/const res = await ([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\([^)]*\));\s*if \((?:res|response)\.success\) {([\s\S]*?)} else {([\s\S]*?)}/g, 
    (match, apiCall, successBlock, errorBlock) => {
      // Find what was set to error message
      // usually setError(res.message) -> we change to err.message
      let newErrorBlock = errorBlock.replace(/(?:res|response)\.message/g, 'err.message');
      return `try {\n      const res = await ${apiCall};\n      ${successBlock.trim()}\n    } catch (err) {\n      ${newErrorBlock.trim()}\n    }`;
    }
  );

  content = content.replace(/const response = await ([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\([^)]*\));\s*if \(response\.success\) {([\s\S]*?)} else {([\s\S]*?)}/g, 
    (match, apiCall, successBlock, errorBlock) => {
      let newErrorBlock = errorBlock.replace(/response\.message/g, 'err.message');
      return `try {\n      const response = await ${apiCall};\n      ${successBlock.trim()}\n    } catch (err) {\n      ${newErrorBlock.trim()}\n    }`;
    }
  );

  fs.writeFileSync(fullPath, content);
  console.log(`Updated component: ${relPath}`);
}
