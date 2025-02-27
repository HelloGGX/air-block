import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            provider: 'v8',
            exclude: [
                ...coverageConfigDefaults.exclude,
                '**/*.ts',
                '**/*.js',
                '**/*.mjs',
                '**/dist/**',
                '**/.storybook/**',
                // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
                '**/*.stories.*',
                // 👇 This pattern must align with the output directory of `storybook build`
                '**/storybook-static/**'
            ]
        }
    }
});
