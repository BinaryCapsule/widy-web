import React from 'react';
import { TaskDto } from '../../api/useDayQuery';
import { StyledTask, TaskSummary, TaskVariant } from './Task.styles';
import { Box, Checkbox, toast } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { TimerButton } from '../TimerButton/TimerButton';
import { PlanCheckBox } from './img/PlanCheckBox';
import { Launcher } from '../Launcher/Launcher';
import { TaskMenu } from '../TaskMenu/TaskMenu';
import { TaskScope } from '../TaskScope/TaskScope';
import { AddToPlan } from '../AddToPlan/AddToPlan';

interface Props {
  task: TaskDto;
  variant: TaskVariant;
  isSelected: boolean;
  isDragging: boolean;
  todayDayId?: number | null;
}

export const Task: React.FC<Props> = ({ task, variant, isSelected, isDragging, todayDayId }) => {
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
      toast.error({ title: 'Oops, something went wrong' });
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
    <StyledTask variant={variant} isSelected={isSelected} isDragging={isDragging}>
      {(variant === 'plan' || variant === 'tomorrow') && <PlanCheckBox css={{ mr: '$3', ml: 2 }} />}

      {variant !== 'plan' && variant !== 'tomorrow' && (
        <Checkbox
          size="large"
          checked={task.isDone}
          onChange={() => toggleTaskDone({ isDone: !task.isDone })}
          aria-label={task.isDone ? 'Mark task as todo' : 'Mark task as done'}
          disabled={isUpdatingTask}
        />
      )}

      <Box css={{ flex: 1, minWidth: 0 }}>
        <Box
          onClick={onTaskClick}
          onKeyDown={onTaskKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`Task ${variant} - ${task.summary}`}
        >
          <TaskSummary css={{ fontWeight: 500, color: 'inherit' }}>{task.summary}</TaskSummary>
        </Box>
      </Box>

      <TaskScope task={task} css={{ mr: '$1' }} />

      {variant === 'plan' && <Launcher task={task} />}

      {variant === 'tomorrow' && !!todayDayId && <AddToPlan task={task} dayId={todayDayId} />}

      {variant !== 'plan' && variant !== 'tomorrow' && variant !== 'completed' && (
        <TimerButton task={task} />
      )}

      {variant !== 'completed' && <TaskMenu task={task} variant={variant} />}
    </StyledTask>
  );
};
