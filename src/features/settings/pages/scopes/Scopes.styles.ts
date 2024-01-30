import { styled } from 'styled-components';

export const Actions = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '24px 0',
  gap: 16,
  alignItems: 'stretch',

  [theme.media.sm]: {
    flexDirection: 'row',
  },
}));
