import React, { ComponentPropsWithoutRef } from 'react';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { getTotalTime } from '../../../../../../utils/time';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  time: number;
}

export const Time = ({ time, style }: Props) => {
  const { hours, minutes, seconds } = getTotalTime(time);

  return (
    <Flex $align="baseline" style={style}>
      {hours > 0 && (
        <>
          <Text size="xl" style={{ marginRight: 4 }}>
            {hours}
          </Text>
          <Text style={{ marginRight: 8 }}>h</Text>
        </>
      )}
      <>
        <Text size="xl" style={{ marginRight: 4 }}>
          {minutes}
        </Text>
        <Text css={{ marginRight: 8 }}>min</Text>
      </>
      <>
        <Text size="xl" style={{ marginRight: 4 }}>
          {seconds}
        </Text>
        <Text style={{ marginRight: 8 }}>s</Text>
      </>
    </Flex>
  );
};
