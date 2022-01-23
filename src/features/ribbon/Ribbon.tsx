import React from 'react';
import { Box, darkTheme, styled } from '@binarycapsule/ui-capsules';
import { useRibbon } from './useRibbon';

const StyledRibbon = styled(Box, {
  width: 12,
  height: '100%',
  background: '$neutral500',
  flexShrink: 0,

  [`.${darkTheme} &`]: {
    background: '$neutral300',
  },

  variants: {
    isActive: {
      true: {
        background: '$tertiary400',

        [`.${darkTheme} &`]: {
          background: '$tertiary300',
        },
      },
    },
  },
});

export const Ribbon = () => {
  const { isActive } = useRibbon();

  return <StyledRibbon isActive={isActive} />;
};
