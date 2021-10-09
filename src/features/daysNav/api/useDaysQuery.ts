import { useInfiniteQuery } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { DAYS_LIMIT } from '../DaysNav.constants';
import { queryKeys } from './queryKeys';

export interface DayDto {
  id: number;
  day: string;
}

export interface DaysDto {
  items: DayDto[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export const useDaysQuery = () => {
  const { authFetch } = useAuthFetch();

  const daysQK = queryKeys.days();

  const fetchDays = async (page = 1) => {
    return authFetch(`/api/days?limit=${DAYS_LIMIT}&page=${page}`);
  };

  return useInfiniteQuery<DaysDto>(daysQK, ({ pageParam }) => fetchDays(pageParam), {
    getNextPageParam: lastPage => {
      const nextPage = lastPage.meta.currentPage + 1;
      const { totalPages } = lastPage.meta;

      return nextPage <= totalPages ? nextPage : false;
    },
  });
};
