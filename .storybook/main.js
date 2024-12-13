/** @type { import('@storybook/vue3-vite').StorybookConfig } */

const config = {
    stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-themes'
    ],

    framework: {
        name: '@storybook/vue3-vite'
    },
    core: {
        builder: {
            name: '@storybook/builder-vite'
        }
    }
};
export default config;
