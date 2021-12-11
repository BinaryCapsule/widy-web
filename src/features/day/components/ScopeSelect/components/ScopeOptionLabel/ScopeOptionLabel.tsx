import React from 'react';
import { Box, Flex, Text, TruncatedText } from '@binarycapsule/ui-capsules';

interface Props {
  label: string;
  shortCode: string;
}

export const ScopeOptionLabel: React.FC<Props> = ({ label, shortCode }) => {
  return (
    <Flex align="baseline" css={{ width: '100%' }}>
      <Box css={{ flex: 1 }}>
        <TruncatedText mr="4">{label}&nbsp;</TruncatedText>
      </Box>

      <Text variant="smallCaps" css={{ mr: '$2' }}>
        {shortCode}
      </Text>
    </Flex>
  );
};
