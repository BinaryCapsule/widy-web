import React from 'react';
import { Box, Button, IllustratedIcon, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { useTheme } from '@emotion/react';
import { TaskDto } from '../../api/useDayQuery';
import { useMoveToPlanMutation } from '../../api/useMoveToPlanMutation';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

interface Props extends MarginProps {
  isButton?: boolean;
  dayId: number;
  task: TaskDto;
}

export const AddToPlan: React.FC<Props> = ({ isButton, dayId, task, ...rest }) => {
  const theme = useTheme();

  const { mutateAsync: moveToPlan } = useMoveToPlanMutation({ dayId });

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
        <Box display="flex" flexDirection="column" alignItems="flex-start" {...rest}>
          <Text variant="label" mb="4">
            Timer
          </Text>
          <Button
            variant="ghost"
            variantColor="neutral"
            leftIcon="plus_c"
            onClick={handleMoveToPlan}
          >
            Add to Plan
          </Button>
        </Box>
      ) : (
        <Tooltip content="Add task to Plan" delay={1000} placement="top">
          <IllustratedIcon
            icon="circle_add"
            onClick={handleMoveToPlan}
            primaryColor={theme.colors.neutral['300']}
            secondaryColor={theme.colors.neutral['500']}
            primaryColorHover={theme.colors.pink['100']}
            secondaryColorHover={theme.colors.pink['600']}
          />
        </Tooltip>
      )}
    </>
  );
};
