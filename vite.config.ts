import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            block: path.resolve(__dirname, 'packages/block/src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['node_modules']
            }
        },
        postcss: {
            plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
        }
    }
});
