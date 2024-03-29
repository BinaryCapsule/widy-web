import React from 'react';
import moment from 'moment';
import { useCreateDayMutation } from '../../../api/useCreateDayMutation';
import { useDaysQuery } from '../../../api/useDaysQuery';
import { StyledButton } from './CreateDayButton.styles';

const today = moment().format('YYYY-MM-DD');

export const CreateDayButton: React.FC = () => {
  const { mutateAsync: createDay, isLoading } = useCreateDayMutation();

  const { data } = useDaysQuery();

  if (!data) {
    return null;
  }

  const firstDay = data.pages[0].items.length > 0 ? data.pages[0].items[0].day : null;

  const isTodayCreated = firstDay ? firstDay === today : false;

  const handleCreateDay = async () => {
    try {
      await createDay();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledButton
      leftIcon="plus"
      onClick={handleCreateDay}
      isLoading={isLoading}
      disabled={isTodayCreated}
      $noDays={!firstDay}
    >
      Add day
    </StyledButton>
  );
};
