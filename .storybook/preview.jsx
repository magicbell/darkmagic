import { globalStyles, Tooltip } from '@darkmagic/react';

globalStyles();

export const parameters = {
  actions: { argTypesRegex: '^on.*(Click|Change|Focus|Blur|Enter|Leave).*' },
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
];
