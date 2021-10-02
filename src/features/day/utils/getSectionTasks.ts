import { TaskDto } from '../api/useDayQuery';

export const getSectionTasks = (sectionId: number, tasks?: Record<number, TaskDto>) => {
  if (!tasks) {
    return [];
  }

  return Object.values(tasks)
    .filter(({ sectionId: _sectionId }) => sectionId === _sectionId)
    .sort((a, b) => a.rank - b.rank);
};
