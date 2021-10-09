import { Box, Button, Text } from '@binarycapsule/ui-capsules';
import React, { useState } from 'react';
import { useTomorrowQuery } from '../../api/useTomorrowQuery';
import { sectionTitleMap } from '../Section/Section.constants';
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

  const tomorrow = entities.tomorrow[sectionId];

  const { title } = tomorrow;

  const tasks = getSectionTasks(sectionId, entities.tasks);

  return (
    <>
      <Box my="32">
        <SectionHeader isPlan hasTasks={tasks.length > 0}>
          <Text fontWeight={600}>{sectionTitleMap[title as keyof typeof sectionTitleMap]}</Text>

          {tasks.length > 0 && !!todayDayId && <MoveAllToPlan dayId={todayDayId} />}
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
          variant="ghost"
          variantColor="neutral"
          onClick={() => setShowAddTask(true)}
          mt="8"
        >
          Add task
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Text variant="helper" textAlign="center">
          These tasks will be added to the plan in the next working day.
        </Text>
      </Box>

      {showAddTask && <AddTask sectionId={sectionId} onClose={() => setShowAddTask(false)} />}
    </>
  );
};
