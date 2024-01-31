import { styled } from 'styled-components';

export const StyledSidebar = styled.aside(({ theme }) => ({
  flex: '1 0 0',
  height: '100%',
  flexShrink: 0,
  background: theme.colors.neutral100,
  borderLeft: `1px solid ${theme.colors.neutral200}`,
  position: 'relative',
  display: 'none',

  [theme.media.xl]: {
    display: 'block',
  },
}));
