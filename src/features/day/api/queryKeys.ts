import { Feature } from '../../../config/queryClient';

enum QueryKey {
  Day = 'Day',
  Tomorrow = 'Tomorrow',
  Scopes = 'Scopes',
  ActiveTask = 'ActiveTask',
}

export const queryKeys = {
  day: (dayId: string) => [Feature.Day, QueryKey.Day, dayId],
  tomorrow: () => [Feature.Day, QueryKey.Tomorrow],
  scopes: () => [Feature.Day, QueryKey.Scopes],
  activeTask: () => [Feature.Day, QueryKey.ActiveTask],
};
