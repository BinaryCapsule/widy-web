import React, { ComponentPropsWithoutRef, useState } from 'react';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { SectionVariant, TaskDto, useDayQuery } from '../../api/useDayQuery';
import { Box, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { TimerButton } from '../TimerButton/TimerButton';
import { Time } from './components/Time/Time';
import moment from 'moment';
import { RegisterTime } from '../RegisterTime/RegisterTime';
import { useActiveTaskTick } from '../../../../stores/activeTaskTick';
import { Launcher } from '../Launcher/Launcher';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  task: TaskDto;
}

export const Timer: React.FC<Props> = ({ task, style }) => {
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

  const isPlan = section.variant === SectionVariant.Plan;

  return (
    <>
      <Box style={style}>
        <Text variant="label" style={{ marginBottom: 4 }}>
          Timer
        </Text>

        {isPlan ? (
          <Box>
            <Launcher isButton task={task} />
          </Box>
        ) : (
          <Flex $align="center">
            {!task.isDone && (
              <>
                <TimerButton task={task} size={48} />

                <Box style={{ marginRight: 12 }} />
              </>
            )}

            <Time
              time={
                isTaskActive && task.start
                  ? task.time + moment().diff(task.start, 'seconds')
                  : task.time
              }
              style={{ marginRight: 4 }}
            />

            {!isTaskActive && (
              <IconButton
                variant="ghostGray"
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
