import type { Meta, StoryFn } from '@storybook/vue3';
import Airflightinfo from './Airflightinfo.vue';

const meta: Meta<typeof Airflightinfo> = {
    title: '物料库/Airflightinfo',
    component: Airflightinfo,
    tags: ['autodocs'],
    argTypes: {
        flightNum: {
            control: { type: 'text' },
            description: '航班',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        carriageFlightNum: {
            control: { type: 'text' },
            description: '承运航班',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        flightDate: {
            control: { type: 'text' },
            description: '日期',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        flightTag: {
            control: { type: 'text' },
            description: '航班标签',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        depFlight: {
            control: { type: 'text' },
            description: '起飞航站',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        arrFlight: {
            control: { type: 'text' },
            description: '降落航站',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        }
    },
    args: {
        flightNum: 'MU12345',
        carriageFlightNum: 'CA23456',
        flightDate: '2024-01-01',
        flightTag: '备份航班',
        depFlight: '北京首都',
        arrFlight: '上海虹桥'
    }
};

const Template: StoryFn = (args) => ({
    components: { Airflightinfo },
    setup() {
        return { args };
    },
    template: '<Airflightinfo v-bind="args">{{ args.default }}</Airflightinfo>'
});

export const Default = Template.bind({});
export default meta;
