import React from 'react';
import { CSSProp, Flex } from '@binarycapsule/ui-capsules';
import { Link } from 'react-router-dom';
import { IconWidy, IconWidyText } from '../../../../icons/Widy';

export const Brand: React.FC<CSSProp> = ({ css }) => {
  return (
    <Link to="/day" aria-label="Widy home">
      <Flex align="end" css={css}>
        <IconWidy size={30} css={{ mr: '$2' }} />

        <IconWidyText size={60} />
      </Flex>
    </Link>
  );
};
