import { styled } from '@binarycapsule/ui-capsules';

export const StyledDayButton = styled('div', {
  height: 42,
  borderRadius: '$medium',
  border: '1px solid $neutral200',
  background: '$bg',
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: '$neutral700',
  padding: '0 8px 0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
  position: 'relative',

  '@media (hover: hover)': {
    '&:hover': {
      background: '$primary200',
    },
  },
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  variants: {
    isToday: {
      true: {
        marginTop: '$1',
      },
    },
  },
});

export const StyledInput = styled('input', {
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  height: 0,
  width: 0,

  '&[data-focus-visible-added]:focus': {
    '& ~ .day-button': {
      outline: 'none',
      boxShadow: '0 0 0 4px $colors$primary300',
    },
  },

  '&:checked': {
    '~ .day-button': {
      background: '$primary200',
      color: '$primary800',
      borderColor: '$primary200',

      '&::before': {
        content: '""',
        position: 'absolute',
        height: 24,
        width: 4,
        left: 0,
        top: 8,
        borderRadius: '0 2px 2px 0',
        background: '$primary500',
      },
    },
  },
});
