import fs from 'fs-extra';
import path from 'path';
import {
    clearPackageJson,
    renameDTSFile,
    resolvePath,
    copyDependencies,
    updatePeerDependency
} from '../../../scripts/build-helper';

const { __dirname, __workspace, INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
if (INPUT_DIR && OUTPUT_DIR) {
    copyDependencies(INPUT_DIR, OUTPUT_DIR);
    renameDTSFile(OUTPUT_DIR, 'index');
}

const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
// package.json
const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));
// 读取 theme 包的 package.json 获取版本号
updatePeerDependency(pkgJson, path.resolve(__workspace, 'packages/theme/package.json'));

fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
clearPackageJson(outputpkg);
