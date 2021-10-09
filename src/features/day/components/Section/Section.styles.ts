import styled from '@emotion/styled/macro';
import { Box } from '@binarycapsule/ui-capsules';

interface SectionHeaderProps {
  isPlan?: boolean;
  hasTasks?: boolean;
}

export const SectionHeader = styled(Box)<SectionHeaderProps>(({ theme, isPlan, hasTasks }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 48,
  borderBottom: isPlan && hasTasks ? `1px solid ${theme.colors.neutral['300']}` : 'none',
}));
