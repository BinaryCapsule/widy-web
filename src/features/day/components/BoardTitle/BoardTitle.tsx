import React from 'react';
import { Flex, Skeleton, Text } from '@binarycapsule/ui-capsules';
import moment from 'moment';
import { useDayQuery } from '../../api/useDayQuery';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const BoardTitle = () => {
  const { data, isLoading, isIdle, isError } = useDayQuery();

  const { dayId } = useDayRouteParams();

  if (isLoading) {
    return (
      <Skeleton
        circular
        css={{
          height: 16,
          width: 100,
        }}
      />
    );
  }

  if (dayId === 'tomorrow') {
    return (
      <Text as="h1" size={5} css={{ fontWeight: 500 }}>
        Tomorrow
      </Text>
    );
  }

  if (isIdle || isError || !data) {
    return <div />;
  }

  const { entities, result } = data;

  const day = entities.day[result];

  const { day: dayString } = day;

  return (
    <Flex align="baseline">
      <Text size={5} css={{ fontWeight: 500, mr: '$1' }}>
        {`${moment(dayString).format('ddd DD')}`}
      </Text>
      <Text>{`${moment(dayString).format('MMM YYYY')}`}</Text>
    </Flex>
  );
};
