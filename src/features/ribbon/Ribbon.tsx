import React from 'react';
import { Box } from '@binarycapsule/ui-capsules';
import { useRibbon } from './useRibbon';

export const Ribbon = () => {
  const { isActive } = useRibbon();

  return (
    <Box
      css={{
        width: 12,
        height: '100%',
        bg: isActive ? '$yellow400' : '$neutral500',
        flexShrink: 0,
      }}
    />
  );
};
