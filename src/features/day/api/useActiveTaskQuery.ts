import { useQuery } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { queryKeys } from './queryKeys';

export interface ActiveTaskDto {
  id: number | null;
}

export const useActiveTaskQuery = () => {
  const { authFetch } = useAuthFetch();

  const activeTaskQK = queryKeys.activeTask();

  const fetchActiveTask = async (): Promise<ActiveTaskDto> => {
    return authFetch('/api/tasks/active');
  };

  return useQuery<ActiveTaskDto, Error>(activeTaskQK, fetchActiveTask);
};
