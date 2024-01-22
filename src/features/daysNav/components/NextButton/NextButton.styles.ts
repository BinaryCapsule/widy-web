import { styled } from 'styled-components';

interface StyledNextButtonProps {
  $isSelected: boolean;
}

export const StyledNextButton = styled.button<StyledNextButtonProps>(
  ({ theme }) => ({
    height: 32,
    borderRadius: '$medium',
    border: `1px dashed ${theme.colors.secondary200}`,
    background: '$bg',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: theme.colors.secondary700,
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    flexShrink: 0,
    userSelect: 'none',
    position: 'relative',
    width: '100%',

    '&:hover': {
      border: `1px dashed ${theme.colors.secondary700}`,

      '.darkTheme &': {
        border: `1px dashed ${theme.colors.secondary500}`,
      },
    },
  }),

  ({ $isSelected, theme }) => {
    if ($isSelected) {
      return {
        background: theme.colors.secondary50,

        '&::before': {
          content: '""',
          position: 'absolute',
          height: 18,
          width: 4,
          left: 0,
          top: 6,
          borderRadius: '0 2px 2px 0',
          background: theme.colors.secondary500,
        },
      };
    }

    return {};
  },
);
