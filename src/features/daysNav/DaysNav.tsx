import React from 'react';
import { DaysNavWrapper } from './DaysNav.styles';
import { DaysNavHeader } from './components/DaysNavHeader/DaysNavHeader';
import { Brand } from './components/Brand/Brand';
import { DaysList } from './components/DaysList/DaysList';

export const DaysNav: React.FC = () => {
  return (
    <DaysNavWrapper>
      <Brand mb="24" />

      <DaysNavHeader mb="24" />

      <DaysList />
    </DaysNavWrapper>
  );
};
