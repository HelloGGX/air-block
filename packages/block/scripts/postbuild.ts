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
const COMPONENT_NAME = process.env.COMPONENT_NAME;

/**
 * 处理单个组件的构建后处理
 * @param componentName 组件名称
 */
async function handleSingleComponent(componentName: string) {
    if (!INPUT_DIR || !OUTPUT_DIR) return;

    const componentInputDir = path.join(INPUT_DIR, componentName);
    const componentOutputDir = path.join(OUTPUT_DIR, componentName);
    const componentInputPath = path.resolve(__dirname, '..', componentInputDir);
    const componentOutputPath = path.resolve(__dirname, '..', componentOutputDir);

    if (!fs.existsSync(componentInputPath)) {
        console.error(`组件 ${componentName} 不存在`);
        return;
    }
    // 确保输出目录存在
    fs.ensureDirSync(componentOutputPath);
    // 复制组件依赖
    copyDependencies(componentInputDir, componentOutputDir);
    // 重命名 DTS 文件
    await renameDTSFile(path.join(OUTPUT_DIR, componentName), 'index');
    // 复制全局类型定义文件到输出目录
    const globalTypesPath = path.resolve(__dirname, '..', INPUT_DIR, 'index.d.ts');
    const componentTypesPath = path.resolve(componentOutputPath, 'types.d.ts');
    fs.copyFileSync(globalTypesPath, componentTypesPath);
    // 修改组件类型文件中的引用路径
    updateComponentTypeReferences(componentOutputPath);
}

/**
 * 更新组件类型文件中的引用路径
 * @param componentOutputPath 组件输出路径
 */
function updateComponentTypeReferences(componentOutputPath) {
    const componentDtsPath = path.join(componentOutputPath, 'index.d.ts');

    if (fs.existsSync(componentDtsPath)) {
        let content = fs.readFileSync(componentDtsPath, 'utf-8');
        // 将 from '../index' 替换为 from './types'
        content = content.replace(/from\s+['"]\.\.\/index['"]/g, `from './types'`);
        fs.writeFileSync(componentDtsPath, content);
    }
}

/**
 * 处理所有组件的构建后处理
 */
function handleAllComponents() {
    if (!INPUT_DIR || !OUTPUT_DIR) return;

    const packageJsonSrc = path.resolve(__dirname, '../package.json');
    const packageJsonDest = path.join(OUTPUT_DIR, 'package.json');

    // 复制 package.json
    fs.copySync(packageJsonSrc, packageJsonDest);

    // 处理所有组件
    copyDependencies(INPUT_DIR, OUTPUT_DIR);
    renameDTSFile(OUTPUT_DIR, 'index');

    // 更新 package.json
    updateOutputPackageJson();
}

/**
 * 更新输出目录中的 package.json
 */
function updateOutputPackageJson() {
    const outputPkgPath = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
    const pkgJson = JSON.parse(fs.readFileSync(outputPkgPath, { encoding: 'utf8', flag: 'r' }));

    // 读取 theme 包的 package.json 获取版本号
    updatePeerDependency(pkgJson, path.resolve(__workspace, 'packages/theme/package.json'));

    fs.writeFileSync(outputPkgPath, JSON.stringify(pkgJson, null, 4));
    clearPackageJson(outputPkgPath);
}

/**
 * 主函数
 */
async function main() {
    if (!INPUT_DIR || !OUTPUT_DIR) {
        console.error('缺少必要的环境变量: INPUT_DIR 或 OUTPUT_DIR');
        return;
    }

    if (COMPONENT_NAME) {
        await handleSingleComponent(COMPONENT_NAME);
    } else {
        handleAllComponents();
    }
}

// 执行主函数
main().catch((err) => {
    console.error('构建过程出错:', err);
    process.exit(1);
});
