import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import { createFilter } from 'rollup-pluginutils';

import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// globals
const GLOBALS = {
    vue: 'Vue'
};

// externals
const GLOBAL_EXTERNALS = ['vue', '@air-ui/air-element', 'element-plus'];
const INLINE_EXTERNALS = [/@air-ui\/air-element\/.*/, /element-plus\/.*/];
const EXTERNALS = [...GLOBAL_EXTERNALS, ...INLINE_EXTERNALS];

// alias
const ALIAS_ENTRIES = [
    {
        find: /^block\/(.*)$/,
        replacement: path.resolve(__dirname, './src/$1'),
        customResolver(source, importer) {
            const basedir = path.dirname(importer);
            const folderPath = path.resolve(basedir, source);

            const folderName = path.basename(folderPath);

            const fName = folderName;
            const files = fs.readdirSync(folderPath);
            const targetFile = files.find((file) => {
                const ext = path.extname(file);

                return ['.vue', '.js'].includes(ext) && path.basename(file, ext).toLowerCase() === fName.toLowerCase();
            });
            return targetFile ? path.join(folderPath, targetFile) : null;
        }
    }
];

// plugins
const BABEL_PLUGIN_OPTIONS = {
    extensions: ['.js', '.vue'],
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: ['@vue/babel-plugin-jsx'],
    skipPreflightCheck: true,
    babelHelpers: 'runtime',
    babelrc: false
};

const ALIAS_PLUGIN_OPTIONS = {
    entries: ALIAS_ENTRIES
};

const POSTCSS_PLUGIN_OPTIONS = {
    plugins: [postcssImport(), tailwindcss('./tailwind.config.js'), autoprefixer()],
    extract: 'styles.css',
    modules: false,
    minimize: true,
    sourceMap: true,
    // 添加以下 preprocessor 选项
    use: [
        [
            'sass',
            {
                includePaths: ['node_modules']
            }
        ]
    ]
};

const TERSER_PLUGIN_OPTIONS = {
    compress: {
        keep_infinity: true, // 保持 Infinity 值不被压缩或替换，确保在代码中 Infinity 的使用不会被改变。
        pure_getters: true, // 假设 getter 函数是纯粹的（没有副作用），允许更好的优化，可能会移除未使用的 getter。
        reduce_funcs: true // 尝试减少函数的数量，优化代码体积，可能会合并相似的函数。
    },
    mangle: {
        reserved: ['theme', 'css'] // 在混淆过程中，保留 'theme' 和 'css' 这两个变量名不被重命名，以避免破坏外部依赖或 API。
    }
};

const PLUGINS = [
    vue(),
    autoImportBlockTheme(),
    postcss(POSTCSS_PLUGIN_OPTIONS),
    autoImportAirElementStyles(),
    babel(BABEL_PLUGIN_OPTIONS)
];

const ENTRY = {
    entries: [],
    onwarn(warning) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
            //console.error(`(!) ${warning.message}`);
            return;
        }
    },
    format: {
        cjs_es(options) {
            return ENTRY.format.cjs(options).es(options);
        },
        cjs({ input, output, minify }) {
            ENTRY.entries.push({
                onwarn: ENTRY.onwarn,
                input,
                plugins: [...PLUGINS, minify && terser(TERSER_PLUGIN_OPTIONS)],
                external: EXTERNALS,
                inlineDynamicImports: true,
                output: [
                    {
                        format: 'cjs',
                        file: `${output}${minify ? '.min' : ''}.cjs`,
                        sourcemap: true,
                        exports: 'auto'
                    }
                ]
            });

            ENTRY.update.packageJson({ input, output, options: { main: `${output}.cjs` } });

            return ENTRY.format;
        },
        es({ input, output, minify }) {
            ENTRY.entries.push({
                onwarn: ENTRY.onwarn,
                input,
                plugins: [alias(ALIAS_PLUGIN_OPTIONS), resolve(), ...PLUGINS, minify && terser(TERSER_PLUGIN_OPTIONS)],
                external: EXTERNALS,
                inlineDynamicImports: true,
                output: [
                    {
                        format: 'es',
                        file: `${output}${minify ? '.min' : ''}.mjs`,
                        sourcemap: true,
                        exports: 'auto',
                        assetFileNames: '[name][extname]'
                    }
                ]
            });

            ENTRY.update.packageJson({ input, output, options: { main: `${output}.mjs`, module: `${output}.mjs` } });

            return ENTRY.format;
        },
        umd({ name, input, output, minify }) {
            ENTRY.entries.push({
                onwarn: ENTRY.onwarn,
                input,
                plugins: [alias(ALIAS_PLUGIN_OPTIONS), resolve(), ...PLUGINS, minify && terser(TERSER_PLUGIN_OPTIONS)],
                external: GLOBAL_EXTERNALS,
                inlineDynamicImports: true,
                output: [
                    {
                        format: 'umd',
                        name: name ?? 'AirBlock',
                        file: `${output}${minify ? '.min' : ''}.js`,
                        globals: GLOBALS,
                        exports: 'auto'
                    }
                ]
            });

            return ENTRY.format;
        }
    },
    update: {
        packageJson({ input, output, options }) {
            try {
                const inputDir = path.resolve(__dirname, path.dirname(input));
                const outputDir = path.resolve(__dirname, path.dirname(output));
                const packageJson = path.resolve(outputDir, 'package.json');

                !fs.existsSync(packageJson) && fs.copySync(path.resolve(inputDir, './package.json'), packageJson);

                const pkg = JSON.parse(fs.readFileSync(packageJson, { encoding: 'utf8', flag: 'r' }));

                !pkg?.main?.includes('.cjs') &&
                    (pkg.main = path.basename(options?.main) ? `./${path.basename(options.main)}` : pkg.main);
                pkg.module = path.basename(options?.module) ? `./${path.basename(options.module)}` : packageJson.module;
                pkg.types && (pkg.types = './index.d.ts');
                pkg.style = './style.css'; // 添加这行

                fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 4));
            } catch {}
        }
    }
};

function addFile() {
    fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR + folderName)).forEach((file) => {
                let name = file.split(/(.vue)$|(.js)$/)[0].toLowerCase();

                if (name === folderName) {
                    const input = process.env.INPUT_DIR + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + folderName + '/index';

                    ENTRY.format.es({ input, output });
                }
            });
        });
}

function addLibrary() {
    ENTRY.format.umd({
        name: 'AirBlock',
        input: process.env.INPUT_DIR + 'airblocks.js',
        output: process.env.OUTPUT_DIR + 'umd/airblock',
        minify: false
    });
}

// 打包时会使用自定义插件auto-import-block-theme自动引入到每个vue物料，方便后面postcss生成对应样式
function autoImportBlockTheme() {
    const filter = createFilter(['**/*.vue']);
    return {
        name: 'auto-import-block-theme',
        transform(code, id) {
            if (filter(id)) {
                // 在每个 Vue 文件的开头插入样式导入
                return {
                    code: `import '../theme/index.scss';\n${code}`,
                    map: null
                };
            }
            return null;
        }
    };
}
// 如果有air-element使用，在打包后自动引入其样式
function autoImportAirElementStyles() {
    return {
        name: 'auto-import-air-element-styles',
        renderChunk(code) {
            const componentImportRegex = /import\s*{([^}]+)}\s*from\s*['"]@air-ui\/air-element['"];?/g;
            const componentNameRegex = /\s*Air(\w+)\s*/g;

            return code.replace(componentImportRegex, (match, importContent) => {
                const styleImports = importContent
                    .split(',')
                    .map((component) => component.trim().replace(componentNameRegex, (_, name) => name.toLowerCase()))
                    .filter(Boolean)
                    .map((componentName) => `import "@air-ui/air-element/es/components/${componentName}/style/css";`)
                    .join('\n');
                return `${match}\n${styleImports}`;
            });
        }
    };
}

addFile();
addLibrary();

console.log(ENTRY.entries);
export default ENTRY.entries;
