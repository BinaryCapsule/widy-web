import React from 'react';
import { ITask } from '../../api/useDayQuery';
import { StyledTask, TaskVariant } from './Task.styles';
import { Checkbox, TruncatedText } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

interface Props {
  task: ITask;
  variant: TaskVariant;
  isSelected: boolean;
}

export const Task: React.FC<Props> = ({ task, variant, isSelected }) => {
  const { dayId } = useDayRouteParams();
  const history = useHistory();

  return (
    <StyledTask
      variant={variant}
      isSelected={isSelected}
      onClick={() => history.push(`/day/${dayId}/${task.id}`)}
    >
      <Checkbox size="large" variantColor="neutral" checked={task.isDone} onChange={() => {}} />

      <TruncatedText fontWeight={500} color={task.isDone ? 'neutral.300' : 'neutral.700'}>
        {task.summary}
      </TruncatedText>
    </StyledTask>
  );
};
