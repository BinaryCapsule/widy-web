import { styled } from '@binarycapsule/ui-capsules';

export const StyledTomorrowButton = styled('button', {
  height: 32,
  borderRadius: '$medium',
  border: '1px dashed $pink200',
  background: '$bg',
  fontSize: '13px',
  fontWeight: 500,
  color: '$pink700',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
  position: 'relative',

  '&:hover': {
    border: '1px dashed $pink700',
  },

  variants: {
    isSelected: {
      true: {
        background: '$pink50',

        '&::before': {
          content: '""',
          position: 'absolute',
          height: 18,
          width: 4,
          left: 0,
          top: 6,
          borderRadius: '0 2px 2px 0',
          background: '$pink500',
        },
      },
    },
  },
});
