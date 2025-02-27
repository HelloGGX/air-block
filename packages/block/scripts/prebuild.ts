import fs from 'fs-extra';
import path from 'path';
import { removeBuild, resolvePath, updatePackageJson } from '../../../scripts/build-helper';

removeBuild(import.meta.url);

const { __dirname, INPUT_DIR } = resolvePath(import.meta.url);
const __root = path.resolve(__dirname, '../');
const pkg = path.resolve(__root, './package.json');

updatePackageJson(pkg);

// update package.json > "exports" for local
const exports: Record<string, string> = {};

fs.readdirSync(path.resolve(__root, INPUT_DIR || ''), { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .forEach(({ name: folderName }) => {
        const folderPath = path.resolve(__root, INPUT_DIR + folderName);

        fs.readdirSync(folderPath).forEach((file) => {
            const fileName = file.split(/(.vue)$|(.js)$/)[0];
            const name = fileName.toLowerCase();

            if (name === folderName) {
                exports[`./${folderName}`] = `./${INPUT_DIR}${folderName}/${file}`;
            }
        });
    });
exports['./*'] = './*';

// package.json
const pkgJson = JSON.parse(fs.readFileSync(pkg, { encoding: 'utf8', flag: 'r' }));

pkgJson.exports = exports;

fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 4));
