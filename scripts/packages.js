const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

function getPackageName(pkgPath) {
  const json = fs.readFileSync(path.resolve(pkgPath, 'package.json'), 'utf-8');
  return JSON.parse(json).name;
}

const packages = pkg.workspaces.map((dir) => {
  const fullPath = path.resolve(__dirname, '..', dir);

  return {
    name: getPackageName(fullPath),
    dir: path.basename(dir),
    path: fullPath,
  };
});

module.exports = packages;
