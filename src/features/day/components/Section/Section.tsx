import React from 'react';
import { Box, Button, Text } from '@binarycapsule/ui-capsules';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionEmpty } from './Section.empty';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Task } from '../Task/Task';
import { getTaskVariant } from '../../utils/getTaskVariant';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { SectionHeader } from './Section.styles';

interface Props {
  sectionId: number;
}

export const Section: React.FC<Props> = ({ sectionId }) => {
  const { dayId, taskId: routeTaskId } = useDayRouteParams();

  const { data } = useDayQuery({ dayId });

  const { data: activeTask } = useActiveTaskQuery();

  if (!data) {
    return null;
  }

  const section = data.entities.sections[sectionId];

  return (
    <Box my="32">
      <SectionHeader isPlan={section.isPlan} hasTasks={section.tasks.length > 0}>
        <Text fontWeight={600}>{section.title}</Text>
      </SectionHeader>

      {section.tasks.length === 0 ? (
        <SectionEmpty>No task in section "{section.title}"</SectionEmpty>
      ) : (
        <Box>
          {section.tasks.map(taskId => {
            const task = data.entities.tasks[taskId];

            return (
              <Task
                variant={getTaskVariant(task, section, activeTask?.task)}
                task={task}
                isSelected={taskId.toString() === routeTaskId}
              />
            );
          })}
        </Box>
      )}

      <Button leftIcon="plus" variant="ghost" variantColor="neutral" mt="8">
        {section.isPlan ? 'Add to Plan' : 'Add task'}
      </Button>
    </Box>
  );
};
