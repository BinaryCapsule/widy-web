import { styled } from 'styled-components';

export const StyledButton = styled.button(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 4,
  borderRadius: theme.radii.full,
  gap: 4,

  '&:hover': {
    bg: theme.colors.neutral200,
  },

  '&[data-reach-menu-button][aria-expanded="true"]': {
    bg: theme.colors.neutral200,
  },

  '&:focus': {
    outlineColor: theme.colors.primary500,
    outlineOffset: '3px',
  },
}));
