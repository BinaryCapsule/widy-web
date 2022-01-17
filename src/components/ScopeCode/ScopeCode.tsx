import React from 'react';
import { Text } from '@binarycapsule/ui-capsules';

export const ScopeCode: React.FC = ({ children }) => {
  return (
    <Text variant="smallCaps" css={{ fontWeight: 500, fontSize: '13px', mr: '$3' }}>
      {children}
    </Text>
  );
};
