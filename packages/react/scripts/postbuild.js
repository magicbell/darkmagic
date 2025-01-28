import fs from 'fs';
import sort from 'sort-package-json';

const pkgJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

const exports = pkgJson.exports;

for (const key of Object.keys(exports)) {
  if (key.endsWith('.stories')) {
    delete exports[key];
  }
}

fs.writeFileSync('./package.json', JSON.stringify(sort(pkgJson), null, 2));
