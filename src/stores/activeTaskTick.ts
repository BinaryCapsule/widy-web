import create from 'zustand';

interface State {
  tick: number;
  activeTaskTick(): void;
}

export const useActiveTaskTick = create<State>(set => ({
  tick: 0,
  activeTaskTick: () => set({ tick: Date.now() }),
}));
