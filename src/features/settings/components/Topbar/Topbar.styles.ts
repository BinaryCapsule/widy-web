import { IconButton, styled } from '@binarycapsule/ui-capsules';

export const MenuButton = styled(IconButton, {
  position: 'absolute',
  top: -32,
  left: -4,

  '@md': {
    display: 'none',
  },
});
