import React from 'react';
import { styled } from 'styled-components';
import { Flex, IllustratedIcon } from '@binarycapsule/ui-capsules';

const StyledSidebar = styled(Flex)(({ theme }) => ({
  flex: 1,
  background: theme.colors.tertiary50,
  display: 'none',
  borderLeft: `1px solid ${theme.colors.yellow100}`,
  alignItems: 'center',
  justifyContent: 'center',

  '.darkTheme &': {
    background: theme.colors.neutral100,
    borderLeft: `1px solid ${theme.colors.neutral200}`,
  },

  [theme.media.xl]: {
    display: 'flex',
  },
}));

const StyledIllustratedIcon = styled(IllustratedIcon)(({ theme }) => ({
  '&&&': {
    svg: {
      path: {
        '&:first-of-type': {
          fill: `${theme.colors.tertiary100} !important`,

          '.darkTheme &': {
            fill: `${theme.colors.neutral200} !important`,
          },
        },
        '&:last-of-type': {
          fill: `${theme.colors.tertiary100} !important`,

          '.darkTheme &': {
            fill: `${theme.colors.neutral200} !important`,
          },
        },
      },
    },
  },
}));

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <StyledIllustratedIcon icon="pie" size={128} />
    </StyledSidebar>
  );
};
