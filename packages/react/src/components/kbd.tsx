import { Fragment } from 'react';

import { styled } from '../lib/stitches';

const Box = styled('div', {
  backgroundColor: 'rgba(255, 255, 255, .08)',
  borderRadius: '$sm',
  font: '$mono',
  fontSize: '$xxs',
  padding: '1px 4px',
  margin: '-2px 2px',
  whiteSpace: 'nowrap',
  lineHeight: 'normal',
});

const Container = styled('kbd', {
  color: 'rgba(255, 255, 255, .5)',
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
});

export function Kbd({ shortcut }: { shortcut: string }) {
  // default to empty string, it can be null while unmounting a component that still
  // renders a tooltip with shortcut, say for example the drawer close button.
  const keys = (shortcut || '').split(' ');

  return (
    <Container>
      {keys.map((key, idx) =>
        idx === 0 ? (
          <Box key={idx}>{key}</Box>
        ) : (
          <Fragment key={idx}>
            + <Box key={idx}>{key}</Box>
          </Fragment>
        ),
      )}
    </Container>
  );
}
