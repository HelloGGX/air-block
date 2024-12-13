import fs from 'fs-extra';
import path from 'path';
import { clearPackageJson, renameDTSFile, resolvePath, copyDependencies } from '../../../scripts/build-helper.mjs';

const { __dirname, INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
copyDependencies(INPUT_DIR, OUTPUT_DIR);
renameDTSFile(OUTPUT_DIR, 'index');

const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
// package.json
const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));

fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
clearPackageJson(outputpkg);
