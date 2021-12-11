import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';
import produce from 'immer';
import { ITomorrow } from './useTomorrowQuery';
import { toast } from '@binarycapsule/ui-capsules';

interface MoveAllToPlanMutationParams {
  dayId: number | null;
}

interface MoveAllToPlanParams {
  dayId: number;
}

export const useMoveAllToPlanMutation = ({ dayId }: MoveAllToPlanMutationParams) => {
  const { authFetch } = useAuthFetch();

  const dayQK = queryKeys.day(String(dayId));
  const tomorrowQK = queryKeys.tomorrow();

  const queryClient = useQueryClient();

  const moveAllToPlan = async ({ dayId }: MoveAllToPlanParams) => {
    return authFetch('/api/tasks/to-plan', {
      method: 'PATCH',
      ...httpBody({
        dayId,
      }),
    });
  };

  return useMutation(moveAllToPlan, {
    onMutate: async () => {
      await queryClient.cancelQueries(tomorrowQK);

      const oldTomorrow = queryClient.getQueryData<ITomorrow>(tomorrowQK);

      queryClient.setQueryData<ITomorrow | undefined>(tomorrowQK, old => {
        if (old) {
          return produce(old, draft => {
            draft.entities.tasks = undefined;
            draft.entities.tomorrow[draft.result].tasks = [];
          });
        }

        return old;
      });

      return { oldTomorrow };
    },

    onError: (_, __, context) => {
      toast.error({ title: 'Oops, something went wrong' });

      if (context?.oldTomorrow) {
        queryClient.setQueryData(tomorrowQK, context.oldTomorrow);
      }
    },

    onSettled() {
      queryClient.refetchQueries(dayQK);
      queryClient.invalidateQueries(tomorrowQK);
    },
  });
};
