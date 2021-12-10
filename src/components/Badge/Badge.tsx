import React from 'react';
import { CSSProp, styled } from '@binarycapsule/ui-capsules';

const StyledBadge = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '999px',
  height: 12,
  fontSize: '8px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '0 4px',
});

export const Badge: React.FC<CSSProp> = ({ children, css }) => {
  return <StyledBadge css={css}>{children}</StyledBadge>;
};
