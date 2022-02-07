import React from 'react';
import { CSSProp, Flex, Text } from '@binarycapsule/ui-capsules';
import { getTotalTime } from '../../../../../../utils/time';

interface Props extends CSSProp {
  time: number;
}

export const Time: React.FC<Props> = ({ time, css }) => {
  const { hours, minutes, seconds } = getTotalTime(time);

  return (
    <Flex align="baseline" css={css}>
      {hours > 0 && (
        <>
          <Text size="xl" css={{ mr: '$1' }}>
            {hours}
          </Text>
          <Text css={{ mr: '$2' }}>h</Text>
        </>
      )}
      <>
        <Text size="xl" css={{ mr: '$1' }}>
          {minutes}
        </Text>
        <Text css={{ mr: '$2' }}>min</Text>
      </>
      <>
        <Text size="xl" css={{ mr: '$1' }}>
          {seconds}
        </Text>
        <Text css={{ mr: '$2' }}>s</Text>
      </>
    </Flex>
  );
};
