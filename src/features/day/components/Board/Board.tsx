import React from 'react';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { Sections } from '../Sections/Sections';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Tomorrow } from '../Tomorrow/Tomorrow';
import { PageWrapper } from '../../../../components/PageWrapper/PageWrapper';

export const Board = () => {
  const { dayId } = useDayRouteParams();

  return (
    <PageWrapper>
      <BoardHeader />

      {dayId === 'tomorrow' ? <Tomorrow /> : <Sections />}
    </PageWrapper>
  );
};
