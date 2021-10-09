import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { IDay, TaskDto } from './useDayQuery';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ITomorrow } from './useTomorrowQuery';
import { getSectionTasks } from '../utils/getSectionTasks';
import { RANK_BLOCK_SIZE } from '../Day.constants';

interface MoveToTomorrowParams {
  task: TaskDto;
}

export const useMoveToTomorrowMutation = () => {
  const { authFetch } = useAuthFetch();

  const { dayId } = useDayRouteParams();

  const queryClient = useQueryClient();

  const dayQK = queryKeys.day(dayId);
  const tomorrowQK = queryKeys.tomorrow();

  const moveToTomorrow = async ({ task }: MoveToTomorrowParams): Promise<TaskDto> => {
    return authFetch(`/api/tasks/${task.id}/to-tomorrow`, { method: 'PATCH' });
  };

  return useMutation(moveToTomorrow, {
    onMutate: async ({ task }: MoveToTomorrowParams) => {
      await queryClient.cancelQueries(dayQK);
      await queryClient.cancelQueries(tomorrowQK);

      const oldDay = queryClient.getQueryData<IDay>(dayQK);
      const oldTomorrow = queryClient.getQueryData<ITomorrow>(tomorrowQK);

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.tasks) {
              delete draft.entities.tasks[task.id];
            }
          });
        }

        return old;
      });

      queryClient.setQueryData<ITomorrow | undefined>(tomorrowQK, old => {
        if (old) {
          const {
            result: sectionId,
            entities: { tasks },
          } = old;

          const sortedTasks = getSectionTasks(sectionId, tasks);

          const newRank =
            RANK_BLOCK_SIZE +
            (sortedTasks.length > 0 ? sortedTasks[sortedTasks.length - 1].rank : 0);

          return produce(old, draft => {
            if (draft.entities.tasks) {
              draft.entities.tasks[task.id] = {
                ...task,
                sectionId,
                rank: newRank,
              };
            }
          });
        }

        return old;
      });

      return { oldDay, oldTomorrow };
    },

    onError: (_, __, context) => {
      Toaster.error({ title: 'Oops, something went wrong' });

      if (context?.oldDay) {
        queryClient.setQueryData(dayQK, context.oldDay);
      }

      if (context?.oldTomorrow) {
        queryClient.setQueryData(tomorrowQK, context.oldTomorrow);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(dayQK);
      queryClient.refetchQueries(tomorrowQK, { inactive: true });
    },
  });
};
