import { styled } from '@binarycapsule/ui-capsules';
import { NavLink } from 'react-router-dom';

export const NavBarStyles = styled('div', {
  width: 254,
  height: '100%',
  flexShrink: 0,
  padding: '48px 24px 24px',
  background: '$neutral100',
  borderRight: '1px solid $neutral200',
  display: 'flex',
  flexDirection: 'column',
});

export const NavHeading = styled('h2', {
  color: '$neutral600',
  fontSize: '$sm',
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
    top: 10,
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
