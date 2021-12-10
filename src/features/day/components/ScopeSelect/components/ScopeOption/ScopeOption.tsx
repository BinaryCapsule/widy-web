import React from 'react';
import { Box, Flex, Text, styled } from '@binarycapsule/ui-capsules';

const OptionWrapper = styled(Box, {
  display: 'flex',
  cursor: 'pointer',
  fontWeight: 500,
  color: '$neutral700',
  background: 'bg',
  height: 'auto',
  padding: 8,

  variants: {
    isFocused: {
      true: {
        background: '$neutral200',
      },
    },
  },
});

export const ScopeOption: React.FC<any> = ({ innerProps, isFocused, innerRef, data }) => {
  const { label, shortCode } = data;

  return (
    <OptionWrapper isFocused={isFocused} ref={innerRef} {...innerProps}>
      <Flex align="baseline" css={{ width: '100%' }}>
        <Flex css={{ flex: 1 }}>
          <Text css={{ mr: '$1' }}>{label}&nbsp;</Text>
        </Flex>

        <Text variant="smallCaps">{shortCode}</Text>
      </Flex>
    </OptionWrapper>
  );
};
