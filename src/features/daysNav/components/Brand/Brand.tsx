import React from 'react';
import { CSSProp, Flex } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../../../icons/Widy';

export const Brand: React.FC<CSSProp> = ({ css }) => {
  return (
    <Flex align="end" css={css}>
      <IconWidy size={30} yesterdayColor="#1960A6" css={{ mr: '$2' }} />

      <IconWidyText size={60} textColor="#1960A6" />
    </Flex>
  );
};
