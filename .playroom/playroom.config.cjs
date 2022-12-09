const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  components: './components.js',
  typeScriptFiles: [path.join(root, 'packages/react/src/components/**/*.tsx'), '!**/node_modules'],
  outputPath: path.join(root, 'dist', 'playroom'),

  reactDocgenTypescriptConfig: {
    propFilter: (prop, component) => {
      return true;
    },
  },

  // Optional:
  title: 'DarkMagic by MagicBell',
  snippets: './snippets.js',
  frameComponent: './frame.js',
  scope: './scope.js',
  widths: [320, 768, 1024, 1440],
  port: 9000,
  openBrowser: true,
  paramType: 'search', // default is 'hash'
  exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
  baseUrl: '/playroom/',
  iframeSandbox: 'allow-scripts',
};
