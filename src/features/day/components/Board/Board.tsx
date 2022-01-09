import React from 'react';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { Sections } from '../Sections/Sections';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Next } from '../Next/Next';
import { PageWrapper } from '../../../../components/PageWrapper/PageWrapper';

export const Board = () => {
  const { dayId } = useDayRouteParams();

  return (
    <PageWrapper>
      <BoardHeader />

      {dayId === 'tomorrow' ? <Next /> : <Sections />}
    </PageWrapper>
  );
};
