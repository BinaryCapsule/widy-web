import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseButton, DaysNavWrapper, StickyHeader } from './DaysNav.styles';
import { DaysNavHeader } from './components/DaysNavHeader/DaysNavHeader';
import { Brand } from './components/Brand/Brand';
import { DaysList } from './components/DaysList/DaysList';
import { NextButton } from './components/NextButton/NextButton';
import { useDaysNavStore } from './stores/daysNavStore';
import { Overlay } from '../../components/Overlay/Overlay';

export const DaysNav = () => {
  const { pathname } = useLocation();

  const isDaysNavOpen = useDaysNavStore(state => state.isOpen);
  const setDaysNavOpen = useDaysNavStore(state => state.setIsOpen);

  useEffect(() => {
    setDaysNavOpen(false);
  }, [pathname, setDaysNavOpen]);

  return (
    <>
      {isDaysNavOpen && (
        <Overlay onClick={() => setDaysNavOpen(false)} css={{ '@md': { display: 'none' } }} />
      )}

      <DaysNavWrapper as="nav" isOpen={isDaysNavOpen}>
        <CloseButton
          icon="x"
          variant="ghostGray"
          size="small"
          onClick={() => setDaysNavOpen(false)}
          aria-label="Close"
        />

        <StickyHeader>
          <Brand css={{ mb: '$5' }} />

          <NextButton css={{ mb: '$5' }} />

          <DaysNavHeader />
        </StickyHeader>

        <DaysList />
      </DaysNavWrapper>
    </>
  );
};
