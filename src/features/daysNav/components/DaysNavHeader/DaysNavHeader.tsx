import React from 'react';
import { CSSProp, Flex, Text } from '@binarycapsule/ui-capsules';
import { CreateDayButton } from './CreateDayButton/CreateDayButton';

export const DaysNavHeader: React.FC<CSSProp> = ({ css }) => {
  return (
    <Flex justify="between" align="center" css={css}>
      <Text css={{ fontWeight: 600 }}>Days</Text>

      <CreateDayButton />
    </Flex>
  );
};
