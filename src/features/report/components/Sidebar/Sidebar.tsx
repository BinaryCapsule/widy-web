import React from 'react';
import { Flex, IllustratedIcon } from '@binarycapsule/ui-capsules';

export const Sidebar = () => {
  return (
    <Flex align="center" justify="center" css={{ flex: 1, bg: '$yellow50' }}>
      <IllustratedIcon
        icon="pie"
        size={128}
        primaryColor="$yellow100"
        secondaryColor="$yellow100"
      />
    </Flex>
  );
};
