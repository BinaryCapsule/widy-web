import { useDayQuery } from '../api/useDayQuery';
import { RANK_BLOCK_SIZE } from '../Day.constants';

export const useTaskRank = () => {
  const { data } = useDayQuery();

  if (!data) {
    return {
      getTaskRank: () => 0,
    };
  }

  const {
    entities: { sections, tasks },
  } = data;

  return {
    getTaskRank: (sectionId: number, previousTaskId?: number) => {
      if (!tasks) {
        return RANK_BLOCK_SIZE;
      }

      const sectionTasks = sections[sectionId].tasks;

      let previousTaskRank;

      if (previousTaskId) {
        previousTaskRank = tasks[previousTaskId] ? tasks[previousTaskId].rank : undefined;
      } else {
        const section = sections[sectionId];

        const lastTaskId = section.tasks[section.tasks.length - 1];

        previousTaskRank = tasks[lastTaskId] ? tasks[lastTaskId].rank : null;
      }

      let afterTaskRank;

      if (sectionTasks.length > 1 && previousTaskId) {
        const afterTaskIndex = sectionTasks.findIndex(id => previousTaskId === id);

        if (afterTaskIndex > -1) {
          const afterTaskId = sectionTasks[afterTaskIndex + 1];

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
