const fs = require('fs');
const path = require('path');
const rootPkg = require('../package.json');

function getPackage(pkgPath) {
  const json = fs.readFileSync(path.resolve(pkgPath, 'package.json'), 'utf-8');
  return JSON.parse(json);
}

const packages = rootPkg.workspaces
  .map((dir) => {
    const fullPath = path.resolve(__dirname, '..', dir);
    const pkg = getPackage(fullPath);

    return {
      name: pkg.name,
      private: pkg.private,
      dir: path.basename(dir),
      path: fullPath,
    };
  })
  .filter((pkg) => !pkg.private);

module.exports = packages;
