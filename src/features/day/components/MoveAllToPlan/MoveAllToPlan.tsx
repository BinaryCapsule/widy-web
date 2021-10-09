import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { useMoveAllToPlanMutation } from '../../api/useMoveAllToPlanMutation';

interface Props {
  dayId: number;
}

export const MoveAllToPlan: React.FC<Props> = ({ dayId }) => {
  const { mutateAsync: moveAllToPlan } = useMoveAllToPlanMutation({ dayId });

  const handleMoveAllToPlan = async () => {
    try {
      await moveAllToPlan({ dayId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => handleMoveAllToPlan()}
      variant="ghost"
      variantColor="neutral"
      leftIcon="plus_c"
    >
      Add all to Plan
    </Button>
  );
};
