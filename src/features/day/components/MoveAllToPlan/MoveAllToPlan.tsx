import React from 'react';
import { Button, CSSProp, Splash } from '@binarycapsule/ui-capsules';
import { useMoveAllToPlanMutation } from '../../api/useMoveAllToPlanMutation';

interface Props extends CSSProp {
  dayId: number;
}

export const MoveAllToPlan: React.FC<Props> = ({ dayId, css }) => {
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
    <Button onClick={() => handleMoveAllToPlan()} variant="ghostGray" leftIcon="plus_c" css={css}>
      Add all to Plan
    </Button>
  );
};
