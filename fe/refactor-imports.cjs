const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace imports
      const apiRegex = /import\s+(?:{\s*requestAPI\s*}|api)\s+from\s+['"](.*\/)api(?:\.js)?['"]/g;
      if (apiRegex.test(content)) {
        content = content.replace(apiRegex, 'import httpClient, { requestAPI } from "$1httpClient.js"');
        changed = true;
      }

      const adminAxiosRegex = /import\s+adminAxios\s+from\s+['"](.*\/)adminAxios(?:\.js)?['"]/g;
      if (adminAxiosRegex.test(content)) {
        content = content.replace(adminAxiosRegex, 'import httpClient from "$1httpClient.js"');
        changed = true;
      }

      const apiClientRegex = /import\s+apiClient\s+from\s+['"](.*\/)apiClient(?:\.js)?['"]/g;
      if (apiClientRegex.test(content)) {
        content = content.replace(apiClientRegex, 'import httpClient from "$1httpClient.js"');
        changed = true;
      }
      
      // Also change API usages
      if (changed) {
        // adminAxios.get -> httpClient.get
        content = content.replace(/adminAxios\./g, 'httpClient.');
        // apiClient.get -> httpClient.get
        content = content.replace(/apiClient\./g, 'httpClient.');
        fs.writeFileSync(fullPath, content);
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.resolve('g:/Code/rpl/fe/src'));
