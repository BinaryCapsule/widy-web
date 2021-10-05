const DAY_QK = 'day';
const TOMORROW_QK = 'tomorrow';
const SCOPES_QK = 'scopes';
const ACTIVE_TASK_QK = 'activeTask';

export const queryKeys = {
  day: (dayId: string) => [DAY_QK, dayId],
  tomorrow: () => [TOMORROW_QK],
  scopes: () => [SCOPES_QK],
  activeTask: () => [ACTIVE_TASK_QK],
};
