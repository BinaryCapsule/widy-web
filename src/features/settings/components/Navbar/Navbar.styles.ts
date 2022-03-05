import { IconButton, styled } from '@binarycapsule/ui-capsules';
import { NavLink } from 'react-router-dom';

export const StyledNavbar = styled('div', {
  position: 'fixed',
  width: 254,
  height: '100%',
  flexShrink: 0,
  padding: '48px 24px 24px',
  background: '$neutral100',
  borderRight: '1px solid $neutral200',
  display: 'none',
  flexDirection: 'column',
  zIndex: 1,
  boxShadow: '$500',

  '@md': {
    position: 'relative',
    right: 'revert',
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

export const NavHeading = styled('h2', {
  color: '$neutral600',
  fontSize: '$md',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginTop: 24,
});

export const NavItems = styled('ul', {
  margin: '12px 0 16px -12px',
  listStyleType: 'none',
  paddingLeft: 0,
});

export const StyledNavLink = styled(NavLink, {
  display: 'inline-block',
  padding: '$2 $3',
  width: '100%',
  position: 'relative',
  fontWeight: 500,
  borderRadius: '4px',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  height: 36,

  '&.active': {
    background: '$primary200',
    color: '$primary700',
  },

  '&:hover': {
    background: '$primary200',
  },

  '&.active::before': {
    content: '""',
    position: 'absolute',
    height: 20,
    width: 4,
    left: 0,
    top: 8,
    borderRadius: '0 2px 2px 0',
    background: '$primary500',
  },

  '&[data-focus-visible-added]:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '$colors$primary500',
    outlineOffset: '-1px',
    zIndex: 1,
  },
});

export const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: 12,
  right: 12,

  '@md': {
    display: 'none',
  },
});
