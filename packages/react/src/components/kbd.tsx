import { Fragment } from 'react';

import { styled } from '../lib/stitches';

const Box = styled('div', {
  backgroundColor: 'rgba(255, 255, 255, .08)',
  borderRadius: '$sm',
  font: '$caption',
  fontSize: '$3xs',
  padding: '2px',
  whiteSpace: 'nowrap',
  lineHeight: 'normal',
  minWidth: '$4',
  textAlign: 'center',
});

const Container = styled('kbd', {
  color: 'rgba(255, 255, 255, .5)',
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
  gap: '$1',
});

const replacements: Record<string, string> = {
  mod: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  shift: '⇧',
};

export function Kbd({ shortcut, showPlus = false }: { shortcut: string; showPlus?: boolean }) {
  // default to empty string, it can be null while unmounting a component that still
  // renders a tooltip with shortcut, say for example the drawer close button.
  const keys = (shortcut || '')
    .replace(/\+/g, ' + ')
    .split('')
    .reduce(
      (acc, n) => {
        if (n === ' ') {
          acc.push('');
        } else {
          acc[acc.length - 1] += n;
        }
        return acc;
      },
      [''],
    )
    .filter(showPlus ? Boolean : (x) => x && x !== '+');

  return (
    <Container>
      {keys.map((key, idx) =>
        key === '+' ? <Fragment key={idx}>+</Fragment> : <Box key={idx}>{replacements[key] || key}</Box>,
      )}
    </Container>
  );
}
