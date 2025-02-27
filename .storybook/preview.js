/** @type { import('@storybook/vue3').Preview } */
import '../theme/index.css';

import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },

    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            defaultValue: 'zh',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'en', right: '🇺🇸', title: 'English' },
                    { value: 'zh', right: '🇨🇳', title: '中文' }
                ]
            }
        }
    },

    decorators: [
        withThemeByDataAttribute({
            themes: {
                ['默认']: 'default',
                ['立夏']: 'summer',
                ['圣诞节']: 'christmas'
            },
            defaultTheme: '默认',
            dataAttribute: 'data-theme'
        })
    ]
};

export default preview;
