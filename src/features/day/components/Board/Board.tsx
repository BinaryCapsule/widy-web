import React from 'react';
import { styled } from '@binarycapsule/ui-capsules';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { Sections } from '../Sections/Sections';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Tomorrow } from '../Tomorrow/Tomorrow';

export const BoardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0 48px 48px',
  overflow: 'auto',
});

export const Board = () => {
  const { dayId } = useDayRouteParams();

  return (
    <BoardWrapper as="main">
      <BoardHeader />

      {dayId === 'tomorrow' ? <Tomorrow /> : <Sections />}
    </BoardWrapper>
  );
};
