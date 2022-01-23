import { Box, darkTheme, styled, TruncatedText } from '@binarycapsule/ui-capsules';

export type TaskVariant = 'todo' | 'completed' | 'active' | 'plan' | 'tomorrow';

export const TaskSummary = styled(TruncatedText, {
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const StyledTask = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  background: '$bg',
  borderRadius: '$medium',
  padding: '8px 8px 8px 28px',
  fontSize: 'body',
  fontWeight: 500,
  borderColor: '$neutral300',
  height: 44,
  position: 'relative',

  variants: {
    isSelected: {
      true: {
        '&::before': {
          content: '""',
          position: 'absolute',
          height: 23,
          width: 4,
          left: 0,
          top: 10,
          borderRadius: '0 2px 2px 0',
          background: '$tertiary500',

          [`.${darkTheme} &`]: {
            background: '$primary500',
          },
        },
      },
    },

    isDragging: {
      true: {},
    },

    variant: {
      todo: {
        borderColor: '$neutral300',
        background: '$bg',

        '&:hover': {
          background: '$neutral100',
        },
      },

      active: {
        borderColor: '$tertiary100',
        boxShadow: '0 0 0 4px $colors$tertiary300',
        background: 'bg',

        '&:hover': {
          background: '$neutral100',
        },

        '&&&::before': {
          background: '$tertiary500',
        },
      },

      completed: {
        borderColor: '$neutral300',
        background: '$neutral100',
        color: '$neutral500',
      },

      plan: {
        my: 0,
        borderRadius: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        background: '$bg',
      },

      tomorrow: {
        my: 0,
        borderRadius: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        background: '$bg',
        p: 8,
      },
    },
  },

  compoundVariants: [
    {
      isSelected: true,
      variant: 'todo',
      css: {
        borderColor: '$tertiary500',
        background: '$tertiary50',

        '&:hover': {
          background: '$tertiary100',
        },

        [`.${darkTheme} &`]: {
          borderColor: '$primary500',
          background: '$neutral50',

          '&:hover': {
            background: '$neutral100',
          },
        },
      },
    },

    {
      isSelected: true,
      variant: 'active',
      css: {
        borderColor: '$tertiary500',
        background: '$tertiary50',

        '&:hover': {
          background: '$tertiary100',
        },

        [`.${darkTheme} &`]: {
          background: '$neutral50',

          '&:hover': {
            background: '$neutral100',
          },
        },
      },
    },

    {
      isSelected: true,
      variant: 'completed',
      css: {
        borderColor: '$tertiary500',
        background: '$tertiary50',

        [`.${darkTheme} &`]: {
          borderColor: '$primary500',
          background: '$neutral100',
        },
      },
    },

    {
      isSelected: true,
      variant: 'plan',
      css: {
        background: '$neutral100',

        [`.${darkTheme} &`]: {
          borderColor: '$primary500',
          borderTop: '1px solid $primary500',
          background: '$bg',
        },
      },
    },

    {
      isDragging: true,
      variant: 'plan',
      css: {
        borderRadius: 'medium',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
    },

    {
      isSelected: true,
      variant: 'tomorrow',
      css: {
        background: '$neutral100',

        '&&&::before': {
          background: '$secondary400',
        },

        [`.${darkTheme} &`]: {
          borderColor: '$secondary400',
          borderTopWidth: 1,
          background: '$bg',
        },
      },
    },

    {
      isDragging: true,
      variant: 'tomorrow',
      css: {
        borderRadius: 'medium',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
    },
  ],
});
