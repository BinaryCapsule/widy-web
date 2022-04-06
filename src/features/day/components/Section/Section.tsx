import React, { useState } from 'react';
import { Box, Button, Icon, Text } from '@binarycapsule/ui-capsules';
import { SectionVariant, useDayQuery } from '../../api/useDayQuery';
import { SectionEmpty } from './Section.empty';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { Task } from '../Task/Task';
import { getTaskVariant } from '../../utils/getTaskVariant';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { SectionHeader } from './Section.styles';
import { AddTask } from '../AddTask/AddTask';
import { sectionTitleMap } from './Section.constants';
import { getSectionTasks } from '../../utils/getSectionTasks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { MoveAllToTomorrow } from '../MoveAllToTomorrow/MoveAllToTomorrow';

interface Props {
  sectionId: number;
}

export const Section: React.FC<Props> = ({ sectionId }) => {
  const { taskId: routeTaskId } = useDayRouteParams();

  const { data } = useDayQuery();

  const { data: activeTaskData } = useActiveTaskQuery();

  const [showAddTask, setShowAddTask] = useState(false);

  if (!data) {
    return null;
  }

  const section = data.entities.sections[sectionId];

  const tasks = getSectionTasks(sectionId, data.entities.tasks);

  const isPlan = section.variant === SectionVariant.Plan;

  return (
    <>
      <Box as="section" css={{ my: '$5' }}>
        <SectionHeader
          css={{ borderBottom: isPlan && tasks.length > 0 ? '1px solid $neutral300' : 'none' }}
        >
          <Text css={{ fontWeight: 600 }}>
            {sectionTitleMap[section.title as keyof typeof sectionTitleMap]}
          </Text>

          {tasks.length > 0 && isPlan && <MoveAllToTomorrow />}
        </SectionHeader>

        <Droppable droppableId={sectionId.toString()}>
          {droppableProvided => (
            <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {tasks.length === 0 ? (
                <>
                  <SectionEmpty>No tasks in section &quot;{section.title}&quot;</SectionEmpty>

                  {/* Hack to remove the no-placeholder warning in development */}
                  <div style={{ display: 'none' }}>{droppableProvided.placeholder}</div>
                </>
              ) : (
                <Box>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <Box
                            css={{ position: 'relative', py: isPlan ? 0 : 4, isolation: 'isolate' }}
                          >
                            <Box
                              css={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                left: -24,
                                height: 20,
                                zIndex: 1,
                                '@sm': {
                                  left: 6,
                                },
                              }}
                              {...provided.dragHandleProps}
                              aria-label="Drag a task"
                            >
                              <Icon icon="grip" css={{ color: '$neutral400' }} />
                            </Box>

                            <Task
                              variant={getTaskVariant(task, section, activeTaskData?.id)}
                              task={task}
                              isSelected={task.id.toString() === routeTaskId}
                              isDragging={snapshot.isDragging}
                            />
                          </Box>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {droppableProvided.placeholder}
                </Box>
              )}
            </div>
          )}
        </Droppable>

        <Button
          leftIcon="plus"
          variant="ghostGray"
          onClick={() => setShowAddTask(true)}
          css={{ mt: '$2' }}
        >
          {isPlan ? 'Add to Plan' : 'Add task'}
        </Button>
      </Box>

      {showAddTask && <AddTask sectionId={sectionId} onClose={() => setShowAddTask(false)} />}
    </>
  );
};
