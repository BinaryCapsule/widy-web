import React from 'react';
import { Text } from '@binarycapsule/ui-capsules';

export const ScopeCode: React.FC = ({ children }) => {
  return (
    <Text variant="smallCaps" style={{ fontWeight: 500, fontSize: '13px', marginRight: 12 }}>
      {children}
    </Text>
  );
};
