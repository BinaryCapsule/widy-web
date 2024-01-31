import { css, keyframes, styled } from 'styled-components';
import { Button } from '@binarycapsule/ui-capsules';
import { ThemeType } from '../../../../../styled-components';

const ripple = ({ theme }: { theme: ThemeType }) =>
  keyframes({
    '0%': { boxShadow: `${theme.colors.primary500} 0px 0px 0px 0px` },
    '100%': { boxShadow: 'rgb(0 0 0 / 0%) 0px 0px 0px 10px' },
  });

interface StyledButtonProps {
  $noDays: boolean;
}

export const StyledButton = styled(Button)<StyledButtonProps>(
  ({ $noDays, theme }) => {
    if ($noDays) {
      return {
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(0.14, 1.17, 0.95, 0.99)',

        '&:focus': {
          outline: '2px solid',
          outlineColor: theme.colors.primary500,
          outlineOffset: '2px',
        },
      };
    }

    return {};
  },

  css`
    animation-name: ${ripple};
  `,
);
