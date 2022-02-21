import { styled } from '@binarycapsule/ui-capsules';

export const PageWrapper = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0 32px 32px',
  isolation: 'isolate',

  '@md': {
    padding: '0 48px 48px',
  },
});
