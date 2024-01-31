import { styled } from 'styled-components';
import { IconButton } from '@binarycapsule/ui-capsules';

const sidebarWidth = 360;

interface SidebarWrapperProps {
  $isOpen?: boolean;
}

export const SidebarWrapper = styled('aside')<SidebarWrapperProps>(({ theme, $isOpen }) => ({
  position: 'fixed',
  right: 0,
  height: '100%',
  minWidth: sidebarWidth,
  flex: 1,
  background: theme.colors.yellow50,
  padding: '38px 24px',
  borderLeft: `1px solid ${theme.colors.yellow100}`,
  boxShadow: theme.shadows['500'],
  display: $isOpen ? 'block' : 'none',

  '.darkTheme &': {
    background: theme.colors.neutral100,
    borderLeft: `1px solid ${theme.colors.neutral200}`,
  },

  [theme.media.xl]: {
    position: 'relative',
    right: 'revert',
    transform: 'revert',
    boxShadow: 'revert',
    padding: '38px 32px',
    display: 'block',
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,

  [theme.media.xl]: {
    display: 'none',
  },
}));
