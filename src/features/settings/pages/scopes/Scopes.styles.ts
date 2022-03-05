import { styled } from '@binarycapsule/ui-capsules';

export const Actions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  my: '$6',
  gap: '$4',
  alignItems: 'stretch',

  '@sm': {
    flexDirection: 'row',
  },
});
