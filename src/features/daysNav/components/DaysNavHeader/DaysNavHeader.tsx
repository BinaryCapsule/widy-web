import React from 'react';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';
import { CreateDayButton } from './CreateDayButton/CreateDayButton';

export const DaysNavHeader: React.FC<MarginProps> = props => {
  return (
    <Flex justifyContent="space-between" alignItems="center" {...props}>
      <Text as="h1" textTransform="uppercase" fontWeight={600}>
        Days
      </Text>

      <CreateDayButton />
    </Flex>
  );
};
