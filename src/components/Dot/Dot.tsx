import React from 'react';
import { CSSProp, styled } from '@binarycapsule/ui-capsules';

const StyledDot = styled('div');

interface Props extends CSSProp {
  size?: number;
  borderColor?: string;
  backgroundColor?: string;
}

export const Dot: React.FC<Props> = ({ size = 12, backgroundColor, borderColor, css }) => {
  return (
    <StyledDot
      css={{
        ...css,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        borderColor,
        borderStyle: borderColor ? 'solid' : 'none',
        borderWidth: borderColor ? 1 : 0,
      }}
    />
  );
};
