import React from 'react';
import { styled } from 'styled-components';
import { Card as BaseCard, Flex, Stat } from '@binarycapsule/ui-capsules';
import { DayReportDto } from '../../../../api/useDayReportQuery';
import { formatTotalTime } from '../../../../../../utils/time';

const Card = styled(BaseCard)({
  padding: 16,
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
    <Flex style={{ margin: '24 0 16', gap: 16 }}>
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
