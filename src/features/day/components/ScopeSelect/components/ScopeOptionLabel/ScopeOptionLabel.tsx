import React from 'react';
import { Box, Flex, Text, TruncatedText } from '@binarycapsule/ui-capsules';

interface Props {
  label: string;
  shortCode: string;
}

export const ScopeOptionLabel: React.FC<Props> = ({ label, shortCode }) => {
  return (
    <Flex align="baseline" style={{ width: '100%' }}>
      <Box style={{ flex: 1 }}>
        <TruncatedText mr="4">{label}&nbsp;</TruncatedText>
      </Box>

      <Text variant="smallCaps" style={{ fontWeight: 500, fontSize: '13px' }}>
        {shortCode}
      </Text>
    </Flex>
  );
};
