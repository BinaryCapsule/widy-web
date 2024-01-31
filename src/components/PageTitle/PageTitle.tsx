import React from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';

interface Props {
  subTitle?: string;
}

export const PageTitle: React.FC<Props> = ({ children, subTitle }) => {
  return (
    <Box>
      <Text as="h1" size="xl" style={{ fontWeight: 500 }}>
        {children}
      </Text>

      {subTitle && (
        <Text as="p" size="md" color="neutral500" style={{ fontWeight: 500 }}>
          {subTitle}
        </Text>
      )}
    </Box>
  );
};
