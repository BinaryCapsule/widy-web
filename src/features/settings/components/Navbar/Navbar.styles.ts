import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { IconButton } from '@binarycapsule/ui-capsules';

interface StyledNavbarProps {
  $isOpen: boolean;
}

export const StyledNavbar = styled.div<StyledNavbarProps>(({ theme, $isOpen }) => ({
  position: 'fixed',
  width: 254,
  height: '100%',
  flexShrink: 0,
  padding: '48px 24px 24px',
  background: theme.colors.neutral100,
  display: $isOpen ? 'flex' : 'none',
  flexDirection: 'column',
  zIndex: 1,
  boxShadow: theme.shadows['500'],

  [theme.media.md]: {
    position: 'relative',
    boxShadow: 'revert',
    display: 'flex',
    borderRight: `1px solid ${theme.colors.neutral200}`,
  },
}));

export const NavHeading = styled.h2(({ theme }) => ({
  color: theme.colors.neutral600,
  fontSize: theme.fontSizes.md,
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginTop: 24,
}));

export const NavItems = styled.ul({
  margin: '12px 0 16px -12px',
  listStyleType: 'none',
  paddingLeft: 0,
});

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-block',
  padding: '8px 12px',
  width: '100%',
  position: 'relative',
  fontWeight: 500,
  borderRadius: '4px',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  height: 36,

  '&.active': {
    background: theme.colors.primary200,
    color: theme.colors.primary700,
  },

  '&:hover': {
    background: theme.colors.primary200,
  },

  '&.active::before': {
    content: '""',
    position: 'absolute',
    height: 20,
    width: 4,
    left: 0,
    top: 8,
    borderRadius: '0 2px 2px 0',
    background: theme.colors.primary500,
  },

  '&[data-focus-visible-added]:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: theme.colors.primary500,
    outlineOffset: '-1px',
    zIndex: 1,
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,

  [theme.media.md]: {
    display: 'none',
  },
}));
