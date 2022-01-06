import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { DayButtonLoading } from '../DayButton/DayButton.loading';
import { times } from '../../../../utils/misc';

export const DaysListLoading: React.FC = () => {
  return (
    <Flex direction="column">
      {times(5).map(key => (
        <DayButtonLoading key={key} css={{ my: '$1' }} />
      ))}
    </Flex>
  );
};
