import type { Meta, StoryFn } from '@storybook/vue3';
import Airstep from './AirStep.vue';

const meta: Meta<typeof Airstep> = {
    title: '物料库/AirStep',
    component: Airstep,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'AirStep 用于顶部步骤条的展示'
            }
        }
    },
    argTypes: {
        active: {
            control: { type: 'number' },
            description: '设置当前激活步骤',
            table: {
                type: { summary: 'number' },
                defaultValue: {}
            }
        },
        isCenter: {
            control: { type: 'boolean' },
            description: '是否居中对齐',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isHorizontal: {
            control: 'boolean',
            description: '是否水平展示',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            }
        },
        icon: {
            control: 'text',
            description: '自定义 loading 图标',
            table: {
                type: { summary: 'string | Component' },
                defaultValue: { summary: 'Check' }
            }
        },
        steps: {
            control: 'object',
            description: '步骤',
            table: {
                type: { summary: 'array' }
            }
        }
    },
    args: {
        active: 3,
        isCenter: false,
        steps: [
            { label: '旅客提取', description: '' },
            { label: '行程选择', description: '' },
            { label: '座位选择', description: '' },
            { label: '信息完成', description: '' }
        ],
        isHorizontal: true,
        icon: 'Check'
    }
};

const Template: StoryFn = (args) => ({
    components: { Airstep },
    setup() {
        return { args };
    },
    template: '<Airstep v-bind="args">{{ args.default }}</Airstep>'
});

export const Default = Template.bind({});
export default meta;
