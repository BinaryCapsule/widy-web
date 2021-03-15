import { useQuery } from 'react-query';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { TaskDto } from './useDayQuery';

export const useActiveTaskQuery = () => {
  const { authFetch } = useAuthFetch();

  const fetchActiveTask = async (): Promise<TaskDto> => {
    return authFetch('/api/tasks/active');
  };

  return useQuery<TaskDto, Error>(['activeTask'], () => fetchActiveTask());
};
