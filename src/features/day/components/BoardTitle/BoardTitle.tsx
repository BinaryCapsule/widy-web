import React from 'react';
import { Skeleton } from '@binarycapsule/ui-capsules';
import moment from 'moment';
import { useDayQuery } from '../../api/useDayQuery';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { PageTitle } from '../../../../components/PageTitle/PageTitle';

export const BoardTitle = () => {
  const { data, isLoading, isIdle, isError } = useDayQuery();

  const { dayId } = useDayRouteParams();

  if (isLoading) {
    return <Skeleton isRound width={100} height={16} />;
  }

  if (dayId === 'tomorrow') {
    return <PageTitle subTitle="Plan your next work day">Next</PageTitle>;
  }

  if (isIdle || isError || !data) {
    return <div />;
  }

  const { entities, result } = data;

  const day = entities.day[result];

  const { day: dayString } = day;

  return (
    <PageTitle subTitle={`${moment(dayString).format('MMMM YYYY')}`}>
      {`${moment(dayString).format('dddd DD')}`}
    </PageTitle>
  );
};
