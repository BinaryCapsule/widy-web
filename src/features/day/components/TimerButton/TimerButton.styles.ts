import { darkTheme, IllustratedIcon, styled } from '@binarycapsule/ui-capsules';

export const StyledTimerButton = styled(IllustratedIcon, {
  '&&&': {
    svg: {
      path: {
        '&:first-of-type': {
          fill: '$neutral300',

          [`.${darkTheme} &`]: {
            fill: '$neutral600',
          },
        },

        '&:last-of-type': {
          fill: '$neutral600',

          [`.${darkTheme} &`]: {
            fill: '$neutral100',
          },
        },
      },
    },

    '&:hover': {
      svg: {
        path: {
          '&:first-of-type': {
            fill: '$neutral400',

            [`.${darkTheme} &`]: {
              fill: '$neutral400',
            },
          },

          '&:last-of-type': {
            fill: '$neutral700',

            [`.${darkTheme} &`]: {
              fill: '$neutral700',
            },
          },
        },
      },
    },
  },

  variants: {
    isActive: {
      true: {
        '&&&': {
          svg: {
            path: {
              '&:first-of-type': {
                fill: '$tertiary400',

                [`.${darkTheme} &`]: {
                  fill: '$tertiary400',
                },
              },

              '&:last-of-type': {
                fill: '$tertiary900',

                [`.${darkTheme} &`]: {
                  fill: '$neutral50',
                },
              },
            },
          },

          '&:hover': {
            svg: {
              path: {
                '&:first-of-type': {
                  fill: '$tertiary500',

                  [`.${darkTheme} &`]: {
                    fill: '$tertiary500',
                  },
                },

                '&:last-of-type': {
                  fill: '$tertiary900',

                  [`.${darkTheme} &`]: {
                    fill: '$neutral50',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
