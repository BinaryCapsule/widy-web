import React from 'react';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { TaskDto } from '../../api/useDayQuery';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { IllustratedIcon } from '@binarycapsule/ui-capsules';
import { getNow } from '../../utils/getNow';

interface Props {
  task: TaskDto;
  size?: number;
}

export const TimerButton: React.FC<Props> = ({ task, size }) => {
  const theme = useTheme();

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
    <IllustratedIcon
      icon={isActive ? 'stop' : 'play'}
      onClick={handleClick}
      disabled={isUpdatingTask}
      size={size}
      primaryColor={isActive ? theme.colors.yellow['400'] : theme.colors.neutral['300']}
      primaryColorHover={isActive ? theme.colors.yellow['500'] : theme.colors.neutral['400']}
      secondaryColor={isActive ? theme.colors.yellow['900'] : theme.colors.neutral['600']}
      secondaryColorHover={isActive ? theme.colors.yellow['900'] : theme.colors.neutral['700']}
      aria-label={isActive ? 'Stop task' : 'Start task'}
    />
  );
};
