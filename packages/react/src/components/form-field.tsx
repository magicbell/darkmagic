import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useId } from '@radix-ui/react-id';
import { cloneElement, ElementRef, forwardRef } from 'react';
import { isElement } from 'react-is';

import { ComponentProps, styled } from '../lib/stitches';
import { Flex } from './flex';
import { IconButton } from './icon-button';
import { Label } from './label';
import { RequiredBadge } from './required-badge';

type StyledFormFieldProps = ComponentProps<typeof StyledFormField>;
const StyledFormField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3xs',
});

const StyledHint = styled('div', {
  font: '$body-small',
  color: '$text-muted',
});

const StyledError = styled('div', {
  font: '$body-small-bold',
  color: '$text-error',
});

type FormFieldProps = {
  label?: string;
  required?: boolean;
  tooltip?: string;
  leadingHint?: string;
  trailingHint?: string;
  leadingError?: string;
  trailingError?: string;
  state?: 'initial' | 'invalid';
} & StyledFormFieldProps;

export const FormField = forwardRef<ElementRef<typeof StyledFormField>, FormFieldProps>(function FormField(
  {
    children,
    required,
    tooltip,
    state = 'default',
    label,
    leadingHint,
    leadingError,
    trailingHint,
    trailingError,
    id: providedId,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = providedId || generatedId;

  const leadingId = leadingError ? `${id}-leading-error` : leadingHint ? `${id}-leading-hint` : undefined;
  const trailingId = trailingError ? `${id}-trailing-error` : trailingHint ? `${id}-trailing-hint` : undefined;
  const describedBy = [leadingId, trailingId].filter(Boolean).join(' ');

  return (
    <StyledFormField {...props} ref={ref}>
      {label && (
        <Flex gap={1}>
          <Label htmlFor={id}>{label}</Label>
          {required && <RequiredBadge />}
          {tooltip && <IconButton label="show tooltip" variant="inline" icon={QuestionMarkCircledIcon} />}
        </Flex>
      )}
      {leadingError ? (
        <StyledError id={leadingId} role="alert">
          {leadingError}
        </StyledError>
      ) : leadingHint ? (
        <StyledHint id={leadingId}>{leadingHint}</StyledHint>
      ) : null}

      {isElement(children)
        ? cloneElement(children, { required, state, tooltip, id, 'aria-describedby': describedBy, ...children.props })
        : children}

      {trailingError ? (
        <StyledError id={trailingId} role="alert">
          {trailingError}
        </StyledError>
      ) : trailingHint ? (
        <StyledHint id={trailingId}>{trailingHint}</StyledHint>
      ) : null}
    </StyledFormField>
  );
});
