import React from 'react';
import { styled } from 'styled-components';
import { Box } from '@binarycapsule/ui-capsules';
import { useRibbon } from './useRibbon';

interface StyledRibbonProps {
  $isActive: boolean;
}

const StyledRibbon = styled(Box)<StyledRibbonProps>(
  ({ theme }) => ({
    width: 12,
    height: '100%',
    background: theme.colors.neutral500,
    flexShrink: 0,
    display: 'none',

    '.darkTheme &': {
      background: theme.colors.neutral300,
    },

    [theme.media.md]: {
      display: 'block',
    },
  }),

  ({ $isActive, theme }) => {
    if ($isActive) {
      return {
        background: theme.colors.tertiary400,

        '.darkTheme &': {
          background: theme.colors.tertiary300,
        },
      };
    }

    return {};
  },
);

export const Ribbon = () => {
  const { isActive } = useRibbon();

  return <StyledRibbon $isActive={isActive} />;
};
