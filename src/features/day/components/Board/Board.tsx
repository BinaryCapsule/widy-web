import React from 'react';
import styled from '@emotion/styled/macro';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { Sections } from '../Sections/Sections';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Tomorrow } from '../Tomorrow/Tomorrow';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 48px 48px;
  height: 100vh;
  overflow: auto;
`;

export const Board = () => {
  const { dayId } = useDayRouteParams();

  return (
    <BoardWrapper as="main">
      <BoardHeader />

      {dayId === 'tomorrow' ? <Tomorrow /> : <Sections />}
    </BoardWrapper>
  );
};
