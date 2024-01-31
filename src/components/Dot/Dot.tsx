import React, { ComponentPropsWithoutRef } from 'react';
import { styled } from 'styled-components';

interface StyledDotProps {
  $size: number;
  $borderColor?: string;
  $backgroundColor?: string;
}

const StyledDot = styled.div<StyledDotProps>(({ $size, $backgroundColor, $borderColor }) => ({
  width: $size,
  height: $size,
  borderRadius: $size / 2,
  backgroundColor: $backgroundColor,
  borderColor: $backgroundColor,
  borderStyle: $borderColor ? 'solid' : 'none',
  borderWidth: $borderColor ? 1 : 0,
}));

interface Props extends ComponentPropsWithoutRef<'div'> {
  size?: number;
  borderColor?: string;
  backgroundColor?: string;
}

export const Dot: React.FC<Props> = ({ size = 12, backgroundColor, borderColor, ...rest }) => {
  return (
    <StyledDot
      {...rest}
      $size={size}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
    />
  );
};
