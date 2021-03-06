import React from 'react';
import { Flex, styled } from '@binarycapsule/ui-capsules';

const Wrapper = styled('header', {
  paddingTop: 48,
  position: 'sticky',
  alignItems: 'center',
  background: '$bg',
  top: 0,
  zIndex: 1,
  marginLeft: -4,
  marginRight: -4,
  paddingLeft: 4,
  paddingRight: 4,
});

export const PageHeader: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Flex align="start" justify="between">
        {children}
      </Flex>
    </Wrapper>
  );
};
