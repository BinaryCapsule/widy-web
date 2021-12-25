import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';
import produce from 'immer';
import { toast } from '@binarycapsule/ui-capsules';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { IDay } from './useDayQuery';

interface MoveAllToTomorrowParams {
  dayId: number;
}

export const useMoveAllToTomorrowMutation = () => {
  const { authFetch } = useAuthFetch();

  const { dayId } = useDayRouteParams();

  const dayQK = queryKeys.day(dayId);
  const tomorrowQK = queryKeys.tomorrow();

  const queryClient = useQueryClient();

  const moveAllToTomorrow = async ({ dayId }: MoveAllToTomorrowParams) => {
    return authFetch('/api/tasks/to-tomorrow', {
      method: 'PATCH',
      ...httpBody({
        dayId,
      }),
    });
  };

  return useMutation(moveAllToTomorrow, {
    onMutate: async () => {
      await queryClient.cancelQueries(dayQK);

      const oldDay = queryClient.getQueryData<IDay>(dayQK);

      const planSection = oldDay
        ? Object.values(oldDay.entities.sections).find(({ variant }) => variant === 'plan')
        : null;

      queryClient.setQueryData<IDay | undefined>(dayQK, old => {
        if (old && planSection) {
          return produce(old, draft => {
            Object.values(draft.entities.tasks || {}).forEach(({ id, sectionId }) => {
              if (sectionId === planSection.id) {
                if (draft.entities.tasks) {
                  delete draft.entities.tasks[id];
                }
              }
            });
            draft.entities.sections[planSection.id].tasks = [];
          });
        }

        return old;
      });

      return { oldDay };
    },

    onError: (_, __, context) => {
      toast.error({ title: 'Oops, something went wrong' });

      if (context?.oldDay) {
        queryClient.setQueryData(dayQK, context.oldDay);
      }
    },

    onSettled() {
      queryClient.invalidateQueries(tomorrowQK, { refetchInactive: true });
      queryClient.invalidateQueries(dayQK);
    },
  });
};
