import { dirname, join } from 'path';
/** @type { import('@storybook/vue3-vite').StorybookConfig } */

const config = {
    stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-themes'),
        getAbsolutePath('@storybook/experimental-addon-test')
    ],

    framework: {
        name: getAbsolutePath('@storybook/vue3-vite')
    },
    core: {
        builder: {
            name: getAbsolutePath('@storybook/builder-vite')
        }
    }
};
export default config;

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}
