import React from 'react';
import times from 'lodash/times';
import { Flex } from '@binarycapsule/ui-capsules';
import { DayButtonLoading } from '../DayButton/DayButton.loading';

export const DaysListLoading: React.FC = () => {
  return (
    <Flex direction="column">
      {times(5).map(key => (
        <DayButtonLoading key={key} css={{ my: '$1' }} />
      ))}
    </Flex>
  );
};
