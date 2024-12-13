import type { Meta, StoryFn } from '@storybook/vue3';
import Airheader from './Airheader.vue';

const meta: Meta<typeof Airheader> = {
    title: '物料库/Airheader',
    component: Airheader,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        countdownNumber: {
            control: 'number',
            description: '倒计时数字',
            table: {
                type: { summary: 'number' }
            }
        }
    },
    args: {
        countdownNumber: 10 // 默认倒计时数字
    }
};

export default meta;

const Template: StoryFn = (args) => ({
    components: { Airheader },
    setup() {
        return { args };
    },
    template: '<Airheader v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
    countdownNumber: 10
};

export const WithCountdown = Template.bind({});
WithCountdown.args = {
    countdownNumber: 5
};
