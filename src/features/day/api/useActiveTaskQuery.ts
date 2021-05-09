import { useQuery } from 'react-query';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { TaskDto } from './useDayQuery';

interface ActiveTaskDto {
  task: TaskDto;
}

export const useActiveTaskQuery = () => {
  const { authFetch } = useAuthFetch();

  const fetchActiveTask = async (): Promise<ActiveTaskDto> => {
    return authFetch('/api/tasks/active');
  };

  return useQuery<ActiveTaskDto, Error>(['activeTask'], () => fetchActiveTask());
};
