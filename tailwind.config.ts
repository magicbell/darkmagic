import type { Config } from 'tailwindcss';

export default {
  content: ['packages/react/**/*.tsx'],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
