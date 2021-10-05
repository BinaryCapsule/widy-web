import { ISection, SectionVariant, TaskDto } from '../api/useDayQuery';
import { TaskVariant } from '../components/Task/Task.styles';

export const getTaskVariant = (
  task: TaskDto,
  section: ISection,
  activeTaskId?: number | null,
): TaskVariant => {
  if (section.variant === SectionVariant.Plan) {
    return 'plan';
  }

  if (section.variant === SectionVariant.Tomorrow) {
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
