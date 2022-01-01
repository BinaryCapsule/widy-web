import React from 'react';
import { Button, Splash } from '@binarycapsule/ui-capsules';
import { useMoveAllToTomorrowMutation } from '../../api/useMoveAllToTomorrowMutation';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const MoveAllToTomorrow = () => {
  const { dayId } = useDayRouteParams();

  const { mutateAsync: moveAllToTomorrow, isLoading } = useMoveAllToTomorrowMutation();

  const handleMoveAllToTomorrow = async () => {
    try {
      await moveAllToTomorrow({ dayId: Number(dayId) });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Splash variant="spinner">Moving to &quot;Next&quot;</Splash>;
  }

  return (
    <Button
      onClick={() => handleMoveAllToTomorrow()}
      variant="ghostGray"
      leftIcon="calendar"
      iconVariant="outline"
    >
      Move all to &quot;Next&quot;
    </Button>
  );
};
