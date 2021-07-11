import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';
import { httpBody } from '../../../util/httpBody';

interface CreateTaskParams {
  sectionId: number;
  summary: string;
  rank: number;
  scopeId?: number;
}

export const useCreateTaskMutation = () => {
  const { authFetch } = useAuthFetch();

  const { dayId } = useDayRouteParams();

  const queryClient = useQueryClient();

  const createTask = async ({ sectionId, summary, rank, scopeId }: CreateTaskParams) => {
    return authFetch('/api/tasks', {
      method: 'POST',
      ...httpBody({
        dayId,
        sectionId,
        summary,
        rank,
        scopeId,
      }),
    });
  };

  return useMutation(createTask, {
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.day(dayId));
    },
  });
};
