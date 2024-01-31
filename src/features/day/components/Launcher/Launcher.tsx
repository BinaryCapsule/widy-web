import React, { useState } from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Button, Tooltip } from '@binarycapsule/ui-capsules';
import { MoveTask } from '../MoveTask/MoveTask';
import { TaskDto } from '../../api/useDayQuery';
import { StyledLauncher } from './Launcher.styles';

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
          <StyledLauncher
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
            aria-label="Launch task"
            style={{ margin: '0 4px' }}
          />
        )}
      </Tooltip>

      {showLaunchTaskModal && (
        <MoveTask isLaunch task={task} onRequestClose={() => setShowLaunchTaskModal(false)} />
      )}
    </>
  );
};
