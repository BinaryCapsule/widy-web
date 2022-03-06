import React, { useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { useDaysQuery } from '../../api/useDaysQuery';
import { Button, Flex } from '@binarycapsule/ui-capsules';
import { DayButton } from '../DayButton/DayButton';
import { isToday } from '../../../../utils/dates';
import { DaysListLoading } from './DaysList.loading';
import { DaysListError } from './DaysList.error';

export const DaysList = () => {
  const { dayId } = useParams<{ dayId?: string }>();

  const reportRouteMatch = useRouteMatch('/report');

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useDaysQuery();

  const history = useHistory();

  // Navigate to the first day if the current route does not have a dayId
  useEffect(() => {
    if (isSuccess && data) {
      if (data.pages[0].items.length > 0 && !dayId) {
        history.push(`/day/${data.pages[0].items[0].id}`);
      }
    }
  }, [data, dayId, history, isSuccess]);

  if (isLoading) {
    return <DaysListLoading />;
  }

  if (isError) {
    return <DaysListError onRetry={refetch} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Flex direction="column" css={{ mx: '$5', mb: '$5' }}>
        {data.pages.map(page =>
          page.items.map(({ id, day }) => {
            return (
              <DayButton
                key={id}
                isSelected={dayId === id.toString()}
                isToday={isToday(day)}
                onClick={() => {
                  reportRouteMatch ? history.push(`/report/${id}`) : history.push(`/day/${id}`);
                }}
              >
                {moment(day).format('ddd DD MMM YYYY')}
              </DayButton>
            );
          }),
        )}
      </Flex>

      {hasNextPage && (
        <Flex justify="center" css={{ mt: '$8' }}>
          <Button
            variant="ghostGray"
            size="small"
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more days
          </Button>
        </Flex>
      )}
    </>
  );
};
