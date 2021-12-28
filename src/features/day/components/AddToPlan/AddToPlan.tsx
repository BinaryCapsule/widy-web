import React from 'react';
import { Button, CSSProp, Flex, IllustratedIcon, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { useMoveToPlanMutation } from '../../api/useMoveToPlanMutation';

interface Props extends CSSProp {
  isButton?: boolean;
  dayId: number;
  task: TaskDto;
}

export const AddToPlan: React.FC<Props> = ({ isButton, dayId, task, css }) => {
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
        <Flex direction="column" align="start" css={css}>
          <Text variant="label" css={{ mb: '$1' }}>
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
            primaryColor="$neutral300"
            secondaryColor="$neutral500"
            primaryColorHover="$pink100"
            secondaryColorHover="$pink600"
            disabled={isLoading}
            css={{
              mx: '$1',
              opacity: isLoading ? 0.5 : 1,
              pointerEvents: isLoading ? 'none' : 'initial',
            }}
          />
        </Tooltip>
      )}
    </>
  );
};
