import replace from 'replace-in-files';

// to fix issue: https://github.com/storybookjs/storybook/issues/19546
replace({
  // files: './dist/storybook/**/*.(js|js.map)',
  files: './dist/storybook/vendors~main*.js',
  from: /\.?\/stories.json/g,
  to: '/storybook/stories.json',
}).then(x => console.log('patched storybook build as fix for: https://github.com/storybookjs/storybook/issues/19546'));
