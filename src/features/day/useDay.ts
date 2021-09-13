import { useActiveTaskQuery } from './api/useActiveTaskQuery';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { activeTaskActions } from './state/activeTaskSlice';

let timer: number | undefined;

export const useDay = () => {
  const { data: activeTask } = useActiveTaskQuery();

  const dispatch = useAppDispatch();

  // Start active task ticking
  useEffect(() => {
    // Active task id changed. Clear the timer if it exists
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    // If there is an active task ➜ start ticking
    if (activeTask?.id) {
      timer = window.setInterval(() => dispatch(activeTaskActions.activeTaskTick()), 1000);
    }
    return () => clearInterval(timer);
  }, [activeTask?.id, dispatch]);
};
