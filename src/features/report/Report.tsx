import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { DaysNav } from '../daysNav/DaysNav';
import { Ribbon } from '../ribbon/Ribbon';
import { DayReport } from './components/DayReport/DayReport';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { Sidebar } from './components/Sidebar/Sidebar';

const Report = () => {
  return (
    <Flex style={{ height: '100%' }}>
      <Ribbon />

      <DaysNav />

      <PageWrapper>
        <DayReport />
      </PageWrapper>

      <Sidebar />
    </Flex>
  );
};

export default Report;
