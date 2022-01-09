import React, { useState } from 'react';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { SectionVariant, TaskDto, useDayQuery } from '../../api/useDayQuery';
import { Box, CSSProp, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { TimerButton } from '../TimerButton/TimerButton';
import { Time } from './components/Time/Time';
import moment from 'moment';
import { RegisterTime } from '../RegisterTime/RegisterTime';
import { useActiveTaskTick } from '../../../../stores/activeTaskTick';
import { Launcher } from '../Launcher/Launcher';

interface Props extends CSSProp {
  task: TaskDto;
}

export const Timer: React.FC<Props> = ({ task, css }) => {
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
      <Box css={css}>
        <Text variant="label" css={{ mb: '$1' }}>
          Timer
        </Text>

        {isPlan ? (
          <Box>
            <Launcher isButton task={task} />
          </Box>
        ) : (
          <Flex align="center">
            {!task.isDone && (
              <>
                <TimerButton task={task} size={48} />

                <Box css={{ mr: '$3' }} />
              </>
            )}

            <Time
              time={
                isTaskActive && task.start
                  ? task.time + moment().diff(task.start, 'seconds')
                  : task.time
              }
              css={{ mr: '$1' }}
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
