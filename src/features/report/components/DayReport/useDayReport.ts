import { useDayReportQuery } from '../../api/useDayReportQuery';

export const useDayReport = () => {
  const queryResult = useDayReportQuery();

  const totalTime = queryResult.data
    ? queryResult.data.tasks.reduce((acc, { time }) => {
        return acc + time;
      }, 0)
    : 0;

  return {
    ...queryResult,
    totalTime,
  };
};
