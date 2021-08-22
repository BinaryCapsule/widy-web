import React, { useState } from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { RenameTask } from '../RenameTask/RenameTask';
import { DeleteTask } from '../DeleteTask/DeleteTask';
import { TaskVariant } from '../Task/Task.styles';
import { RegisterTime } from '../RegisterTime/RegisterTime';

interface Props {
  task: TaskDto;
  variant: TaskVariant;
}

export const TaskMenu: React.FC<Props> = ({ task, variant }) => {
  const [showRenameTask, setShowRenameTask] = useState(false);

  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const [showRegisterTime, setShowRegisterTime] = useState(false);

  const canRegisterTime = variant === 'todo';

  const canMoveToTomorrow = variant !== 'active';

  return (
    <>
      <Menu
        trigger={
          <IconButton icon="dots_h" variant="ghost" variantColor="neutral" size="small" ml="4" />
        }
      >
        {canRegisterTime ? (
          <MenuItem
            text="Register Time"
            leftIcon="clock"
            onClick={() => setShowRegisterTime(true)}
          />
        ) : null}

        <MenuItem text="Rename" leftIcon="pencil" onClick={() => setShowRenameTask(true)} />

        {canMoveToTomorrow ? (
          <MenuItem
            text={`${task.time > 0 ? 'Copy' : 'Move'} to "Tomorrow"`}
            leftIcon="calendar"
            onClick={() => {}}
          />
        ) : null}

        <MenuItem
          text="Delete"
          leftAddon={<Icon icon="trash" color="error.500" size={18} />}
          onClick={() => setShowDeleteTask(true)}
        />
      </Menu>

      {showRenameTask && <RenameTask task={task} onRequestClose={() => setShowRenameTask(false)} />}

      {showDeleteTask && <DeleteTask task={task} onRequestClose={() => setShowDeleteTask(false)} />}

      {showRegisterTime && (
        <RegisterTime task={task} onRequestClose={() => setShowRegisterTime(false)} />
      )}
    </>
  );
};
