import styled from '@emotion/styled/macro';
import { Box } from '@binarycapsule/ui-capsules';
import { ShadowProps, variant } from 'styled-system';
import {
  BorderProps,
  ColorProps,
  MarginProps,
  PropsWithPseudo,
} from '@binarycapsule/ui-capsules/dist/styledProps';

export const PlanTaskActions = styled.div({
  display: 'flex',
  height: 24,
  alignItems: 'center',
  visibility: 'hidden',
});

type Pseudo = '&:hover';

export type TaskVariant = 'todo' | 'completed' | 'active' | 'plan' | 'tomorrow';

interface StyledTaskProps {
  variant: TaskVariant;
  isSelected?: boolean;
}

export const StyledTask = styled(Box)<StyledTaskProps>(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    background: theme.colors.bg,
    borderRadius: theme.radii.medium,
    padding: 8,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights['500'],
    margin: '4px 0',
    borderColor: theme.colors.neutral['300'],
  }),

  ({ isSelected, theme }) =>
    variant<
      PropsWithPseudo<BorderProps & ColorProps & ShadowProps & MarginProps, Pseudo>,
      TaskVariant
    >({
      variants: {
        todo: {
          borderColor: isSelected ? 'yellow.500' : 'neutral.300',
          bg: isSelected ? 'yellow.50' : 'bg',

          '&:hover': {
            bg: isSelected ? 'yellow.100' : 'neutral.100',
          },
        },

        active: {
          borderColor: 'yellow.700',
          boxShadow: `0 0 0 4px ${theme.colors.yellow['200']}`,
          bg: isSelected ? 'yellow.50' : 'bg',

          '&:hover': {
            bg: isSelected ? 'yellow.100' : 'neutral.100',
          },
        },

        completed: {
          borderColor: isSelected ? 'yellow.500' : 'neutral.300',
          bg: isSelected ? 'yellow.50' : 'neutral.100',
        },

        plan: {
          my: 0,
          borderRadius: 'none',
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          bg: isSelected ? 'neutral.100' : 'bg',

          '&:hover': {
            bg: 'neutral.100',

            [`${PlanTaskActions}`]: {
              visibility: 'visible',
            },
          },
        },

        tomorrow: {
          my: 0,
        },
      },
    }),
);
