/** @type {import('tailwindcss').Config} */
import elementTailwindConfig from '@air-ui/theme/tailwind.config';

module.exports = {
    ...elementTailwindConfig,
    content: ['./block/**/!(node_modules)/*.{vue,js,ts,jsx,tsx}']
};
