import { useDayQuery } from '../api/useDayQuery';
import { RANK_BLOCK_SIZE } from '../Day.constants';
import { getSectionTasks } from '../utils/getSectionTasks';

export const useTaskRank = () => {
  const { data } = useDayQuery();

  if (!data) {
    return {
      getTaskRank: () => 0,
    };
  }

  const {
    entities: { tasks },
  } = data;

  return {
    getTaskRank: (sectionId: number, previousTaskId?: number) => {
      if (!tasks) {
        return RANK_BLOCK_SIZE;
      }

      const sectionTasks = getSectionTasks(sectionId, tasks);

      let previousTaskRank;

      if (previousTaskId) {
        previousTaskRank = tasks[previousTaskId] ? tasks[previousTaskId].rank : undefined;
      } else {
        const lastTask = sectionTasks.length > 0 ? sectionTasks[sectionTasks.length - 1] : null;

        previousTaskRank = lastTask && tasks[lastTask.id] ? tasks[lastTask.id].rank : null;
      }

      let afterTaskRank;

      if (sectionTasks.length > 1 && previousTaskId) {
        const afterTaskIndex = sectionTasks.findIndex(({ id }) => previousTaskId === id);

        if (afterTaskIndex > -1) {
          const afterTaskId = sectionTasks[afterTaskIndex + 1].id;

          const afterTask = tasks[afterTaskId];

          afterTaskRank = afterTask ? afterTask.rank : undefined;
        }
      }

      if (previousTaskRank && afterTaskRank) {
        return (previousTaskRank + afterTaskRank) / 2;
      }

      if (previousTaskRank) {
        return previousTaskRank + RANK_BLOCK_SIZE;
      }

      return RANK_BLOCK_SIZE;
    },
  };
};
