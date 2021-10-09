import { useAuthFetch } from '../../../utils/useAuthFetch';
import { queryKeys } from './queryKeys';
import { useQuery } from 'react-query';
import { SectionDto, TaskDto } from './useDayQuery';
import { normalize, schema } from 'normalizr';
import { useDayRouteParams } from '../hooks/useDayRouteParams';

const taskSchema = new schema.Entity('tasks');

const tomorrowSchema = new schema.Entity('tomorrow', {
  tasks: [taskSchema],
});

export interface ITomorrow {
  entities: {
    tasks?: Record<number, TaskDto>;
    tomorrow: Record<number, SectionDto>;
  };
  result: number;
}

export const useTomorrowQuery = () => {
  const { dayId } = useDayRouteParams();

  const { authFetch } = useAuthFetch();

  const fetchTomorrow = async (): Promise<ITomorrow> => {
    const data: SectionDto = await authFetch('/api/sections/tomorrow');

    return normalize(data, tomorrowSchema);
  };

  const queryKey = queryKeys.tomorrow();

  return useQuery<ITomorrow, Error>(queryKey, () => fetchTomorrow(), {
    enabled: dayId === 'tomorrow',
  });
};
