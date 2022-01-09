import { useActiveTaskQuery } from './api/useActiveTaskQuery';
import { useEffect } from 'react';
import { useActiveTaskTick } from '../../stores/activeTaskTick';

let timer: number | undefined;

export const useDay = () => {
  const { data: activeTask } = useActiveTaskQuery();

  const activeTaskTick = useActiveTaskTick(state => state.activeTaskTick);

  // Start active task ticking
  useEffect(() => {
    // Active task id changed. Clear the timer if it exists
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    // If there is an active task ➜ start ticking
    if (activeTask?.id) {
      timer = window.setInterval(activeTaskTick, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTask?.id, activeTaskTick]);
};
