const DAY_QK = 'day';
const SCOPES_QK = 'scopes';
const ACTIVE_TASK_QK = 'activeTask';

export const queryKeys = {
  day: (dayId: string) => [DAY_QK, dayId],
  scopes: () => [SCOPES_QK],
  activeTask: () => [ACTIVE_TASK_QK],
};
