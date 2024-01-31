import React, { ComponentPropsWithoutRef } from 'react';
import { styled } from 'styled-components';

const StyledBadge = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '999px',
  height: 12,
  fontSize: '8px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '0 4px',
});

interface Props extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export const Badge = ({ children, ...rest }: Props) => {
  return <StyledBadge {...rest}>{children}</StyledBadge>;
};
