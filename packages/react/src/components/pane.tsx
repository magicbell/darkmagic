import { ElementRef, forwardRef, ReactNode } from 'react';

import { createSlot, getSlots } from '../lib/slots';
import { CSS, styled } from '../lib/stitches';
import { Flex } from './flex';
import { Typography } from './typography';

const StyledHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  userSelect: 'none',
  flex: 'none',

  variants: {
    noBottomPadding: {
      // negative margin to compensate for bottom border and make bottom borders collapse
      true: { paddingBottom: 0, '& > :last-child': { marginBottom: '-1px' } },
    },

    bottomBorder: {
      true: {
        borderBottom: `1px solid $border-muted`,
      },
    },

    level: {
      1: {},
      2: {},
    },

    spacing: {
      md: { padding: '$6 $6 $8 $6' },
      lg: { padding: '$8 $8 $4 $8' },
    },
  },

  compoundVariants: [
    { noBottomPadding: false, level: 1, spacing: 'md', css: { paddingBottom: '$8' } },
    { noBottomPadding: false, level: 2, spacing: 'md', css: { paddingBottom: '$4' } },
  ],
});

const StyledActions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$2',
  flex: 'none',
});

const StyledBody = styled('div', {
  font: '$body-small',
  color: '$text-default',
  position: 'relative',

  width: '100%',
  flex: 'auto',
  minHeight: 0,

  padding: '$4 $6',

  variants: {
    spacing: {
      md: { padding: '$4 $6' },
      lg: { padding: '0 $8 $8 $8' },
    },
  },
});

const StyledPane = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 'auto',

  [`& > ${StyledBody}`]: {
    color: '$text-default',
  },

  variants: {
    level: {
      1: {
        [`& ${StyledBody}`]: {
          font: '$body-default',
        },
      },
      2: {
        [`& ${StyledBody}`]: {
          font: '$body-small',
        },
      },
    },
  },
});

const Title = createSlot('Title');
const Description = createSlot('Description');
const Body = createSlot('Body');

/**
 * Rendering tabs inside this slot will reduce the amount of padding between the
 * header tabs and the content. Particularly useful in combination with
 * `<Tabs variant="underline">`.
 */
const Tabs = createSlot('Tabs');

type PaneProps = {
  /**
   * The level is used to determine the size and color of text and spacing.
   */
  level?: 1 | 2;

  /**
   * Controls the surrounding padding and space between header and body
   */
  spacing?: 'md' | 'lg';

  /**
   * Set to `true` to show a border between header and content
   */
  divide?: boolean;

  /**
   * The contents to show in the pane.
   */
  children: ReactNode;

  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Root = forwardRef<ElementRef<typeof StyledPane>, PaneProps>(function Pane(
  { children, level = 1, spacing = 'md', divide = false, ...props },
  ref,
) {
  const slots = getSlots(children, {
    title: Title,
    description: Description,
    body: Body,
    actions: StyledActions,
    tabs: Tabs,
  });

  const hasHeader = Boolean(slots.title || slots.description || slots.actions || slots.tabs);

  return (
    <StyledPane level={level} {...props} ref={ref}>
      {hasHeader && (
        <StyledHeader level={level} spacing={spacing} noBottomPadding={Boolean(slots.tabs)} bottomBorder={divide}>
          <Flex gap={6} align="start" justify="between">
            <Flex direction="column" gap={level === 1 ? 2 : 1} flex="auto">
              <Typography as={level === 1 ? 'h1' : 'h2'} variant={level === 1 ? 'h1' : 'h2'} color="default">
                {slots.title}
              </Typography>
              {slots.description ? (
                <Typography variant={level === 1 ? 'default' : 'small'} color={level === 1 ? 'default' : 'muted'}>
                  {slots.description}
                </Typography>
              ) : null}
            </Flex>

            <StyledActions>{slots.actions}</StyledActions>
          </Flex>

          {slots.tabs}
        </StyledHeader>
      )}

      <StyledBody spacing={spacing}>{slots.body}</StyledBody>
      {slots.children}
    </StyledPane>
  );
});

export const Pane = Object.assign(Root, {
  Root,
  Title,
  Description,
  Tabs,
  Actions: StyledActions,
  Body,
});
