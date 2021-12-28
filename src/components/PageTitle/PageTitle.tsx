import React from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';

interface Props {
  subTitle?: string;
}

export const PageTitle: React.FC<Props> = ({ children, subTitle }) => {
  return (
    <Box>
      <Text as="h1" size={4} css={{ fontWeight: 500 }}>
        {children}
      </Text>

      {subTitle && (
        <Text as="p" size={2} css={{ fontWeight: 500, color: '$neutral500' }}>
          {subTitle}
        </Text>
      )}
    </Box>
  );
};
