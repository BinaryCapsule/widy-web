import React, { useState } from 'react';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { TaskDto, useDayQuery } from '../../api/useDayQuery';
import { Box, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { TimerButton } from '../TimerButton/TimerButton';
import { Time } from './components/Time/Time';
import moment from 'moment';
import { RegisterTime } from '../RegisterTime/RegisterTime';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';
import { useActiveTaskTick } from '../../state/activeTaskSlice';
import { Launcher } from '../Launcher/Launcher';

interface Props extends MarginProps {
  task: TaskDto;
}

export const Timer: React.FC<Props> = ({ task, ...rest }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { data: activeTaskId } = useActiveTaskQuery();

  const { data } = useDayQuery();

  useActiveTaskTick();

  const isTaskActive = task.id === activeTaskId?.id;

  if (!data) {
    return null;
  }

  const {
    entities: { sections },
  } = data;

  const section = sections[task.sectionId];

  return (
    <>
      <Box {...rest}>
        <Text variant="label" mb="4">
          Timer
        </Text>

        {section.isPlan ? (
          <Box>
            <Launcher isButton taskId={task.id} />
          </Box>
        ) : (
          <Flex alignItems="center">
            {!task.isDone && (
              <>
                <TimerButton task={task} size={48} />

                <Box mr="12" />
              </>
            )}

            <Time
              time={
                isTaskActive && task.start
                  ? task.time + moment().diff(task.start, 'seconds')
                  : task.time
              }
              mr="4"
            />

            {!isTaskActive && (
              <IconButton
                variant="ghost"
                variantColor="neutral"
                icon="pencil"
                onClick={() => setIsRegisterModalOpen(true)}
                aria-label="Edit task time"
              />
            )}
          </Flex>
        )}
      </Box>

      {isRegisterModalOpen && (
        <RegisterTime task={task} onRequestClose={() => setIsRegisterModalOpen(false)} />
      )}
    </>
  );
};
