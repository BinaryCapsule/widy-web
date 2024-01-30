import { styled } from 'styled-components';
import { IconButton } from '@binarycapsule/ui-capsules';

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -32,
  left: -4,

  [theme.media.md]: {
    display: 'none',
  },
}));
