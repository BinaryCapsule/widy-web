import React from 'react';
import styled from '@emotion/styled';
import { Box, BoxProps, Flex, Text } from '@binarycapsule/ui-capsules';

interface OptionWrapperProps extends BoxProps {
  isFocused: boolean;
}

const OptionWrapper = styled(Box)<OptionWrapperProps>(({ isFocused, theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontWeight: theme.fontWeights['500'],
  color: theme.colors.neutral['700'],
  background: isFocused ? theme.colors.neutral['200'] : theme.colors.bg,
  height: 'auto',
}));

export const ScopeOption: React.FC<any> = ({ innerProps, isFocused, innerRef, data }) => {
  const { label, shortCode } = data;

  return (
    <OptionWrapper height="32px" p="8" isFocused={isFocused} ref={innerRef} {...innerProps}>
      <Flex alignItems="baseline" width="100%">
        <Box flex={1}>
          <Text mr="4">{label}&nbsp;</Text>
        </Box>

        <Text variant="smallCaps">{shortCode}</Text>
      </Flex>
    </OptionWrapper>
  );
};
