const { mergeConfig } = require('vite');
const tsConfig = require('../tsconfig.json');
const {
  resolve,
  dirname,
  join
} = require('path');

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
      files: '**/*.stories.@(js|jsx|ts|tsx)',
      titlePrefix: 'primitives',
    },
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-themes")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
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

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
