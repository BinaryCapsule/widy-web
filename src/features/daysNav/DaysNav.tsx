import React from 'react';
import { CloseButton, DaysNavWrapper } from './DaysNav.styles';
import { DaysNavHeader } from './components/DaysNavHeader/DaysNavHeader';
import { Brand } from './components/Brand/Brand';
import { DaysList } from './components/DaysList/DaysList';
import { NextButton } from './components/NextButton/NextButton';
import { useDaysNavStore } from './stores/daysNavStore';

export const DaysNav: React.FC = () => {
  const isDaysNavOpen = useDaysNavStore(state => state.isOpen);
  const setDaysNavOpen = useDaysNavStore(state => state.setIsOpen);

  return (
    <DaysNavWrapper as="nav" isOpen={isDaysNavOpen}>
      <CloseButton
        icon="x"
        variant="ghostGray"
        size="small"
        onClick={() => setDaysNavOpen(false)}
        aria-label="Close"
      />

      <Brand css={{ mb: '$5' }} />

      <NextButton css={{ mb: '$5' }} />

      <DaysNavHeader css={{ mb: '$5' }} />

      <DaysList />
    </DaysNavWrapper>
  );
};
