import { darkTheme, styled } from '@binarycapsule/ui-capsules';

export const StyledTomorrowButton = styled('button', {
  height: 32,
  borderRadius: '$medium',
  border: '1px dashed $secondary200',
  background: '$bg',
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: '$secondary700',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
  position: 'relative',

  '&:hover': {
    border: '1px dashed $secondary700',

    [`.${darkTheme} &`]: {
      border: '1px dashed $secondary500',
    },
  },

  variants: {
    isSelected: {
      true: {
        background: '$secondary50',

        '&::before': {
          content: '""',
          position: 'absolute',
          height: 18,
          width: 4,
          left: 0,
          top: 6,
          borderRadius: '0 2px 2px 0',
          background: '$secondary500',
        },
      },
    },
  },
});
