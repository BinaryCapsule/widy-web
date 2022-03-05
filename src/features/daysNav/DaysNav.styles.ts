import { IconButton, styled } from '@binarycapsule/ui-capsules';

export const DaysNavWrapper = styled('div', {
  position: 'fixed',
  width: 254,
  height: '100%',
  flexShrink: 0,
  padding: '48px 24px 24px',
  background: '$neutral100',
  borderRight: '1px solid $neutral200',
  boxShadow: '$500',
  zIndex: 1,
  display: 'none',
  flexDirection: 'column',

  '@md': {
    position: 'relative',
    right: 'revert',
    transform: 'revert',
    display: 'flex',
  },

  variants: {
    isOpen: {
      true: {
        display: 'flex',
      },
    },
  },
});

export const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: 12,
  right: 12,

  '@md': {
    display: 'none',
  },
});
