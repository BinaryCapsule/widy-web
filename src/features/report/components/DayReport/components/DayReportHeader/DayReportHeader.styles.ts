import { styled } from 'styled-components';
import { IconButton } from '@binarycapsule/ui-capsules';

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 0,

  [theme.media.md]: {
    display: 'none',
  },
}));
