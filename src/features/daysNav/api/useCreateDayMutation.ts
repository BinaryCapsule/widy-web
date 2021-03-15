import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { produce } from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { ISO_8601_FORMAT } from '../../../util/dates';
import { DayDto, DaysDto } from './useDaysQuery';

export const useCreateDayMutation = () => {
  const { authFetch } = useAuthFetch();

  const history = useHistory();

  const queryClient = useQueryClient();

  const createDay = async (): Promise<DayDto> => {
    return authFetch('/api/days', {
      method: 'POST',
      body: JSON.stringify({ day: moment().format(ISO_8601_FORMAT) }),
    });
  };

  return useMutation<DayDto, Error>(createDay, {
    onSuccess: data => {
      if (data && data.day) {
        queryClient.setQueryData<InfiniteData<DaysDto> | undefined>('days', currentDaysCache => {
          if (currentDaysCache) {
            return produce(currentDaysCache, draftState => {
              draftState.pages[0].items.unshift(data);
            });
          }

          return currentDaysCache;
        });

        history.push(`/day/${data.id}`);
      }
    },

    onError: () => {
      Toaster.error({
        title: 'Oops, something went wrong',
      });
    },
  });
};
