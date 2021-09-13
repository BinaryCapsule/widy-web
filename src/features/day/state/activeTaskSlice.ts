import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../store';

interface ActiveTaskState {
  tick: number;
}

const initialState: ActiveTaskState = {
  tick: -1,
};

const activeTask = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    activeTaskTick(state) {
      state.tick = Date.now();
    },
  },
});

export const activeTaskReducer = activeTask.reducer;
export const activeTaskActions = activeTask.actions;

export const useActiveTaskTick = () => {
  useAppSelector(state => state.activeTask.tick);
};
