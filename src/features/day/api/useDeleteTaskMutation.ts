import { useAuthFetch } from '../../../utils/useAuthFetch';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';
import { useMutation, useQueryClient } from 'react-query';
import { IDay, TaskDto } from './useDayQuery';
import produce from 'immer';
import { ActiveTaskDto } from './useActiveTaskQuery';
import { toast } from '@binarycapsule/ui-capsules';
import { GENERIC_ERROR_MSG } from '../../../constants';

interface DeleteTaskParams {
  task: TaskDto;
}

export const useDeleteTaskMutation = () => {
  const { authFetch } = useAuthFetch();

  const { dayId } = useDayRouteParams();

  const queryClient = useQueryClient();

  const dayQK = dayId === 'tomorrow' ? queryKeys.tomorrow() : queryKeys.day(dayId);
  const activeTaskQK = queryKeys.activeTask();

  const deleteTask = async ({ task }: DeleteTaskParams) => {
    return authFetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });
  };

  return useMutation(deleteTask, {
    onMutate: async ({ task }: DeleteTaskParams) => {
      await queryClient.cancelQueries(dayQK);
      await queryClient.cancelQueries(activeTaskQK);

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.tasks) {
              delete draft.entities.tasks[task.id];
            }

            if (draft.entities.sections && draft.entities.sections[task.sectionId]) {
              const { tasks } = draft.entities.sections[task.sectionId];
              const index = tasks.findIndex(id => id === task.id);
              if (index !== -1) tasks.splice(index, 1);
            }
          });
        }

        return old;
      });

      // We are deleting the active task
      if (task.start) {
        queryClient.setQueryData<ActiveTaskDto | undefined>(activeTaskQK, { id: null });
      }

      const oldDay = queryClient.getQueryData<IDay>(dayQK);

      const oldActiveTask = queryClient.getQueryData<ActiveTaskDto>(activeTaskQK);

      return { oldDay, oldActiveTask };
    },

    onError: (_, __, context) => {
      toast.error({ title: GENERIC_ERROR_MSG });

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
