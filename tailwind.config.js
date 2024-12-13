/** @type {import('tailwindcss').Config} */
import elementTailwindConfig from './packages/air-element/tailwind.config';

module.exports = {
    ...elementTailwindConfig,
    content: ['./packages/**/!(node_modules)/*.{vue,js,ts,jsx,tsx}']
};
