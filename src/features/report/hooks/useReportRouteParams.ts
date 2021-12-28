import { useParams } from 'react-router-dom';

export interface ReportRouteParams {
  dayId: string;
}

export const useReportRouteParams = () => {
  return useParams<ReportRouteParams>();
};
