import { Feature } from '../../../config/queryClient';

enum QueryKey {
  DayReport = 'DayReport',
}

export const queryKeys = {
  dayReport: (dayId: string) => [Feature.Reports, QueryKey.DayReport, dayId],
};
