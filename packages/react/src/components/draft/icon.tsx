import { ComponentProps, styled } from '../../lib/stitches';

const StyledIcon = styled('div', {
  font: '$caption',
  color: '$text-default',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  textTransform: 'uppercase',
  userSelect: 'none',

  defaultVariants: {
    size: 'md',
    variant: 'circle',
  },

  variants: {
    size: {
      sm: {
        height: '$8',
        width: '$8',
      },
      md: {
        height: '$10',
        width: '$10',
      },
      lg: {
        height: '$12',
        width: '$12',
      },
    },

    variant: {
      circle: { borderRadius: '$full' },
      square: { borderRadius: '$lg' },
    },

    color: {
      1: {
        border: '1px solid $accent-1-text',
      },
      2: {
        border: '1px solid $accent-2-text',
      },
      3: {
        border: '1px solid $accent-3-text',
      },
    },
  },
});

type StyledIconProps = ComponentProps<typeof StyledIcon>;
type IconProps = {
  children: string | string[];
  variant?: StyledIconProps['variant'];
  size?: StyledIconProps['size'];
  color?: StyledIconProps['color'];
};

export function Icon({ children, ...props }: IconProps) {
  const letters = String(Array.isArray(children) ? children.join('') : children)
    .replace(/[^a-zA-Z ]/g, '')
    .split(/(?=[A-Z])| /) // split on capital letters and spaces
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

  return <StyledIcon {...props}>{letters}</StyledIcon>;
}
