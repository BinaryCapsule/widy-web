import React from 'react';
import styled from '@emotion/styled/macro';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { Sections } from '../Sections/Sections';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 48px 48px;
  height: 100vh;
  overflow: auto;
`;

export const Board = () => {
  return (
    <BoardWrapper as="main">
      <BoardHeader />

      <Sections />
    </BoardWrapper>
  );
};
