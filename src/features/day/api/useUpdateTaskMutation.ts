import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { httpBody } from '../../../util/httpBody';
import { IDay, TaskDto } from './useDayQuery';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';
import produce from 'immer';
import { ActiveTaskDto } from './useActiveTaskQuery';

interface UpdateTaskParams {
  taskId: number;
  payload: Partial<TaskDto>;
}

export const useUpdateTaskMutation = () => {
  const { authFetch } = useAuthFetch();

  const { dayId } = useDayRouteParams();

  const queryClient = useQueryClient();

  const dayQK = queryKeys.day(dayId);
  const activeTaskQK = queryKeys.activeTask();

  const updateTask = async ({ taskId, payload }: UpdateTaskParams): Promise<TaskDto> => {
    return authFetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      ...httpBody(payload),
    });
  };

  return useMutation(updateTask, {
    onMutate: async ({ taskId, payload }: UpdateTaskParams) => {
      await queryClient.cancelQueries(dayQK);
      await queryClient.cancelQueries(activeTaskQK);

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.tasks) {
              const oldTask = draft.entities.tasks[taskId];

              if (oldTask) {
                draft.entities.tasks[taskId] = {
                  ...oldTask,
                  ...payload,
                };
              }
            }
          });
        }

        return old;
      });

      const oldDay = queryClient.getQueryData<IDay>(dayQK);

      const oldActiveTask = queryClient.getQueryData<ActiveTaskDto>(activeTaskQK);

      // We are starting a task
      if (payload.start) {
        queryClient.setQueryData<ActiveTaskDto | undefined>(activeTaskQK, { id: taskId });
      }

      // We are editing task time
      if (payload.time) {
        // We are stopping the active task
        if (oldActiveTask?.id === taskId) {
          queryClient.setQueryData(activeTaskQK, { id: null });
        }
      }

      return { oldDay, oldActiveTask };
    },

    onError: (_, __, context) => {
      if (context?.oldDay) {
        queryClient.setQueryData(dayQK, context.oldDay);
      }

      if (context?.oldActiveTask) {
        queryClient.setQueryData(activeTaskQK, context.oldActiveTask);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(dayQK);
      queryClient.invalidateQueries(activeTaskQK);
    },
  });
};
