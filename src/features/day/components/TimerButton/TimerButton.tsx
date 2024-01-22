import React from 'react';
import moment from 'moment';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { TaskDto } from '../../api/useDayQuery';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { getNow } from '../../utils/getNow';
import { StyledTimerButton } from './TimerButton.styles';

interface Props {
  task: TaskDto;
  size?: number;
}

export const TimerButton: React.FC<Props> = ({ task, size }) => {
  const { dayId } = useDayRouteParams();

  const { isLoading: isLoadingActiveTask, data: activeTaskData } = useActiveTaskQuery();

  const { mutateAsync: updateTask, isLoading: isUpdatingTask } = useUpdateTaskMutation();

  if (isLoadingActiveTask || !dayId) {
    return null;
  }

  const isActive = task.id === activeTaskData?.id;

  const handleClick = async () => {
    if (isUpdatingTask) {
      return;
    }

    const payload = isActive
      ? {
          start: null,
          time: task.time + moment.utc().diff(task.start, 'seconds'),
        }
      : {
          start: getNow(),
        };

    try {
      await updateTask({
        taskId: task.id,
        payload,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledTimerButton
      $isActive={isActive}
      icon={isActive ? 'stop' : 'play'}
      onClick={handleClick}
      disabled={isUpdatingTask}
      size={size}
      aria-label={isActive ? 'Stop task' : 'Start task'}
      style={{ margin: '0 4px' }}
    />
  );
};
