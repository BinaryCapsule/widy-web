import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { TaskDto, useDayQuery } from '../../api/useDayQuery';
import { FormValues, validationSchema } from './MoveTask.meta';

interface UseMoveTaskParams {
  task: TaskDto;
}

export const useMoveTask = ({ task }: UseMoveTaskParams) => {
  const formBag = useForm<FormValues>({
    defaultValues: { sectionId: null },
    resolver: yupResolver(validationSchema),
  });

  const queryResult = useDayQuery();

  const data = useMemo(() => {
    if (!queryResult.data) {
      return null;
    }

    const {
      entities: { sections },
    } = queryResult.data;

    const sectionOpts = Object.values(sections)
      .sort((a, b) => a.rank - b.rank)
      .reduce((acc, cur) => {
        if (cur.id === task.sectionId) {
          return acc;
        }

        acc.push({
          id: cur.id,
          label: cur.title,
        });

        return acc;
      }, [] as { id: number; label: string }[]);

    return {
      selectedSectionId: formBag.watch('sectionId'),
      sectionOpts,
      formBag,
    };
  }, [formBag, queryResult.data, task.sectionId]);

  return {
    ...queryResult,
    data,
  };
};
