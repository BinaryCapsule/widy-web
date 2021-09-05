import React from 'react';
import { TaskDto } from '../../api/useDayQuery';
import { StyledTask, TaskSummary, TaskVariant } from './Task.styles';
import { Box, Checkbox, Flex, Toaster } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { TimerButton } from '../TimerButton/TimerButton';
import { PlanCheckBox } from './img/PlanCheckBox';
import { Launcher } from '../Launcher/Launcher';
import { TaskMenu } from '../TaskMenu/TaskMenu';
import { TaskScope } from '../TaskScope/TaskScope';

interface Props {
  task: TaskDto;
  variant: TaskVariant;
  isSelected: boolean;
}

export const Task: React.FC<Props> = ({ task, variant, isSelected }) => {
  const { dayId } = useDayRouteParams();

  const history = useHistory();

  const { mutateAsync: updateTask, isLoading: isUpdatingTask } = useUpdateTaskMutation();

  const toggleTaskDone = async (payload: Partial<TaskDto>) => {
    if (isUpdatingTask) {
      return;
    }

    try {
      await updateTask({ taskId: task.id, payload });
    } catch {
      Toaster.error({ title: 'Oops, something went wrong' });
    }
  };

  const onTaskClick = () => {
    history.push(`/day/${dayId}/${task.id}`);
  };

  const onTaskKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      onTaskClick();
    }
  };

  return (
    <StyledTask variant={variant} isSelected={isSelected}>
      {variant === 'plan' && <PlanCheckBox mr="12" />}

      {variant !== 'plan' && variant !== 'tomorrow' && (
        <Checkbox
          size="large"
          variantColor="neutral"
          checked={task.isDone}
          onChange={() => toggleTaskDone({ isDone: !task.isDone })}
        />
      )}

      <Box flex={1}>
        <Box
          onClick={onTaskClick}
          onKeyDown={onTaskKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`Task - ${task.summary}`}
        >
          <TaskSummary fontWeight={500} color={task.isDone ? 'neutral.500' : 'neutral.700'}>
            {task.summary}
          </TaskSummary>
        </Box>
      </Box>

      <TaskScope task={task} mr="4" />

      {variant === 'plan' && (
        <Flex height="24" alignItems="center">
          <Launcher />
          <TaskMenu task={task} variant={variant} />
        </Flex>
      )}

      {variant !== 'plan' && variant !== 'tomorrow' && variant !== 'completed' && (
        <TimerButton task={task} />
      )}

      {variant !== 'completed' && variant !== 'plan' && <TaskMenu task={task} variant={variant} />}
    </StyledTask>
  );
};
