import React, { useState } from 'react';
import { Box, Button, Text } from '@binarycapsule/ui-capsules';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionEmpty } from './Section.empty';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Task } from '../Task/Task';
import { getTaskVariant } from '../../utils/getTaskVariant';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { SectionHeader } from './Section.styles';
import { AddTask } from '../AddTask/AddTask';

interface Props {
  sectionId: number;
}

export const Section: React.FC<Props> = ({ sectionId }) => {
  const { taskId: routeTaskId } = useDayRouteParams();

  const { data } = useDayQuery();

  const { data: activeTask } = useActiveTaskQuery();

  const [showAddTask, setShowAddTask] = useState(false);

  if (!data) {
    return null;
  }

  const section = data.entities.sections[sectionId];

  return (
    <>
      <Box my="32">
        <SectionHeader isPlan={section.isPlan} hasTasks={section.tasks.length > 0}>
          <Text fontWeight={600}>{section.title}</Text>
        </SectionHeader>

        {section.tasks.length === 0 ? (
          <SectionEmpty>No tasks in section "{section.title}"</SectionEmpty>
        ) : (
          <Box>
            {section.tasks.map(taskId => {
              const { tasks } = data.entities;

              if (!tasks) {
                return null;
              }

              const task = tasks[taskId];

              return (
                <Task
                  key={taskId}
                  variant={getTaskVariant(task, section, activeTask?.task)}
                  task={task}
                  isSelected={taskId.toString() === routeTaskId}
                />
              );
            })}
          </Box>
        )}

        <Button
          leftIcon="plus"
          variant="ghost"
          variantColor="neutral"
          onClick={() => setShowAddTask(true)}
          mt="8"
        >
          {section.isPlan ? 'Add to Plan' : 'Add task'}
        </Button>
      </Box>

      {showAddTask && (
        <AddTask sectionId={sectionId} onClose={() => setShowAddTask(false)} />
      )}
    </>
  );
};
