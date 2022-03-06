import { Box, IconButton, styled } from '@binarycapsule/ui-capsules';

export const DaysNavWrapper = styled('div', {
  position: 'fixed',
  width: 254,
  height: '100%',
  flexShrink: 0,
  background: '$neutral100',
  borderRight: '1px solid $neutral200',
  boxShadow: '$500',
  zIndex: 1,
  display: 'none',
  flexDirection: 'column',
  overflowY: 'auto',

  '@md': {
    position: 'relative',
    boxShadow: 'revert',
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
  zIndex: 1,
  background: '$neutral100',
  padding: '$5',
  paddingTop: '$8',
});
