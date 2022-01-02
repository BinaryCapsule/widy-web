import { styled } from '@binarycapsule/ui-capsules';

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  padding: '$1',
  borderRadius: '$full',
  gap: 4,

  '&:hover': {
    bg: '$neutral200',
  },

  '&[data-reach-menu-button][aria-expanded="true"]': {
    bg: '$neutral200',
  },
});
