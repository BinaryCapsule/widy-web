import React, { useState } from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Button, IllustratedIcon, Tooltip } from '@binarycapsule/ui-capsules';
import { MoveTask } from '../MoveTask/MoveTask';
import { TaskDto } from '../../api/useDayQuery';

interface Props {
  task: TaskDto;
  size?: number;
  isButton?: boolean;
}

export const Launcher: React.FC<Props> = ({ task, size, isButton }) => {
  const [showLaunchTaskModal, setShowLaunchTaskModal] = useState(false);

  const { dayId } = useDayRouteParams();

  if (!dayId) return null;

  return (
    <>
      <Tooltip label="Start working on this task">
        {isButton ? (
          <Button
            leftIcon="rocket"
            variant="ghostGray"
            onClick={() => setShowLaunchTaskModal(true)}
          >
            Launch task
          </Button>
        ) : (
          <IllustratedIcon
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
            primaryColor="#d1d4dc"
            primaryColorHover="#CCE7FF"
            secondaryColor="#6c727f"
            secondaryColorHover="#1960A6"
            aria-label="Launch task"
          />
        )}
      </Tooltip>

      {showLaunchTaskModal && (
        <MoveTask isLaunch task={task} onRequestClose={() => setShowLaunchTaskModal(false)} />
      )}
    </>
  );
};
