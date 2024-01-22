import { styled } from 'styled-components';
import { darkTheme, IllustratedIcon } from '@binarycapsule/ui-capsules';

interface StyledTimerButtonProps {
  $isActive: boolean;
}

export const StyledTimerButton = styled(IllustratedIcon)<StyledTimerButtonProps>(
  ({ theme }) => ({
    '&&&': {
      svg: {
        path: {
          '&:first-of-type': {
            fill: theme.colors.neutral300,

            [`.${darkTheme} &`]: {
              fill: theme.colors.neutral600,
            },
          },

          '&:last-of-type': {
            fill: theme.colors.neutral600,

            [`.${darkTheme} &`]: {
              fill: theme.colors.neutral100,
            },
          },
        },
      },

      '&:hover': {
        svg: {
          path: {
            '&:first-of-type': {
              fill: theme.colors.neutral400,

              [`.${darkTheme} &`]: {
                fill: theme.colors.neutral400,
              },
            },

            '&:last-of-type': {
              fill: theme.colors.neutral700,

              [`.${darkTheme} &`]: {
                fill: theme.colors.neutral700,
              },
            },
          },
        },
      },
    },
  }),

  ({ $isActive, theme }) => {
    if ($isActive) {
      return {
        '&&&': {
          svg: {
            path: {
              '&:first-of-type': {
                fill: theme.colors.tertiary400,

                [`.${darkTheme} &`]: {
                  fill: theme.colors.tertiary400,
                },
              },

              '&:last-of-type': {
                fill: theme.colors.tertiary900,

                [`.${darkTheme} &`]: {
                  fill: theme.colors.neutral50,
                },
              },
            },
          },

          '&:hover': {
            svg: {
              path: {
                '&:first-of-type': {
                  fill: theme.colors.tertiary500,

                  [`.${darkTheme} &`]: {
                    fill: theme.colors.tertiary500,
                  },
                },

                '&:last-of-type': {
                  fill: theme.colors.tertiary900,

                  [`.${darkTheme} &`]: {
                    fill: theme.colors.neutral50,
                  },
                },
              },
            },
          },
        },
      };
    }

    return {};
  },
);
