import { addons } from '@storybook/addons';

import theme from './theme';

addons.setConfig({
  theme,
  // Some stories may set up keyboard event handlers, which interferes with storybook
  enableShortcuts: false,
});
