import { CheckIcon, ClipboardIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { writeToClipboard } from '../lib/dom.js';
import { Button } from './button.js';
import { Grid } from './grid.js';
import { IconButton } from './icon-button.js';

type CopyButtonProps = {
  value: string;
  onCopied?: () => void;
  variant?: 'icon' | 'text';
};

export function CopyButton({ value, onCopied, variant = 'icon' }: CopyButtonProps) {
  const [state, setState] = React.useState('initial');

  React.useEffect(() => {
    if (state === 'initial') return;
    const timeout = setTimeout(() => setState('initial'), 1500);
    return () => clearTimeout(timeout);
  }, [state]);

  const handleClick = async () => {
    setState('copied');
    await writeToClipboard(value);
    onCopied?.();
  };

  const icon = state === 'copied' ? CheckIcon : ClipboardIcon;
  const css = state === 'copied' ? { color: '$text-success' } : undefined;

  return variant === 'text' ? (
    <Button variant="link" size="sm" onClick={handleClick}>
      <Grid cols={1} spacing="none">
        <Grid.Cell rowStart={1} colStart={1} css={{ justifyContent: 'center', opacity: state === 'copied' ? 0 : 1 }}>
          Copy
        </Grid.Cell>
        <Grid.Cell
          rowStart={1}
          colStart={1}
          css={{ color: '$text-success', justifyContent: 'center', opacity: state === 'copied' ? 1 : 0 }}
        >
          <CheckIcon />
        </Grid.Cell>
      </Grid>
    </Button>
  ) : (
    <IconButton css={css} onClick={handleClick} label="copy to clipboard" size="md" variant="ghost" icon={icon} />
  );
}
