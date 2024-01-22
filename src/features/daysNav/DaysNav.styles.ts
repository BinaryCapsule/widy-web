import { styled } from 'styled-components';
import { Box, IconButton } from '@binarycapsule/ui-capsules';

interface DaysNavWrapperProps {
  $isOpen: boolean;
}

export const DaysNavWrapper = styled.div<DaysNavWrapperProps>(({ theme, $isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 254,
  height: '100%',
  flexShrink: 0,
  background: theme.colors.neutral100,
  boxShadow: theme.shadows['500'],
  zIndex: 2,
  display: $isOpen ? 'flex' : 'none',
  flexDirection: 'column',

  [theme.media.md]: {
    position: 'relative',
    boxShadow: 'revert',
    borderRight: `1px solid ${theme.colors.neutral200}`,
    display: 'flex',
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  zIndex: 2,

  [theme.media.md]: {
    display: 'none',
  },
}));

export const StickyHeader = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  background: theme.colors.neutral100,
  padding: 20,
  paddingTop: 32,
}));
