import React from 'react';
import { darkTheme, Flex, IllustratedIcon, styled } from '@binarycapsule/ui-capsules';

const StyledSidebar = styled(Flex, {
  flex: 1,
  background: '$tertiary50',
  display: 'none',
  borderLeft: '1px solid $yellow100',

  [`.${darkTheme} &`]: {
    background: '$neutral100',
    borderLeft: '1px solid $neutral200',
  },

  '@xl': {
    display: 'flex',
  },
});

const StyledIllustratedIcon = styled(IllustratedIcon, {
  '&&&': {
    svg: {
      path: {
        '&:first-of-type': {
          fill: '$tertiary100 !important',

          [`.${darkTheme} &`]: {
            fill: '$neutral200 !important',
          },
        },
        '&:last-of-type': {
          fill: '$tertiary100 !important',

          [`.${darkTheme} &`]: {
            fill: '$neutral200 !important',
          },
        },
      },
    },
  },
});

export const Sidebar = () => {
  return (
    <StyledSidebar align="center" justify="center">
      <StyledIllustratedIcon icon="pie" size={128} />
    </StyledSidebar>
  );
};
