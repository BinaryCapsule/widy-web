import React from 'react';
import { Button, Splash } from '@binarycapsule/ui-capsules';
import { useMoveAllToPlanMutation } from '../../api/useMoveAllToPlanMutation';

interface Props {
  dayId: number;
}

export const MoveAllToPlan: React.FC<Props> = ({ dayId }) => {
  const { mutateAsync: moveAllToPlan, isLoading } = useMoveAllToPlanMutation({ dayId });

  const handleMoveAllToPlan = async () => {
    try {
      await moveAllToPlan({ dayId });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Splash variant="spinner">Adding to Plan</Splash>;
  }

  return (
    <Button onClick={() => handleMoveAllToPlan()} variant="ghostGray" leftIcon="plus_c">
      Add all to Plan
    </Button>
  );
};
