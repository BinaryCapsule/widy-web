import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { DaysNav } from '../daysNav/DaysNav';
import { Board } from './Board/Board';
import { Sidebar } from './Sidebar/Sidebar';
import { Ribbon } from '../ribbon/Ribbon';

interface Props {}

export const Day: React.FC<Props> = () => {
  return (
    <Flex height="100%">
      <Ribbon />

      <DaysNav />

      <Board />

      <Sidebar />
    </Flex>
  );
};
