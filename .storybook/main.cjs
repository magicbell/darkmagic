const { mergeConfig } = require('vite');
const tsConfig = require('../tsconfig.json');
const { resolve } = require('path');

const cleanPath = (path) => path.replace(/\/\*$/, '');
const alias = Object.entries(tsConfig.compilerOptions.paths).reduce(
  (acc, [key, values]) => Object.assign(acc, { [cleanPath(key)]: resolve(cleanPath(values[0])) }),
  {},
);

const baseUrl = '/storybook/';

/**
 * @type { import("@storybook/core-common").StorybookConfig }
 **/
module.exports = {
  stories: [
    {
      directory: '../packages/react/src/components',
      files: '**/*.stories.@(js|jsx|ts|tsx|mdx)',
      titlePrefix: 'primitives',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
    previewCsfV3: true,
  },

  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: configType === 'PRODUCTION' ? baseUrl : config.base,
      esbuild: { jsx: 'automatic' },
      resolve: mergeConfig(config.resolve, { alias }, false),
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      // vercel throws `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`
      build: mergeConfig(config.build, { minify: false }, false),
    });
  },
  managerWebpack: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.output.publicPath = baseUrl;
    }

    return config;
  },
  managerHead: (head, { configType }) => {
    const injections = [
      `<link rel="shortcut icon" type="image/x-icon" href="${baseUrl}favicon.ico">`,
      `<script>window.PREVIEW_URL = '${baseUrl}iframe.html'</script>`,
    ];

    return configType === 'PRODUCTION'
      ? `${head}${injections.join('')}`
      : head
  },
};
