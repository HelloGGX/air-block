import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig({
    plugins: [vue(), ElementPlus()],
    css: {
        postcss: {
            plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
        }
    }
});
