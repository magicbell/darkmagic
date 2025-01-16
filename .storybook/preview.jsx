import { globalStyles, Tooltip } from '@darkmagic/react';
import { withThemeByClassName } from '@storybook/addon-themes';

globalStyles();

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    exclude: /^(css|asChild|children)$/i,
    expanded: true,
  },
  previewTabs: {
    'storybook/docs/panel': { hidden: true },
  },
};

export const decorators = [
  (Story) => (
    <Tooltip.Provider>
      <Story />
    </Tooltip.Provider>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    }
  }),
];
export const tags = [];//['autodocs'];
