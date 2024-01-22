import { styled } from 'styled-components';
import { Box } from '@binarycapsule/ui-capsules';

export const SectionEmpty = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 96,
  color: theme.colors.neutral500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.bg,
  fontSize: '$md',
  transition: 'background-color 0.2s ease',
  border: `1px solid ${theme.colors.neutral200}`,
  background: theme.colors.neutral100,
  borderRadius: theme.radii.medium,
  userSelect: 'none',
}));
