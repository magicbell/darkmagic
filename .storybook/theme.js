import { create } from '@storybook/theming';

export default create({
  base: 'dark',

  colorPrimary: '#9E8CFC',
  colorSecondary: '#9E8CFC',

  // UI
  appBg: '#191B24',
  appContentBg: '#1D1F29',
  appBorderColor: '#354061',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Inter, "Open Sans", sans-serif',
  fontCode: '"Fira Code", monospace',

  // Text colors
  textColor: '#EDEDEF',
  textInverseColor: '#A09FA6',
  textMutedColor: '#A09FA6',

  // Toolbar default and active colors
  barTextColor: '#EDEDEF',
  barSelectedColor: '#9E8CFC',
  barBg: '#23283B',

  // Form colors
  inputBg: '#2E385C',
  inputBorder: '#4D5E94',
  inputTextColor: '#EDEDEF',
  inputBorderRadius: 4,
  buttonBg: '#2E385C',
  buttonBorder: '#4D5E94',
  booleanBg: '#222425',
  booleanSelectedBg: '#9E8CFC',

  brandTitle: 'Dark Magic',
  // brandUrl: 'https://example.com',
  // brandImage: 'https://place-hold.it/350x150',
  brandTarget: '_self',
});
