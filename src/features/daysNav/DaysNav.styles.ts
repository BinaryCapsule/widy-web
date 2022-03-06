import { Box, IconButton, styled } from '@binarycapsule/ui-capsules';

export const DaysNavWrapper = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 254,
  height: '100%',
  flexShrink: 0,
  background: '$neutral100',
  boxShadow: '$500',
  zIndex: 2,
  display: 'none',
  flexDirection: 'column',

  '@md': {
    position: 'relative',
    boxShadow: 'revert',
    borderRight: '1px solid $neutral200',
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
  zIndex: 2,

  '@md': {
    display: 'none',
  },
});

export const StickyHeader = styled(Box, {
  position: 'sticky',
  top: 0,
  background: '$neutral100',
  padding: '$5',
  paddingTop: '$8',
});
