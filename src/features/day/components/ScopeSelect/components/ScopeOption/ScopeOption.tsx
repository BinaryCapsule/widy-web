import React from 'react';
import { styled } from 'styled-components';
import { Box, Flex, Text } from '@binarycapsule/ui-capsules';

const OptionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontWeight: 500,
  color: theme.colors.neutral700,
  background: theme.colors.bg,
  height: 'auto',
  padding: 8,

  variants: {
    isFocused: {
      true: {
        background: theme.colors.neutral200,
      },
    },
  },
}));

export const ScopeOption: React.FC<any> = ({ innerProps, isFocused, innerRef, data }) => {
  const { label, shortCode } = data;

  return (
    <OptionWrapper isFocused={isFocused} ref={innerRef} {...innerProps}>
      <Flex $align="baseline" style={{ width: '100%' }}>
        <Flex style={{ flex: 1 }}>
          <Text style={{ marginRight: 4, fontWeight: 500 }}>{label}&nbsp;</Text>
        </Flex>

        <Text variant="smallCaps" style={{ fontWeight: 500, fontSize: '13px' }}>
          {shortCode}
        </Text>
      </Flex>
    </OptionWrapper>
  );
};
