import { Box, Button, Flex, Text } from '@binarycapsule/ui-capsules';
import React, { useState } from 'react';
import { useTomorrowQuery } from '../../api/useTomorrowQuery';
import { SectionEmpty } from '../Section/Section.empty';
import { SectionHeader } from '../Section/Section.styles';
import { AddTask } from '../AddTask/AddTask';
import { getSectionTasks } from '../../utils/getSectionTasks';
import { Task } from '../Task/Task';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { SectionsLoading } from '../Sections/Sections.loading';
import { useTodayDayId } from '../../hooks/useTodayDayId';
import { MoveAllToPlan } from '../MoveAllToPlan/MoveAllToPlan';

export const Tomorrow = () => {
  const { isLoading, data } = useTomorrowQuery();

  const [showAddTask, setShowAddTask] = useState(false);

  const { taskId: routeTaskId } = useDayRouteParams();

  const { todayDayId } = useTodayDayId();

  if (isLoading) {
    return <SectionsLoading count={1} />;
  }

  if (!data) {
    return null;
  }

  const { entities, result: sectionId } = data;

  const tasks = getSectionTasks(sectionId, entities.tasks);

  return (
    <>
      <Box css={{ my: '$6' }}>
        {tasks.length > 0 && !!todayDayId && (
          <SectionHeader
            css={{ borderBottom: tasks.length > 0 ? '1px solid $neutral300' : 'none' }}
          >
            <div />

            <MoveAllToPlan dayId={todayDayId} />
          </SectionHeader>
        )}

        {tasks.length === 0 ? (
          <SectionEmpty>No tasks</SectionEmpty>
        ) : (
          <Box>
            {tasks.map(task => (
              <Task
                key={task.id}
                variant="tomorrow"
                task={task}
                isSelected={task.id.toString() === routeTaskId}
                isDragging={false}
                todayDayId={todayDayId}
              />
            ))}
          </Box>
        )}

        <Button
          leftIcon="plus"
          variant="ghostGray"
          onClick={() => setShowAddTask(true)}
          css={{ mt: '$2' }}
        >
          Add task
        </Button>
      </Box>

      <Flex justify="center">
        <Text variant="helper" css={{ textAlign: 'center' }}>
          These tasks will be added to the plan in the next working day.
        </Text>
      </Flex>

      {showAddTask && <AddTask sectionId={sectionId} onClose={() => setShowAddTask(false)} />}
    </>
  );
};
