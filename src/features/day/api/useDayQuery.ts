import { useQuery } from 'react-query';
import { normalize, schema } from 'normalizr';
import { useAuthFetch } from '../../../util/useAuthFetch';
import { useDayRouteParams } from '../hooks/useDayRouteParams';
import { queryKeys } from './queryKeys';

const scopeSchema = new schema.Entity('scope');

const taskSchema = new schema.Entity('tasks', {
  scope: scopeSchema,
});

const sectionSchema = new schema.Entity('sections', {
  tasks: [taskSchema],
});

const daySchema = new schema.Entity('day', {
  sections: [sectionSchema],
});

interface ScopeDto {
  id: number;
  name: string;
  shortCode: string;
  isArchived: boolean;
}

export interface TaskDto {
  id: number;
  summary: string;
  notes: string;
  time: number;
  isDone: boolean;
  start: string | null;
  scope: ScopeDto | null;
  rank: number;
}

export interface SectionDto {
  id: number;
  title: string;
  isPlan: boolean;
  isTomorrow: boolean;
  rank: number;
  tasks: TaskDto[];
}

interface DayDto {
  id: number;
  day: string;
  sections: SectionDto[];
}

export type ITask = Omit<TaskDto, 'id'> & { id: string | number };

export type ISection = Omit<SectionDto, 'tasks'> & { tasks: number[] };

interface IDay {
  entities: {
    scope?: Record<number, ScopeDto>;
    tasks?: Record<number, ITask>;
    sections: Record<number, Omit<SectionDto, 'tasks'> & { tasks: number[] }>;
    day: Record<number, Omit<DayDto, 'sections'> & { sections: number[] }>;
  };
  result: number;
}

export const useDayQuery = () => {
  const { dayId } = useDayRouteParams();

  const { authFetch } = useAuthFetch();

  const fetchDay = async (dayId: string): Promise<IDay> => {
    const data = await authFetch(`/api/days/${dayId}`);

    return normalize(data, daySchema);
  };

  const queryKey = queryKeys.day(dayId);

  return useQuery<IDay, Error>(queryKey, () => fetchDay(dayId), { enabled: !!dayId });
};
