import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { DayButtonLoading } from '../DayButton/DayButton.loading';
import { times } from '../../../../utils/misc';

export const DaysListLoading = () => {
  return (
    <Flex direction="column" style={{ padding: '0 20px' }}>
      {times(5).map(key => (
        <DayButtonLoading key={key} style={{ margin: '4px 0' }} />
      ))}
    </Flex>
  );
};
