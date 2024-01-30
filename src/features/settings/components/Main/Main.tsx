import { styled } from 'styled-components';

export const Main = styled.main(({ theme }) => ({
  padding: '48px 24px',
  flex: 1,
  overflowY: 'auto',
  position: 'relative',

  [theme.media.sm]: {
    padding: 48,
  },
}));
