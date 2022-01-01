import { styled } from '@binarycapsule/ui-capsules';

export const Table = styled('table', {
  width: '100%',
  background: '$bg',
  fontFamily: '$inter',
  fontWeight: 400,
  fontSize: '$2',
  color: '$neutral700',
  borderCollapse: 'collapse',

  caption: {
    fontSize: '$3',
    lineHeight: '$3',
    fontWeight: 600,
  },

  thead: {
    tr: {
      padding: '10px 16px',

      th: {
        fontWeight: 600,
        fontSize: '$1',
        lineHeight: '$1',
        color: '$neutral500',
        letterSpacing: '$wide',
        textTransform: 'uppercase',
        background: '$neutral100',
        padding: '10px 24px',
        whiteSpace: 'nowrap',
        borderTop: '1px solid $colors$neutral200',
        borderBottom: '1px solid $colors$neutral200',

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
      borderBottom: '1px solid $colors$neutral200',

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
});