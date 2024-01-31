import React from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '@binarycapsule/ui-capsules';
import { StyledSidebar } from './Sidebar.styles';

export const Sidebar = () => {
  const theme = useTheme();

  return (
    <StyledSidebar>
      <Icon
        icon="cog"
        size={100}
        style={{
          color: theme.colors.neutral300,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100px',
          height: '100px',
          margin: 'auto',
        }}
      />
    </StyledSidebar>
  );
};
