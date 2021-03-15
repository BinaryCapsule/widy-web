import React from 'react';
import times from 'lodash/times';
import { Flex } from '@binarycapsule/ui-capsules';
import { DayButtonLoading } from '../DayButton/DayButton.loading';

export const DaysListLoading: React.FC = () => {
  return (
    <Flex flexDirection="column">
      {times(5).map(key => (
        <DayButtonLoading key={key} my="4" />
      ))}
    </Flex>
  );
};
