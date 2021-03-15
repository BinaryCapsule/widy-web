import React from 'react';
import { useTheme } from '@emotion/react';
import { Splash } from '@binarycapsule/ui-capsules';
import { IconWidyText } from '../../icons/Widy';

export const SplashScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <Splash variant="splash">
      <IconWidyText size={125} textColor={theme.colors.blue['600']} />
    </Splash>
  );
};
