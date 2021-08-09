import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Button, IllustratedIcon, Tooltip } from '@binarycapsule/ui-capsules';

interface Props {
  size?: number;
  isButton?: boolean;
}

export const Launcher: React.FC<Props> = ({ size, isButton }) => {
  const [, setShowLaunchTaskModal] = useState(false);

  const { dayId } = useDayRouteParams();

  const theme = useTheme();

  if (!dayId) return null;

  return (
    <>
      <Tooltip content="Start working on this task" delay={1000} placement="bottom">
        {isButton ? (
          <Button
            leftIcon="rocket"
            variant="ghost"
            variantColor="neutral"
            onClick={() => setShowLaunchTaskModal(true)}
          >
            Launch task
          </Button>
        ) : (
          <IllustratedIcon
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
            primaryColor={theme.colors.neutral['200']}
            primaryColorHover={theme.colors.blue['100']}
            secondaryColor={theme.colors.neutral['400']}
            secondaryColorHover={theme.colors.blue['500']}
          />
        )}
      </Tooltip>
    </>
  );
};
