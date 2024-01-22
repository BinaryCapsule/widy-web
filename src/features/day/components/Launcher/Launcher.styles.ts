import { styled } from 'styled-components';
import { darkTheme, IllustratedIcon } from '@binarycapsule/ui-capsules';

export const StyledLauncher = styled(IllustratedIcon)(({ theme }) => ({
  '&&&': {
    svg: {
      path: {
        '&:first-of-type': {
          fill: theme.colors.neutral300,

          [`.${darkTheme} &`]: {
            fill: theme.colors.neutral400,
          },
        },

        '&:last-of-type': {
          fill: theme.colors.neutral500,

          [`.${darkTheme} &`]: {
            fill: theme.colors.neutral600,
          },
        },
      },
    },

    '&:hover': {
      svg: {
        path: {
          '&:first-of-type': {
            fill: theme.colors.primary200,

            [`.${darkTheme} &`]: {
              fill: theme.colors.primary400,
            },
          },

          '&:last-of-type': {
            fill: theme.colors.primary500,

            [`.${darkTheme} &`]: {
              fill: theme.colors.primary600,
            },
          },
        },
      },
    },
  },
}));
