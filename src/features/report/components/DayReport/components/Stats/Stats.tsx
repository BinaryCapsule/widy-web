import React from 'react';
import { Card as BaseCard, Flex, Stat, styled } from '@binarycapsule/ui-capsules';
import { DayReportDto } from '../../../../api/useDayReportQuery';
import { formatTotalTime } from '../../../../../../utils/time';

const Card = styled(BaseCard, {
  padding: '$4',
  flex: 1,
});

interface Props {
  data?: DayReportDto;
}

export const Stats: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { totalTime, completedTasks, tasks } = data;

  return (
    <Flex css={{ my: '$4', mt: '$6', gridGap: '$4' }}>
      <Card>
        <Stat label="Total time worked">{formatTotalTime(totalTime)}</Stat>
      </Card>

      <Card>
        <Stat label="Tasks completed">
          {completedTasks} / {tasks.length}
        </Stat>
      </Card>
    </Flex>
  );
};
