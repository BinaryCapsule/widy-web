import React from 'react';
import { DaysNavWrapper } from './DaysNav.styles';
import { DaysNavHeader } from './components/DaysNavHeader/DaysNavHeader';
import { Brand } from './components/Brand/Brand';
import { DaysList } from './components/DaysList/DaysList';
import { TomorrowButton } from './components/TomorrowButton/TomorrowButton';

export const DaysNav: React.FC = () => {
  return (
    <DaysNavWrapper as="nav">
      <Brand mb="24" />

      <TomorrowButton mb="24" />

      <DaysNavHeader mb="24" />

      <DaysList />
    </DaysNavWrapper>
  );
};
