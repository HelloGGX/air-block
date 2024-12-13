import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/block/src');
const AIRBLOCKS_PATH = path.resolve(__dirname, '../packages/block/src/airblocks.js');

const componentName = process.argv[2]?.charAt(0).toUpperCase() + process.argv[2]?.slice(1);

if (!componentName) {
    console.error('请提供组件名称。例如: npm run add-component MyComponent');
    process.exit(1);
}

const componentDir = path.join(COMPONENTS_DIR, componentName.toLowerCase());

// 检查组件是否已存在
if (fs.existsSync(componentDir)) {
    console.error(`组件 ${componentName} 已存在。`);
    process.exit(1);
}

// 创建组件目录
fs.mkdirSync(componentDir, { recursive: true });

// 文件模板
const templates = {
    vue: `<template>
  <div id="${componentName.toLowerCase()}" @click="handleClick">
{{ props.title }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: '${componentName}' });
const ${componentName.toLowerCase()}Ref = ref<HTMLElement>();

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
});

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

defineExpose({ ${componentName.toLowerCase()}Ref });

</script>
`,
    dts: `/**
 *
 * ${componentName}
 *
 * @module ${componentName}
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface ${componentName}Props { title?: string; }
export interface ${componentName}Slots { default(): VNode[]; }
export interface ${componentName}EmitsOptions { click: (evt: MouseEvent) => void; }
export declare type ${componentName}Emits = EmitFn<${componentName}EmitsOptions>;

declare const ${componentName}: DefineComponent<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;

declare module 'vue' {
    export interface GlobalComponents {
        ${componentName}: GlobalComponentConstructor<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;
    }
}
    

export default ${componentName};
`,
    stories: `import type { Meta, StoryFn } from '@storybook/vue3';
import ${componentName} from './${componentName}.vue';

const meta: Meta<typeof ${componentName}> = {
    title: '物料库/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        }
    },
    args: {
        title: '标题'
    }
    
};

const Template: StoryFn = (args) => ({
    components: { ${componentName} },
    setup() { return { args }; },
    template: '<${componentName} v-bind="args">{{ args.default }}</${componentName}>'
});

export const Default = Template.bind({});
export default meta;
`,
    package: `{
    "main": "./${componentName}.vue",
    "types": "./${componentName}.d.ts",
    "module": "./${componentName}.vue",
    "sideEffects": ["*.vue"]
}
`
};

// 写入文件的函数
const writeFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`已创建文件: ${filePath}`);
};

// 创建文件
writeFile(path.join(componentDir, `${componentName}.vue`), templates.vue);
writeFile(path.join(componentDir, `${componentName}.d.ts`), templates.dts);
writeFile(path.join(componentDir, `${componentName}.stories.ts`), templates.stories);
writeFile(path.join(componentDir, `package.json`), templates.package);

// 更新 airblocks.js
const exportLines = `
//${componentName.toLowerCase()} ------------------------------
export * from './${componentName.toLowerCase()}/${componentName}.vue';
export { default as ${componentName} } from './${componentName.toLowerCase()}/${componentName}.vue';\n`;

fs.appendFileSync(AIRBLOCKS_PATH, exportLines, 'utf8');
console.log(`已更新 airblocks.js 添加导出: ${componentName}`);
