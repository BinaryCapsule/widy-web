import React, { useState } from 'react';
import {
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  styled,
} from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { RenameTask } from '../RenameTask/RenameTask';
import { DeleteTask } from '../DeleteTask/DeleteTask';
import { RegisterTime } from '../RegisterTime/RegisterTime';
import { MoveTask } from '../MoveTask/MoveTask';
import { useMoveToTomorrowMutation } from '../../api/useMoveToTomorrowMutation';
import { TaskVariant } from '../Task/Task.styles';

const Trigger = styled(IconButton, {
  '&[data-reach-menu-button][aria-expanded="true"]': {
    bg: '$neutral200',
  },
});

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
      <Menu>
        <MenuButton
          as={Trigger}
          icon="dots_h"
          variant="ghostGray"
          size="small"
          aria-label="Task menu"
        />
        <MenuList>
          <MenuItem onSelect={() => setShowRenameTask(true)}>
            <Flex align="center">
              <Icon
                icon="pencil"
                size={18}
                variant="outline"
                css={{ color: '$neutral500', mr: '$2' }}
              />
              Rename
            </Flex>
          </MenuItem>

          {canRegisterTime && (
            <MenuItem onSelect={() => setShowRegisterTime(true)}>
              <Flex align="center">
                <Icon
                  icon="clock"
                  size={18}
                  variant="outline"
                  css={{ color: '$neutral500', mr: '$2' }}
                />
                Register Time
              </Flex>
            </MenuItem>
          )}

          {canMoveToTomorrow && (
            <MenuItem
              onSelect={async () => {
                try {
                  await moveToTomorrow({ task });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Flex align="center">
                <Icon
                  icon="calendar"
                  size={18}
                  variant="outline"
                  css={{ color: '$neutral500', mr: '$2' }}
                />
                Move to Tomorrow
              </Flex>
            </MenuItem>
          )}

          {canMove && (
            <MenuItem onSelect={() => setShowMoveTask(true)}>
              <Flex align="center">
                <Icon
                  icon="switch_v"
                  size={18}
                  variant="outline"
                  css={{ color: '$neutral500', mr: '$2' }}
                />
                Move
              </Flex>
            </MenuItem>
          )}

          <MenuItem onSelect={() => setShowDeleteTask(true)}>
            <Flex align="center">
              <Icon
                icon="trash"
                size={18}
                variant="outline"
                css={{ color: '$error500', mr: '$2' }}
              />
              Delete
            </Flex>
          </MenuItem>
        </MenuList>
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
