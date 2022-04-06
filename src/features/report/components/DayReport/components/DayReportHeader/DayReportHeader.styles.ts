import { IconButton, styled } from '@binarycapsule/ui-capsules';

export const MenuButton = styled(IconButton, {
  position: 'absolute',
  top: 16,
  left: 22,

  '@md': {
    display: 'none',
  },
});
