import { useDayQuery } from '../api/useDayQuery';
import { RANK_BLOCK_SIZE } from '../Day.constants';
import { getSectionTasks } from '../utils/getSectionTasks';
import { useTomorrowQuery } from '../api/useTomorrowQuery';
import { useDayRouteParams } from './useDayRouteParams';
import { useMemo } from 'react';

interface GetTaskRankParams {
  sectionId: number;
  isAppend?: boolean;
  previousTaskId?: number;
}

export const useTaskRank = () => {
  const { data: dayData } = useDayQuery();
  const { data: tomorrowData } = useTomorrowQuery();
  const { dayId } = useDayRouteParams();

  const tasks = useMemo(() => {
    if (dayId === 'tomorrow') {
      if (!tomorrowData) {
        return null;
      }

      const {
        entities: { tasks: tomorrowTasks },
      } = tomorrowData;

      return tomorrowTasks;
    }

    if (!dayData) {
      return null;
    }

    const {
      entities: { tasks: sectionTasks },
    } = dayData;

    return sectionTasks;
  }, [dayData, dayId, tomorrowData]);

  return {
    getTaskRank: ({ sectionId, previousTaskId, isAppend }: GetTaskRankParams) => {
      if (!tasks) {
        return RANK_BLOCK_SIZE;
      }

      const sectionTasks = getSectionTasks(sectionId, tasks);

      if (sectionTasks.length === 0) {
        return RANK_BLOCK_SIZE;
      }

      if (isAppend) {
        const lastTask = sectionTasks.length > 0 ? sectionTasks[sectionTasks.length - 1] : null;

        return lastTask && tasks[lastTask.id]
          ? tasks[lastTask.id].rank + RANK_BLOCK_SIZE
          : RANK_BLOCK_SIZE;
      }

      let previousTaskRank;

      if (previousTaskId) {
        previousTaskRank = tasks[previousTaskId] ? tasks[previousTaskId].rank : undefined;
      }

      const afterTaskIndex = previousTaskId
        ? sectionTasks.findIndex(({ id }) => previousTaskId === id) + 1
        : 0;

      const afterTaskId =
        afterTaskIndex < sectionTasks.length ? sectionTasks[afterTaskIndex].id : null;

      const afterTask = afterTaskId !== null ? tasks[afterTaskId] : null;

      const afterTaskRank = afterTask ? afterTask.rank : undefined;

      if (previousTaskRank && afterTaskRank) {
        return Math.floor((previousTaskRank + afterTaskRank) / 2);
      }

      if (previousTaskRank) {
        return previousTaskRank + RANK_BLOCK_SIZE;
      }

      if (afterTaskRank) {
        return Math.floor(afterTaskRank / 2);
      }

      return RANK_BLOCK_SIZE;
    },
  };
};
