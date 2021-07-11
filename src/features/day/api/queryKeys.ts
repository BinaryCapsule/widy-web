const DAY_QK = 'day';
const SCOPES_QK = 'scopes';

export const queryKeys = {
  day: (dayId: string) => [DAY_QK, dayId],
  scopes: () => [SCOPES_QK],
};
