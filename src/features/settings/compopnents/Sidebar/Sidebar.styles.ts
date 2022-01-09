import { styled } from '@binarycapsule/ui-capsules';

export const StyledSidebar = styled('aside', {
  flex: '1 0 0',
  height: '100%',
  flexShrink: 0,
  background: '$neutral100',
  borderLeft: '1px solid $neutral200',
  position: 'relative',
  display: 'none',

  '@lg': {
    display: 'block',
  },
});
