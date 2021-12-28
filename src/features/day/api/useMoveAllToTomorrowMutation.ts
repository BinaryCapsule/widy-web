import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';
import { toast } from '@binarycapsule/ui-capsules';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { GENERIC_ERROR_MSG } from '../../../constants';

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
    async onSettled() {
      queryClient.invalidateQueries(tomorrowQK, { refetchInactive: true });

      await queryClient.invalidateQueries(dayQK);
    },

    onError() {
      toast.error({ title: GENERIC_ERROR_MSG });
    },
  });
};
