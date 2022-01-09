import { Box, styled } from '@binarycapsule/ui-capsules';

export const SectionEmpty = styled(Box, {
  width: '100%',
  height: 96,
  color: '$neutral700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$bg',
  fontSize: '$2',
  transition: 'background-color 0.2s ease',
  border: '1px solid $neutral200',
  background: '$neutral100',
  borderRadius: '$medium',
  userSelect: 'none',
});
