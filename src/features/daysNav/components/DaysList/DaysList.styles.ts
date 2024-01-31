import { Box } from '@binarycapsule/ui-capsules';
import { styled } from 'styled-components';

export const DaysListWrapper = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  padding: '0 20px 24px',
  background: theme.colors.neutral100,
}));
