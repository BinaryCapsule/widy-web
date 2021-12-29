import { useMutation, useQueryClient } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { TaskDto } from './useDayQuery';
import { queryKeys } from './queryKeys';
import { httpBody } from '../../../utils/httpBody';
import { toast } from '@binarycapsule/ui-capsules';
import { GENERIC_ERROR_MSG } from '../../../common/constants';
import { produce } from 'immer';
import { ITomorrow } from './useTomorrowQuery';

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
    onSuccess({ id }) {
      queryClient.setQueryData<ITomorrow | undefined>(tomorrowQK, old => {
        if (old) {
          return produce(old, draft => {
            if (draft.entities.tasks) {
              delete draft.entities.tasks[id];
            }
          });
        }

        return old;
      });

      queryClient.refetchQueries(dayQK, { inactive: true });
    },

    onError() {
      toast.error({ title: GENERIC_ERROR_MSG });
    },
  });
};
