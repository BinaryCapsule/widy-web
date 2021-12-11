import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { useMoveAllToTomorrowMutation } from '../../api/useMoveAllToTomorrowMutation';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const MoveAllToTomorrow = () => {
  const { dayId } = useDayRouteParams();
  const { mutateAsync: moveAllToTomorrow } = useMoveAllToTomorrowMutation();

  const handleMoveAllToTomorrow = async () => {
    try {
      await moveAllToTomorrow({ dayId: Number(dayId) });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => handleMoveAllToTomorrow()}
      variant="ghostGray"
      leftIcon="calendar"
      iconVariant="outline"
    >
      Move all to "Tomorrow"
    </Button>
  );
};
