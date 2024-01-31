import { styled } from 'styled-components';

export const Table = styled.table(({ theme }) => ({
  width: '100%',
  background: theme.colors.bg,
  fontFamily: theme.fonts.inter,
  fontWeight: 400,
  fontSize: theme.fontSizes.md,
  color: theme.colors.neutral700,
  borderCollapse: 'collapse',

  caption: {
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.lineHeights.lg,
    fontWeight: 600,
  },

  thead: {
    tr: {
      padding: '10px 16px',

      th: {
        fontWeight: 600,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        color: theme.colors.neutral500,
        letterSpacing: theme.letterSpacings.wide,
        textTransform: 'uppercase',
        background: theme.colors.neutral100,
        padding: '10px 24px',
        whiteSpace: 'nowrap',
        borderTop: `1px solid ${theme.colors.neutral200}`,
        borderBottom: `1px solid ${theme.colors.neutral200}`,

        '&:first-of-type': {
          paddingLeft: 16,
        },

        '&:last-of-type': {
          paddingRight: 16,
        },
      },
    },
  },

  tbody: {
    tr: {
      padding: '10px 16px',
      borderBottom: `1px solid ${theme.colors.neutral200}`,

      td: {
        fontWeight: 500,
        padding: '10px 24px',

        '&:first-of-type': {
          paddingLeft: 16,
        },

        '&:last-of-type': {
          paddingRight: 16,
        },
      },
    },
  },
}));
