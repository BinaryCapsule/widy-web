import React, { useState } from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { RenameTask } from '../RenameTask/RenameTask';
import { DeleteTask } from '../DeleteTask/DeleteTask';
import { TaskVariant } from '../Task/Task.styles';
import { RegisterTime } from '../RegisterTime/RegisterTime';
import { MoveTask } from '../MoveTask/MoveTask';
import { useMoveToTomorrowMutation } from '../../api/useMoveToTomorrowMutation';

interface Props {
  task: TaskDto;
  variant: TaskVariant;
}

export const TaskMenu: React.FC<Props> = ({ task, variant }) => {
  const [showRenameTask, setShowRenameTask] = useState(false);

  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const [showRegisterTime, setShowRegisterTime] = useState(false);

  const [showMoveTask, setShowMoveTask] = useState(false);

  const { mutateAsync: moveToTomorrow } = useMoveToTomorrowMutation();

  const canRegisterTime = variant === 'todo';

  const canMoveToTomorrow = variant !== 'active' && variant !== 'tomorrow';

  const canMove = variant !== 'active' && variant !== 'tomorrow';

  return (
    <>
      <Menu
        trigger={
          <IconButton
            icon="dots_h"
            variant="ghost"
            variantColor="neutral"
            size="small"
            aria-label="Task menu"
            ml="4"
          />
        }
      >
        <MenuItem text="Rename" leftIcon="pencil" onClick={() => setShowRenameTask(true)} />

        {canRegisterTime ? (
          <MenuItem
            text="Register Time"
            leftIcon="clock"
            onClick={() => setShowRegisterTime(true)}
          />
        ) : null}

        {canMoveToTomorrow ? (
          <MenuItem
            text={`${task.time > 0 ? 'Copy' : 'Move'} to "Tomorrow"`}
            leftIcon="calendar"
            onClick={async () => {
              try {
                await moveToTomorrow({ task });
              } catch (err) {
                console.error(err);
              }
            }}
          />
        ) : null}

        {canMove ? (
          <MenuItem text="Move" leftIcon="switch_v" onClick={() => setShowMoveTask(true)} />
        ) : null}

        <MenuItem
          text="Delete"
          leftAddon={<Icon icon="trash" color="error.500" size={18} />}
          onClick={() => setShowDeleteTask(true)}
        />
      </Menu>

      {showRenameTask && <RenameTask task={task} onRequestClose={() => setShowRenameTask(false)} />}

      {showDeleteTask && <DeleteTask task={task} onRequestClose={() => setShowDeleteTask(false)} />}

      {showMoveTask && <MoveTask task={task} onRequestClose={() => setShowMoveTask(false)} />}

      {showRegisterTime && (
        <RegisterTime task={task} onRequestClose={() => setShowRegisterTime(false)} />
      )}
    </>
  );
};
