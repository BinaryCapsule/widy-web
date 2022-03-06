import { styled } from '@binarycapsule/ui-capsules';

export const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  backgroundColor: 'rgba(60, 63, 75, 0.65)',
  backdropFilter: 'blur(4px)',
});
