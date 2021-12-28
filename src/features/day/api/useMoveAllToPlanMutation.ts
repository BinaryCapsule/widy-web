import { useMutation, useQueryClient } from 'react-query';
import { toast } from '@binarycapsule/ui-capsules';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';
import { GENERIC_ERROR_MSG } from '../../../constants';

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
    async onSuccess() {
      queryClient.invalidateQueries(dayQK, { refetchInactive: true });

      await queryClient.invalidateQueries(tomorrowQK);
    },

    onError() {
      toast.error({ title: GENERIC_ERROR_MSG });
    },
  });
};
