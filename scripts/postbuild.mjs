import fs from 'fs-extra';
import path from 'path';
import { clearPackageJson, renameDTSFile, resolvePath, copyDependencies } from '../../../scripts/build-helper.mjs';

const { __dirname, __workspace, INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

copyDependencies(INPUT_DIR, OUTPUT_DIR);
renameDTSFile(OUTPUT_DIR, 'index');

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);

clearPackageJson(path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`));
