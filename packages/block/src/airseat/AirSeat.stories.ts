import type { Meta, StoryFn } from '@storybook/vue3';
import AirSeat from './AirSeat.vue';

const meta: Meta<typeof AirSeat> = {
    title: '物料库/AirSeat',
    component: AirSeat,
    tags: ['autodocs'],
    argTypes: {
        status: {
            control: { type: 'select' },
            options: ['available', 'selected', 'unavailable', 'emergency-left', 'emergency-right'],
            description: '座位状态 (available | selected | unavailable | emergency-left | emergency-right)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'available' }
            }
        },
        seatNumber: {
            control: {
                type: 'number'
            }
        }
    },
    args: {
        status: 'available',
        seatNumber: 1
    }
};

const Template: StoryFn = (args) => ({
    components: { AirSeat },
    setup() {
        const handleClick = (evt: { status: typeof args.status; seatNumber: number }) => {
            console.log(evt);
        };
        return { args, handleClick };
    },
    template: '<AirSeat v-bind="args" @click="handleClick">{{ args.seatNumber }}</AirSeat>'
});

export const Default = Template.bind({});
export default meta;
