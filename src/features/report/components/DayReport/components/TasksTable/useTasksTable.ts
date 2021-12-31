import { DayReportDto, ReportTaskDto } from '../../../../api/useDayReportQuery';
import { useMemo } from 'react';

export const selectTasksTableData = ({ tasks }: DayReportDto) => {
  const tasksPerScope = tasks.reduce(
    (acc, task) => {
      if (task.time === 0) {
        return acc;
      }

      const { scope } = task;

      if (!scope) {
        acc[0].tasks.push(task);
      } else {
        const scopeIndex = acc.findIndex(({ id: scopeId }) => scopeId === scope.id);

        if (scopeIndex === -1) {
          acc.push({
            id: scope.id,
            scopeTitle: `${scope.name} - ${scope.shortCode.toUpperCase()}`,
            tasks: [task],
          });
        } else {
          acc[scopeIndex].tasks.push(task);
        }
      }

      return acc;
    },
    [
      {
        scopeTitle: 'No Scope',
        id: -1,
        tasks: [],
        time: 0,
      },
    ] as {
      scopeTitle: string;
      id: number;
      time?: number;
      tasks: Pick<ReportTaskDto, 'id' | 'summary' | 'isDone' | 'time'>[];
    }[],
  );

  // Sum all tasks time and add it as the scope's time property
  return tasksPerScope.reduce((acc, scope, index) => {
    // eslint-disable-next-line no-param-reassign
    acc[index].time = scope.tasks.reduce((totalTime, { time }) => totalTime + time, 0);
    return acc;
  }, tasksPerScope);
};

interface UseTasksTableParams {
  data?: DayReportDto;
}

export const useTasksTable = ({ data }: UseTasksTableParams) => {
  return useMemo(() => {
    if (!data) {
      return null;
    }

    return selectTasksTableData(data);
  }, [data]);
};
