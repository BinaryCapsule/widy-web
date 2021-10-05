import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';
import { httpBody } from '../../../utils/httpBody';
import { IDay, TaskDto } from './useDayQuery';

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

  const dayQK = dayId === 'tomorrow' ? queryKeys.tomorrow() : queryKeys.day(dayId);

  const createTask = async ({ sectionId, summary, rank, scopeId }: CreateTaskParams) => {
    return authFetch('/api/tasks', {
      method: 'POST',
      ...httpBody({
        dayId: dayId === 'tomorrow' ? undefined : dayId,
        sectionId,
        summary,
        rank,
        scopeId,
      }),
    });
  };

  return useMutation(createTask, {
    onSuccess: async (task: TaskDto, { sectionId }: CreateTaskParams) => {
      await queryClient.cancelQueries(dayQK);

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.sections) {
              draft.entities.sections[sectionId].tasks.push(task.id);
            }

            if (draft.entities.tasks) {
              draft.entities.tasks[task.id] = task;
            } else {
              draft.entities.tasks = {
                [task.id]: task,
              };
            }
          });
        }

        return old;
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries(dayQK);
    },
  });
};
