import { styled } from 'styled-components';
import { Flex } from '@binarycapsule/ui-capsules';

export const ScopeContainer = styled(Flex)(({ theme }) => ({
  padding: 16,
  alignItems: 'center',

  '&:nth-child(odd)': {
    background: theme.colors.neutral100,
  },
}));
