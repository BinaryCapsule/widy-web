import { IconButton, styled } from '@binarycapsule/ui-capsules';

export const MenuButton = styled(IconButton, {
  position: 'absolute',
  top: 12,
  left: 0,

  '@md': {
    display: 'none',
  },
});
