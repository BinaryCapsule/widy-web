import React from 'react';
import { Box, Flex, Text } from '@binarycapsule/ui-capsules';

interface Props {
  label: string;
  shortCode: string;
}

export const ScopeOptionLabel: React.FC<Props> = ({ label, shortCode }) => {
  return (
    <Flex alignItems="baseline" width="100%">
      <Box flex={1}>
        <Text>{label}&nbsp;</Text>
      </Box>

      <Text variant="smallCaps">{shortCode}</Text>
    </Flex>
  );
};
