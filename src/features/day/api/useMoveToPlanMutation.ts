import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { IDay, TaskDto } from './useDayQuery';
import { queryKeys } from './queryKeys';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ITomorrow } from './useTomorrowQuery';
import { getSectionTasks } from '../utils/getSectionTasks';
import { RANK_BLOCK_SIZE } from '../Day.constants';
import { httpBody } from '../../../utils/httpBody';

interface MoveToPlanParams {
  task: TaskDto;
  dayId: number;
}

interface MoveToPlanMutationParams {
  dayId: number;
}

export const useMoveToPlanMutation = ({ dayId }: MoveToPlanMutationParams) => {
  const { authFetch } = useAuthFetch();

  const queryClient = useQueryClient();

  const dayQK = queryKeys.day(dayId.toString());
  const tomorrowQK = queryKeys.tomorrow();

  const moveToPlan = async ({ task }: MoveToPlanParams): Promise<TaskDto> => {
    return authFetch(`/api/tasks/${task.id}/to-plan`, { method: 'PATCH', ...httpBody({ dayId }) });
  };

  return useMutation(moveToPlan, {
    onMutate: async ({ task, dayId }: MoveToPlanParams) => {
      await queryClient.cancelQueries(dayQK);
      await queryClient.cancelQueries(tomorrowQK);

      const oldDay = queryClient.getQueryData<IDay>(dayQK);
      const oldTomorrow = queryClient.getQueryData<ITomorrow>(tomorrowQK);

      queryClient.setQueryData<ITomorrow | undefined>(tomorrowQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.tasks) {
              delete draft.entities.tasks[task.id];
            }
          });
        }

        return old;
      });

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old) {
          const {
            entities: { tasks, sections },
          } = old;

          const planSection = Object.values(sections).find(({ variant }) => variant === 'plan');

          if (planSection) {
            const sortedTasks = getSectionTasks(planSection.id, tasks);

            const newRank =
              RANK_BLOCK_SIZE +
              (sortedTasks.length > 0 ? sortedTasks[sortedTasks.length - 1].rank : 0);

            return produce(old, draft => {
              if (draft.entities.tasks) {
                draft.entities.tasks[task.id] = {
                  ...task,
                  dayId,
                  sectionId: planSection.id,
                  rank: newRank,
                };
              }
            });
          }
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
      queryClient.invalidateQueries(tomorrowQK);
    },
  });
};
