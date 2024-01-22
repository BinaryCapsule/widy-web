import { styled } from 'styled-components';
import { Box, TruncatedText } from '@binarycapsule/ui-capsules';

export type TaskVariant = 'todo' | 'completed' | 'active' | 'plan' | 'tomorrow';

export const TaskSummary = styled(TruncatedText)({
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
});

interface StyledTaskProps {
  $isSelected: boolean;
  $isDragging: boolean;
  $variant: TaskVariant;
}

export const StyledTask = styled(Box)<StyledTaskProps>(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    background: '$bg',
    borderRadius: theme.radii.medium,
    padding: '8px 8px 8px 28px',
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    borderColor: theme.colors.neutral300,
    height: 44,
    position: 'relative',
  }),

  ({ $isSelected, theme }) => {
    if ($isSelected) {
      return {
        '&::before': {
          content: '""',
          position: 'absolute',
          height: 23,
          width: 4,
          left: 0,
          top: 10,
          borderRadius: '0 2px 2px 0',
          background: theme.colors.tertiary500,

          '.darkTheme &': {
            background: theme.colors.primary500,
          },
        },
      };
    }

    return {};
  },

  ({ $variant, theme }) => {
    switch ($variant) {
      case 'todo':
        return {
          borderColor: theme.colors.neutral300,
          background: theme.colors.bg,

          '&:hover': {
            background: '$neutral100',
          },
        };

      case 'active':
        return {
          borderColor: theme.colors.tertiary100,
          boxShadow: `0 0 0 4px ${theme.colors.tertiary300}`,
          background: 'bg',

          '&:hover': {
            background: theme.colors.neutral100,
          },

          '&&&::before': {
            background: theme.colors.tertiary500,
          },
        };

      case 'completed':
        return {
          borderColor: theme.colors.neutral300,
          background: theme.colors.neutral100,
          color: theme.colors.neutral500,
        };

      case 'plan': {
        return {
          marginTop: 0,
          marginBottom: 0,
          borderRadius: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopColor: 'transparent',
          background: theme.colors.bg,
        };
      }

      case 'tomorrow': {
        return {
          marginTop: 0,
          marginBottom: 0,
          borderRadius: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          background: theme.colors.bg,
          borderTopColor: 'transparent',
          padding: 8,
        };
      }
      default:
        return {};
    }
  },

  ({ $variant, $isSelected, theme }) => {
    switch ($variant) {
      case 'todo':
        if ($isSelected) {
          return {
            borderColor: theme.colors.tertiary500,
            background: theme.colors.tertiary50,

            '&:hover': {
              background: theme.colors.tertiary100,
            },

            '.darkTheme &': {
              borderColor: theme.colors.primary500,
              background: theme.colors.neutral50,

              '&:hover': {
                background: theme.colors.neutral100,
              },
            },
          };
        }

        return {};

      case 'active':
        if ($isSelected) {
          return {
            borderColor: theme.colors.tertiary500,
            background: theme.colors.tertiary50,

            '&:hover': {
              background: theme.colors.tertiary100,
            },

            '.darkTheme &': {
              background: theme.colors.neutral50,

              '&:hover': {
                background: theme.colors.neutral100,
              },
            },
          };
        }

        return {};

      case 'completed':
        if ($isSelected) {
          return {
            borderColor: theme.colors.tertiary500,
            background: theme.colors.tertiary50,

            '.darkTheme &': {
              borderColor: theme.colors.primary500,
              background: theme.colors.neutral100,
            },
          };
        }

        return {};

      case 'plan': {
        if ($isSelected) {
          return {
            background: theme.colors.neutral100,

            '.darkTheme &': {
              borderColor: theme.colors.primary500,
              borderTop: `1px solid ${theme.colors.primary500}`,
              background: theme.colors.bg,
            },
          };
        }

        return {};
      }

      case 'tomorrow': {
        if ($isSelected) {
          return {
            background: theme.colors.neutral100,

            '&&&::before': {
              background: theme.colors.secondary400,
            },

            '.darkTheme &': {
              borderColor: theme.colors.secondary400,
              borderTopWidth: 1,
              background: theme.colors.bg,
            },
          };
        }

        return {};
      }

      default:
        return {};
    }
  },

  ({ $variant, $isDragging, theme }) => {
    switch ($variant) {
      case 'plan':
        if ($isDragging) {
          return {
            borderRadius: 'medium',
            borderTopWidth: 1,
            borderTopColor: theme.colors.neutral300,
          };
        }

        return {};

      case 'tomorrow':
        if ($isDragging) {
          return {
            borderRadius: 'medium',
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          };
        }

        return {};

      default:
        return {};
    }
  },
);
