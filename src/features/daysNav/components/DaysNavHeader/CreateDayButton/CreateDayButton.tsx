import React from 'react';
import { useCreateDayMutation } from '../../../api/useCreateDayMutation';
import { useDaysQuery } from '../../../api/useDaysQuery';
import { Button } from '@binarycapsule/ui-capsules';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

export const CreateDayButton: React.FC = () => {
  const { mutateAsync: createDay, isLoading } = useCreateDayMutation();

  const { data } = useDaysQuery();

  if (!data) {
    return null;
  }

  const isTodayCreated = data.pages[0] && data.pages[0].items[0].day === today;

  const handleCreateDay = async () => {
    try {
      await createDay();
    } catch {
      // Ignore
    }
  };

  return (
    <Button
      leftIcon="plus"
      onClick={handleCreateDay}
      isLoading={isLoading}
      disabled={isTodayCreated}
    >
      Add day
    </Button>
  );
};
