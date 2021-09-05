import React from 'react';
import { Box, Flex, Text, TruncatedText } from '@binarycapsule/ui-capsules';

interface Props {
  label: string;
  shortCode: string;
}

export const ScopeOptionLabel: React.FC<Props> = ({ label, shortCode }) => {
  return (
    <Flex alignItems="baseline" width="100%">
      <Box flex={1}>
        <TruncatedText mr="4">{label}&nbsp;</TruncatedText>
      </Box>

      <Text variant="smallCaps" mr="8">
        {shortCode}
      </Text>
    </Flex>
  );
};
