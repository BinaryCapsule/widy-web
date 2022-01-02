import React, { forwardRef } from 'react';
import { Icon } from '@binarycapsule/ui-capsules';
import { Avatar } from '../../../Avatar/Avatar';
import { StyledButton } from './MenuTrigger.styles';

interface MenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  picture?: string;
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ picture, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} {...rest} aria-label="User Menu">
        <Avatar src={picture} alt="avatar" width="40px" height="40px" />
        <Icon icon="chev_down" size={18} />
      </StyledButton>
    );
  },
);

MenuTrigger.displayName = 'MenuTrigger';
