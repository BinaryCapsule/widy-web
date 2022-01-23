import { darkTheme, IllustratedIcon, styled } from '@binarycapsule/ui-capsules';

export const StyledLauncher = styled(IllustratedIcon, {
  '&&&': {
    svg: {
      path: {
        '&:first-of-type': {
          fill: '$neutral300',

          [`.${darkTheme} &`]: {
            fill: '$neutral400',
          },
        },

        '&:last-of-type': {
          fill: '$neutral500',

          [`.${darkTheme} &`]: {
            fill: '$neutral600',
          },
        },
      },
    },

    '&:hover': {
      svg: {
        path: {
          '&:first-of-type': {
            fill: '$primary200',

            [`.${darkTheme} &`]: {
              fill: '$primary400',
            },
          },

          '&:last-of-type': {
            fill: '$primary500',

            [`.${darkTheme} &`]: {
              fill: '$primary600',
            },
          },
        },
      },
    },
  },
});
