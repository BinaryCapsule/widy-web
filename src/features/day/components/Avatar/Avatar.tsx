import React from 'react';
import { styled } from 'styled-components';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Icon } from '@binarycapsule/ui-capsules';

const StyledAvatar = styled(AvatarPrimitive.Avatar)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 24,
  height: 24,
  borderRadius: '100%',
  backgroundColor: theme.colors.neutral100,
}));

const StyledImage = styled(AvatarPrimitive.Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const StyledFallback = styled(AvatarPrimitive.Fallback)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: theme.colors.neutral700,
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
}));

export const Avatar: React.FC<React.ComponentPropsWithoutRef<'img'>> = props => {
  return (
    <StyledAvatar>
      <StyledImage {...props} />

      <StyledFallback delayMs={600}>
        <Icon icon="user_circle" size={24} />
      </StyledFallback>
    </StyledAvatar>
  );
};
