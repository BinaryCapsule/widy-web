import { Button, keyframes, styled } from '@binarycapsule/ui-capsules';

const ripple = keyframes({
  '0%': { boxShadow: '$colors$primary500 0px 0px 0px 0px' },
  '100%': { boxShadow: 'rgb(0 0 0 / 0%) 0px 0px 0px 10px' },
});

export const StyledButton = styled(Button, {
  variants: {
    noDays: {
      true: {
        animationName: `${ripple}`,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(0.14, 1.17, 0.95, 0.99)',

        '&:focus': {
          outline: '2px solid',
          outlineColor: '$colors$primary500',
          outlineOffset: '2px',
        },
      },
    },
  },
});
