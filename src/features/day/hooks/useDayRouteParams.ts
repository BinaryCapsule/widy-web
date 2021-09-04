import { useParams } from 'react-router-dom';

export interface DayRouteParams {
  dayId: string;
  taskId?: string;
}

export const useDayRouteParams = () => {
  return useParams<DayRouteParams>();
};
