import React, { ComponentPropsWithoutRef } from 'react';
import { Button, Flex, IllustratedIcon, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { useMoveToPlanMutation } from '../../api/useMoveToPlanMutation';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  isButton?: boolean;
  dayId: number;
  task: TaskDto;
}

export const AddToPlan: React.FC<Props> = ({ isButton, dayId, task, style }) => {
  const { mutateAsync: moveToPlan, isLoading } = useMoveToPlanMutation({ dayId });

  const handleMoveToPlan = async () => {
    try {
      await moveToPlan({ task, dayId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isButton ? (
        <Flex $direction="column" $align="start" style={style}>
          <Text variant="label" style={{ marginBottom: 4 }}>
            Timer
          </Text>
          <Button
            variant="ghostGray"
            leftIcon="plus_c"
            onClick={handleMoveToPlan}
            isLoading={isLoading}
          >
            Add to Plan
          </Button>
        </Flex>
      ) : (
        <Tooltip label="Add task to Plan">
          <IllustratedIcon
            icon="circle_add"
            onClick={handleMoveToPlan}
            primaryColor="neutral300"
            secondaryColor="neutral500"
            primaryColorHover="pink100"
            secondaryColorHover="pink600"
            disabled={isLoading}
            style={{
              margin: '0 4px',
              opacity: isLoading ? 0.5 : 1,
              pointerEvents: isLoading ? 'none' : 'initial',
            }}
          />
        </Tooltip>
      )}
    </>
  );
};
