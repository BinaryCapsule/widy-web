import { styled } from 'styled-components';

export const StyledDayButton = styled.div(({ theme }) => ({
  height: 42,
  borderRadius: theme.radii.medium,
  border: `1px solid ${theme.colors.neutral200}`,
  background: theme.colors.bg,
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: theme.colors.neutral700,
  padding: '0 8px 0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
  position: 'relative',

  '@media (hover: hover)': {
    '&:hover': {
      background: theme.colors.primary200,
    },
  },
}));

interface ContentProps {
  $isToday: boolean;
}

export const Content = styled.div<ContentProps>(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  ({ $isToday }) => {
    if ($isToday) {
      return {
        marginTop: 4,
      };
    }

    return {};
  },
);

export const StyledInput = styled.input(({ theme }) => ({
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  height: 0,
  width: 0,

  '&[data-focus-visible-added]:focus': {
    '& ~ .day-button': {
      outline: 'none',
      boxShadow: `0 0 0 4px ${theme.colors.primary300}`,
    },
  },

  '&:checked': {
    '~ .day-button': {
      background: theme.colors.primary200,
      color: theme.colors.primary800,
      borderColor: theme.colors.primary200,

      '&::before': {
        content: '""',
        position: 'absolute',
        height: 24,
        width: 4,
        left: 0,
        top: 8,
        borderRadius: '0 2px 2px 0',
        background: theme.colors.primary500,
      },
    },
  },
}));
