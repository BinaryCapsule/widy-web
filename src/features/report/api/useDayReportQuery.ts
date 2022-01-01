import { useQuery } from 'react-query';
import { useAuthFetch } from '../../../utils/useAuthFetch';
import { SectionVariant, TaskDto } from '../../day/api/useDayQuery';
import { useReportRouteParams } from '../hooks/useReportRouteParams';
import { queryKeys } from './queryKeys';

interface ReportScopeDto {
  id: number;
  name: string;
  shortCode: string;
}

export interface ReportTaskDto extends TaskDto {
  scope: ReportScopeDto | null;
}

export interface DayReportDto {
  day: string;
  tasks: ReportTaskDto[];
  sections: {
    id: number;
    variant: SectionVariant;
    title: string;
  }[];
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
