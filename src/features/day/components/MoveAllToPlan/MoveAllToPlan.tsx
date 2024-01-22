import React, { ComponentPropsWithoutRef } from 'react';
import { Button, Splash } from '@binarycapsule/ui-capsules';
import { useMoveAllToPlanMutation } from '../../api/useMoveAllToPlanMutation';

interface Props extends Pick<ComponentPropsWithoutRef<'button'>, 'style'> {
  dayId: number;
}

export const MoveAllToPlan: React.FC<Props> = ({ dayId, style }) => {
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
    <Button
      onClick={() => handleMoveAllToPlan()}
      variant="ghostGray"
      leftIcon="plus_c"
      style={style}
    >
      Add all to Plan
    </Button>
  );
};
