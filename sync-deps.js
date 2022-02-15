const path = require('path');
const fs = require('fs');

function getPackageJsonPath(packageDir) {
  return path.resolve('./packages', packageDir, 'package.json');
}

function updateVersions(deps) {
  if (deps != null) {
    for (const [name, version] of Object.entries(deps)) {
      deps[name] = packageVersionMap[name] ? '^' + packageVersionMap[name] : version;
    }
  }
}

const packageDirs = fs.readdirSync(path.resolve('./packages'));

const packageVersionMap = packageDirs.reduce((versionMap, packageDir) => {
  const packageJson = require(getPackageJsonPath(packageDir));
  versionMap[packageJson.name] = packageJson.version;
  return versionMap;
}, {});

for (const packageDir of packageDirs) {

  const packageJsonPath = getPackageJsonPath(packageDir);
  const packageJson = require(packageJsonPath);

  updateVersions(packageJson.dependencies);
  updateVersions(packageJson.devDependencies);
  updateVersions(packageJson.peerDependencies);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}
