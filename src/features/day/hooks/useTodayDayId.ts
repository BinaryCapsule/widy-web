import { useDaysQuery } from '../../daysNav/api/useDaysQuery';
import { isToday } from '../../../utils/dates';

export const useTodayDayId = () => {
  const { data: daysData } = useDaysQuery();

  const todayDayId =
    daysData && daysData.pages && isToday(daysData.pages[0].items[0].day)
      ? daysData.pages[0].items[0].id
      : null;

  return {
    todayDayId,
  };
};
