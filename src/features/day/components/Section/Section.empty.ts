import styled from '@emotion/styled/macro';
import { Box } from '@binarycapsule/ui-capsules';

export const SectionEmpty = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 96,
  color: theme.colors.neutral['300'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.bg,
  fontSize: theme.fontSizes.body,
  transition: 'background-color 0.2s ease',
  border: `1px solid ${theme.colors.neutral['100']}`,
  borderRadius: theme.radii.medium,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.colors.neutral['50'],
  },
}));
