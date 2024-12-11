import type { Meta, StoryFn } from '@storybook/vue3';
import Airlayout from './Airlayout.vue';

const meta: Meta<typeof Airlayout> = {
    title: '物料库/Airlayout',
    component: Airlayout,
    tags: ['autodocs']
};

const Template: StoryFn = (args) => ({
    components: { Airlayout },
    setup() {
        return { args };
    },
    template: `
      <Airlayout v-bind="args">
        <template #header>
          <h1>这里是顶部内容</h1>
        </template>
        <template #default>
          <p>这里是中间内容。</p>
        </template>
        <template #footer>
          <p>这里是底部内容。</p>
        </template>
      </Airlayout>
    `
});

export const Default = Template.bind({});
export default meta;
