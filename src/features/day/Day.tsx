import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { DaysNav } from '../daysNav/DaysNav';
import { Board } from './components/Board/Board';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Ribbon } from '../ribbon/Ribbon';
import { useDay } from './useDay';

const Day = () => {
  useDay();

  return (
    <Flex css={{ height: '100%' }}>
      <Ribbon />

      <DaysNav />

      <Board />

      <Sidebar />
    </Flex>
  );
};

export default Day;
