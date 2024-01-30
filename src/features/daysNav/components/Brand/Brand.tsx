/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { ComponentPropsWithoutRef } from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { Link } from 'react-router-dom';
import { IconWidy, IconWidyText } from '../../../../icons/Widy';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {}

export const Brand: React.FC<Props> = ({ style }) => {
  return (
    <Link to="/day" aria-label="Widy home">
      <Flex align="end" style={style}>
        <IconWidy size={30} style={{ marginRight: 8 }} />

        <IconWidyText size={60} />
      </Flex>
    </Link>
  );
};
