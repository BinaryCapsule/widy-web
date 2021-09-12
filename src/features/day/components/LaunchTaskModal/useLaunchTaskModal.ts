import { useForm } from 'react-hook-form';
import { FormValues, validationSchema } from './LaunchTaskModal.meta';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useDayQuery } from '../../api/useDayQuery';

export const useLaunchTaskModal = () => {
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
        if (cur.isPlan) {
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
  }, [formBag, queryResult.data]);

  return {
    ...queryResult,
    data,
  };
};
