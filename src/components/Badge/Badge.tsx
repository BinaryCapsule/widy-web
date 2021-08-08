import React from 'react';
import styled from '@emotion/styled/macro';
import { Flex } from '@binarycapsule/ui-capsules';

const StyledBadge = styled(Flex)`
  align-items: center;
  border-radius: 999px;
  height: 12px;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0 4px;
`;

interface Props {
  color: string;
  bg: string;
}

export const Badge: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledBadge {...rest}>{children}</StyledBadge>;
};
