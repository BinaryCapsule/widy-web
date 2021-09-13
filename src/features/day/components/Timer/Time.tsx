import React from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';
import { getTotalTime } from '../../../../utils/time';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

interface Props extends MarginProps {
  time: number;
}

export const Time: React.FC<Props> = ({ time, ...rest }) => {
  const { hours, minutes, seconds } = getTotalTime(time);

  return (
    <Box display="flex" alignItems="baseline" {...rest}>
      {hours > 0 && (
        <>
          <Text fontSize="h4" mr="4">
            {hours}
          </Text>
          <Text mr="8">h</Text>
        </>
      )}
      <>
        <Text fontSize="h4" mr="4">
          {minutes}
        </Text>
        <Text mr="8">min</Text>
      </>
      <>
        <Text fontSize="h4" mr="4">
          {seconds}
        </Text>
        <Text mr="8">s</Text>
      </>
    </Box>
  );
};
