import { DayReportDto, ReportTaskDto } from '../../../../api/useDayReportQuery';
import { useMemo } from 'react';

interface TasksPerScope {
  scopeTitle: string;
  id: number;
  time: number;
  tasks: Pick<ReportTaskDto, 'id' | 'summary' | 'isDone' | 'time'>[];
}

export const selectTasksTableData = ({ tasks }: DayReportDto) => {
  const noScope: TasksPerScope = {
    scopeTitle: 'No Scope',
    id: -1,
    tasks: [],
    time: 0,
  };

  const tasksPerScope = tasks.reduce((acc, task) => {
    if (task.time === 0) {
      return acc;
    }

    const { scope } = task;

    if (!scope) {
      noScope.tasks.push(task);
      noScope.time += task.time;
    } else {
      const scopeIndex = acc.findIndex(({ id: scopeId }) => scopeId === task.scopeId);

      if (scopeIndex === -1 && task.scopeId) {
        acc.push({
          id: task.scopeId,
          scopeTitle: `${scope.name} - ${scope.shortCode.toUpperCase()}`,
          tasks: [task],
          time: task.time,
        });
      } else {
        acc[scopeIndex].tasks.push(task);
        acc[scopeIndex].time += task.time;
      }
    }

    return acc;
  }, [] as TasksPerScope[]);

  if (noScope.time > 0) {
    tasksPerScope.push(noScope);
  }

  return tasksPerScope;
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
