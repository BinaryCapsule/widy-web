import { darkTheme, IconButton, styled } from '@binarycapsule/ui-capsules';

const sidebarWidth = 360;

export const SidebarWrapper = styled('aside', {
  position: 'fixed',
  right: 0,
  height: '100%',
  minWidth: sidebarWidth,
  flex: 1,
  background: '$yellow50',
  padding: '38px 32px',
  borderLeft: '1px solid $yellow100',
  boxShadow: '$500',
  transition: 'transform 0.2s cubic-bezier(0, 0.52, 0, 1)',
  transform: `translateX(${sidebarWidth}px)`,

  [`.${darkTheme} &`]: {
    background: '$neutral100',
    borderLeft: '1px solid $neutral200',
  },

  '@xl': {
    position: 'relative',
    right: 'revert',
    transform: 'revert',
  },

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0px)',
      },
    },
  },
});

export const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: 12,
  right: 12,

  '@xl': {
    display: 'none',
  },
});
