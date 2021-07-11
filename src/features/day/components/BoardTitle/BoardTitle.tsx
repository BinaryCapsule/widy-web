import React from 'react';
import { Flex, Skeleton, Text } from '@binarycapsule/ui-capsules';
import moment from 'moment';
import { useDayQuery } from '../../api/useDayQuery';

export const BoardTitle = () => {
  const { data, isLoading, isIdle, isError } = useDayQuery();

  if (isLoading) {
    return (
      <Skeleton height={16} width={100} circular />
    )
  }

  if (isIdle || isError || !data) {
    return null;
  }

  const { entities, result } = data;

  const day = entities.day[result];

  const { day: dayString } = day;

  return (
    <Flex alignItems="baseline">
      <Text fontSize="h5" fontWeight={500} mr="4">
        {`${moment(dayString).format('ddd DD')}`}
      </Text>
      <Text>
        {`${moment(dayString).format('MMM YYYY')}`}
      </Text>
    </Flex>
  );
};
