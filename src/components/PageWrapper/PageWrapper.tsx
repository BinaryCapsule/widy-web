import { styled } from 'styled-components';

export const PageWrapper = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0 32px 32px',
  isolation: 'isolate',
  overflow: 'auto',

  [theme.media.md]: {
    padding: '0 48px 48px',
  },
}));
