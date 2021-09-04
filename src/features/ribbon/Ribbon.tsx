import React from 'react';
import { Box } from '@binarycapsule/ui-capsules';
import { useRibbon } from './useRibbon';

export const Ribbon: React.FC = () => {
  const { isActive } = useRibbon();

  return (
    <Box width={12} bg={isActive ? 'yellow.400' : 'neutral.500'} height="100%" flexShrink={0} />
  );
};
