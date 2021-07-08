import { ISection, ITask, TaskDto } from '../api/useDayQuery';
import { TaskVariant } from '../components/Task/Task.styles';

export const getTaskVariant = (
  task: ITask,
  section: ISection,
  activeTask?: TaskDto,
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

  if (task.id === '__temp') {
    return 'temp';
  }

  if (task.id === activeTask?.id) {
    return 'active';
  }

  return 'todo';
};
