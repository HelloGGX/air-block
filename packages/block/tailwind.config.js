let themeConfig = {};
try {
  // 如果用户安装了 @air-ui/theme，则尝试加载该主题配置。
  // 假设 @air-ui/theme 导出的是一个 Tailwind 配置对象，如 { colors: {...}, ... }
  const airTheme = require('@air-ui/theme/config');
  themeConfig = airTheme;
} catch (error) {
  themeConfig = {
    colors: {
        white: {
            800: 'var(--air-color-white-800)',
            700: 'var(--air-color-white-700)',
            600: 'var(--air-color-white-600)',
            500: 'var(--air-color-white-500)',
            400: 'var(--air-color-white-400)',
            300: 'var(--air-color-white-300)',
            200: 'var(--air-color-white-200)',
            100: 'var(--air-color-white-100)'
        },
        primary: {
            800: 'var(--air-color-primary-800)',
            700: 'var(--air-color-primary-700)',
            600: 'var(--air-color-primary-600)',
            500: 'var(--air-color-primary-500)',
            400: 'var(--air-color-primary-400)',
            300: 'var(--air-color-primary-300)',
            200: 'var(--air-color-primary-200)',
            100: 'var(--air-color-primary-100)'
        },
        gray: {
            800: 'var(--air-color-gray-800)',
            700: 'var(--air-color-gray-700)',
            600: 'var(--air-color-gray-600)',
            500: 'var(--air-color-gray-500)',
            400: 'var(--air-color-gray-400)',
            300: 'var(--air-color-gray-300)',
            200: 'var(--air-color-gray-200)',
            100: 'var(--air-color-gray-100)'
        },
        red: {
            400: 'var(--air-color-red-400)',
            200: 'var(--air-color-red-200)',
            100: 'var(--air-color-red-100)'
        },
        blue: {
            400: 'var(--air-color-blue-400)',
            200: 'var(--air-color-blue-200)',
            100: 'var(--air-color-blue-100)'
        },
        green: {
            400: 'var(--air-color-green-400)',
            200: 'var(--air-color-green-200)',
            100: 'var(--air-color-green-100)'
        },
        purple: {
            400: 'var(--air-color-purple-400)',
            200: 'var(--air-color-purple-200)',
            100: 'var(--air-color-purple-100)'
        },
        orange: {
            400: 'var(--air-color-orange-400)',
            200: 'var(--air-color-orange-200)',
            100: 'var(--air-color-orange-100)'
        }
    },
    fontSize: {
        56: 'var(--air-font-size-56)',
        48: 'var(--air-font-size-48)',
        40: 'var(--air-font-size-40)',
        32: 'var(--air-font-size-32)',
        24: 'var(--air-font-size-24)',
        20: 'var(--air-font-size-20)',
        16: 'var(--air-font-size-16)',
        14: 'var(--air-font-size-14)'
    },
    fontFamily: {
        sans: ['var(--air-font-family-base)', 'sans-serif']
    },
    borderRadius: {
        none: 'var(--air-radius-none)', // 无圆角
        sm: 'var(--air-radius-sm)', // 小圆角
        base: 'var(--air-radius-base)', // 默认圆角
        DEFAULT: 'var(--air-radius-base)', // 默认圆角
        md: 'var(--air-radius-base)', // 中等圆角 (保持与默认相同)
        lg: 'var(--air-radius-lg)', // 大圆角
        full: 'var(--air-radius-full)' // 完全圆角
    },
    space: {
        4: 'var(--air-spacing-4)',
        8: 'var(--air-spacing-8)',
        12: 'var(--air-spacing-12)',
        16: 'var(--air-spacing-16)',
        24: 'var(--air-spacing-24)',
        40: 'var(--air-spacing-40)',
        80: 'var(--air-spacing-80)'
    }
  };
}

module.exports = {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            ...themeConfig
        }
    },
};
