import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Button, IllustratedIcon, Tooltip } from '@binarycapsule/ui-capsules';
import { LaunchTaskModal } from '../LaunchTaskModal/LaunchTaskModal';

interface Props {
  size?: number;
  isButton?: boolean;
}

export const Launcher: React.FC<Props> = ({ size, isButton }) => {
  const [showLaunchTaskModal, setShowLaunchTaskModal] = useState(false);

  const { dayId } = useDayRouteParams();

  const theme = useTheme();

  if (!dayId) return null;

  return (
    <>
      <Tooltip
        content="Start working on this task"
        delay={1000}
        placement="bottom"
        trigger="mouseenter"
      >
        {isButton ? (
          <Button
            leftIcon="rocket"
            variant="ghost"
            variantColor="neutral"
            onClick={() => setShowLaunchTaskModal(true)}
            aria-label="Start working on this task"
          >
            Launch task
          </Button>
        ) : (
          <IllustratedIcon
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
            primaryColor={theme.colors.neutral['300']}
            primaryColorHover={theme.colors.blue['200']}
            secondaryColor={theme.colors.neutral['500']}
            secondaryColorHover={theme.colors.blue['600']}
          />
        )}
      </Tooltip>

      {showLaunchTaskModal && <LaunchTaskModal onClose={() => setShowLaunchTaskModal(false)} />}
    </>
  );
};
