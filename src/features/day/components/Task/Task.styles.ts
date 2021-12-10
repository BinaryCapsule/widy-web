import { Box, TruncatedText, styled } from '@binarycapsule/ui-capsules';

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
  padding: '8px 8px 8px 24px',
  fontSize: 'body',
  fontWeight: 500,
  borderColor: '$neutral300',
  height: 44,

  variants: {
    isSelected: {
      true: {},
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
        borderColor: '$yellow700',
        boxShadow: '0 0 0 4px $colors$yellow200',
        background: 'bg',

        '&:hover': {
          background: '$neutral100',
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
        borderColor: '$yellow500',
        background: '$yellow50',

        '&:hover': {
          background: '$yellow100',
        },
      },
    },

    {
      isSelected: true,
      variant: 'active',
      css: {
        background: '$yellow50',

        '&:hover': {
          background: '$yellow100',
        },
      },
    },

    {
      isSelected: true,
      variant: 'completed',
      css: {
        borderColor: '$yellow500',
        background: '$yellow50',
      },
    },

    {
      isSelected: true,
      variant: 'plan',
      css: {
        background: '$neutral100',
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
