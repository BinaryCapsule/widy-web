import React from 'react';
import { DaysNavWrapper } from './DaysNav.styles';
import { DaysNavHeader } from './components/DaysNavHeader/DaysNavHeader';
import { Brand } from './components/Brand/Brand';
import { DaysList } from './components/DaysList/DaysList';
import { NextButton } from './components/NextButton/NextButton';

export const DaysNav: React.FC = () => {
  return (
    <DaysNavWrapper as="nav">
      <Brand css={{ mb: '$5' }} />

      <NextButton css={{ mb: '$5' }} />

      <DaysNavHeader css={{ mb: '$5' }} />

      <DaysList />
    </DaysNavWrapper>
  );
};
