import { ISection, TaskDto } from '../api/useDayQuery';
import { TaskVariant } from '../components/Task/Task.styles';

export const getTaskVariant = (
  task: TaskDto,
  section: ISection,
  activeTaskId?: number | null,
): TaskVariant => {
  if (section.isPlan) {
    return 'plan';
  }

  if (section.isTomorrow) {
    return 'tomorrow';
  }

  if (task.isDone) {
    return 'completed';
  }

  if (task.id === activeTaskId) {
    return 'active';
  }

  return 'todo';
};
