import React from 'react';
import { Box, Flex } from '@binarycapsule/ui-capsules';
import { DaysNav } from '../daysNav/DaysNav';
import { Ribbon } from '../ribbon/Ribbon';
import { DayReport } from './components/DayReport/DayReport';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

const Report = () => {
  return (
    <Flex css={{ height: '100%', minWidth: 1400 }}>
      <Ribbon />

      <DaysNav />

      <PageWrapper>
        <DayReport />
      </PageWrapper>

      <Box css={{ flex: 1, bg: '$yellow50' }}>TODO</Box>
    </Flex>
  );
};

export default Report;
