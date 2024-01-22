import React, { ComponentPropsWithoutRef } from 'react';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { CreateDayButton } from './CreateDayButton/CreateDayButton';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {}

export const DaysNavHeader = ({ style }: Props) => {
  return (
    <Flex $justify="between" $align="center" style={style}>
      <Text css={{ fontWeight: 600 }}>Days</Text>

      <CreateDayButton />
    </Flex>
  );
};
