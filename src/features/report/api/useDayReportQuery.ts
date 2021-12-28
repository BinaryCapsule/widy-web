import { useQuery } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { TaskDto } from '../../day/api/useDayQuery';
import { useReportRouteParams } from '../hooks/useReportRouteParams';
import { queryKeys } from './queryKeys';

export interface DayReportDto {
  day: string;
  tasks: TaskDto[];
  totalTime: number;
  completedTasks: number;
}

export const useDayReportQuery = () => {
  const { dayId } = useReportRouteParams();

  const { authFetch } = useAuthFetch();

  const fetchDayReport = async (dayId: string): Promise<DayReportDto> => {
    return authFetch(`/api/reports/${dayId}`);
  };

  const queryKey = queryKeys.dayReport(dayId);

  return useQuery<DayReportDto, Error>(
    queryKey,

    () => fetchDayReport(dayId),

    { staleTime: 0 },
  );
};
