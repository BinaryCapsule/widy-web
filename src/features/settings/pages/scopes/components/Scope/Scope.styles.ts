import { Flex, styled } from '@binarycapsule/ui-capsules';

export const ScopeContainer = styled(Flex, {
  padding: '$4',

  '&:nth-child(odd)': {
    background: '$neutral100',
  },
});
