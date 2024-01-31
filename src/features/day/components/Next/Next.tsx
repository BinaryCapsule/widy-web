import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Box, Button, Flex, Text } from '@binarycapsule/ui-capsules';
import { useTomorrowQuery } from '../../api/useTomorrowQuery';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useTodayDayId } from '../../hooks/useTodayDayId';
import { getSectionTasks } from '../../utils/getSectionTasks';
import { AddTask } from '../AddTask/AddTask';
import { MoveAllToPlan } from '../MoveAllToPlan/MoveAllToPlan';
import { SectionEmpty } from '../Section/Section.empty';
import { SectionHeader } from '../Section/Section.styles';
import { Task } from '../Task/Task';
import { NextLoading } from './Next.loading';

export const Next = () => {
  const theme = useTheme();

  const { isLoading, data } = useTomorrowQuery();

  const [showAddTask, setShowAddTask] = useState(false);

  const { taskId: routeTaskId } = useDayRouteParams();

  const { todayDayId } = useTodayDayId();

  if (isLoading) {
    return <NextLoading />;
  }

  if (!data) {
    return null;
  }

  const { entities, result: sectionId } = data;

  const tasks = getSectionTasks(sectionId, entities.tasks);

  return (
    <>
      <Box style={{ margin: '24px 0' }}>
        <SectionHeader
          style={{
            borderBottom: tasks.length > 0 ? `1px solid ${theme.colors.neutral300}` : 'none',
            height: tasks.length === 0 || (tasks.length > 0 && !todayDayId) ? 0 : 48,
          }}
        >
          {tasks.length > 0 && !!todayDayId && (
            <MoveAllToPlan dayId={todayDayId} style={{ marginLeft: 'auto' }} />
          )}
        </SectionHeader>

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
          style={{ marginTop: 8 }}
        >
          Add task
        </Button>
      </Box>

      <Flex justify="center">
        <Text variant="helper" style={{ textAlign: 'center' }}>
          These tasks will be added to the plan in the next working day.
        </Text>
      </Flex>

      {showAddTask && <AddTask sectionId={sectionId} onClose={() => setShowAddTask(false)} />}
    </>
  );
};
