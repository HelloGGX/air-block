import type { Meta, StoryFn } from '@storybook/vue3';
import AirCard from './AirCard.vue';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AirCard> = {
  title: "BLOCK/Card",
  tags: ['autodocs'],
  component: AirCard,
  argTypes: {
    num: {
      control: { type: 'number' },
      description: '旅客序号',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'default' }
      }
    },
    name: {
      control: { type: 'text' },
      description: "旅客姓名",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: 'default' }
      }
    },
    seatNum: {
      control: { type: "text" },
      description: "座位号",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "请选座" }
      }
    },
    showClose: {
      control: "boolean",
      description: "是否显示关闭图标",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" }
      }
    }
  },
  args: {
    num: 0,
    name: "default",
    seatNum: "default",
    showClose: true,
    // onClose: action("clicked"),
    // onSelect: action("clicked")
  }
};

const Template: StoryFn = (args) => ({
  components: { AirCard },
  setup() {
    return { args };
  },
  template: '<AirCard v-bind="args">{{ args.default }}</AirCard>'
})

export const Default = Template.bind({});

export default meta;