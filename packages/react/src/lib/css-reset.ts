// reset from https://www.joshwcomeau.com/css/custom-css-reset
export const cssReset = {
  // Use a more-intuitive box-sizing model.
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  // Remove default margin
  '*': {
    margin: 0,
  },

  // Allow percentage-based heights in the application
  'html, body, #root, #__next': {
    height: '100%',
  },

  // Accessible line-height & Improve text rendering
  body: {
    lineHeight: 1.5,
    fontSmoothing: 'antialiased',
  },

  a: {
    color: '$text-default',
    textDecoration: 'none',
    cursor: 'pointer !important',
  },

  // Improve media defaults
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },

  // Remove built-in form typography styles
  'input, button, textarea, select': {
    font: 'inherit',
  },

  // Avoid text overflows
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },

  // Create a root stacking context
  '#root, #__next': {
    isolation: 'isolate',
  },
};
