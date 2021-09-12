import { useHistory } from 'react-router-dom';
import { DayRouteParams } from './useDayRouteParams';

export const useDayRouteNavigate = () => {
  const history = useHistory();

  return {
    navigate: ({ dayId, taskId }: DayRouteParams) => {
      history.push(`/day/${dayId}${taskId ? `/${taskId}` : ''}`);
    },
  };
};
