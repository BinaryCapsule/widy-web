import { Feature } from '../../../config/queryClient';

enum QueryKey {
  Days = 'Days',
}

export const queryKeys = {
  days: () => [Feature.Days, QueryKey.Days],
};
