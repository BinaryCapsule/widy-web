import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionsLoading } from './Sections.loading';
import { Section } from '../Section/Section';
import { useDaysQuery } from '../../../daysNav/api/useDaysQuery';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { useTaskRank } from '../../hooks/useTaskRank';
import { getSectionTasks } from '../../utils/getSectionTasks';
import { SectionsError } from './Sections.error';
import { DayEmpty } from '../../Day.empty';

export const Sections = () => {
  const { data, isLoading, isError } = useDayQuery();

  const { data: daysData, isLoading: isLoadingDays, isError: isLoadingDaysError } = useDaysQuery();

  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const { getTaskRank } = useTaskRank();

  if (isLoading || isLoadingDays) {
    return <SectionsLoading />;
  }

  if (isError || isLoadingDaysError) {
    return <SectionsError />;
  }

  if (daysData && daysData.pages[0].items.length === 0) {
    return <DayEmpty />;
  }

  if (!data) {
    return null;
  }

  const { entities, result } = data;

  const day = entities.day[result];

  const onDragEnd = async ({ draggableId, destination, source }: DropResult) => {
    if (!destination?.droppableId) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taskId = parseInt(draggableId, 10);
    const fromSectionId = parseInt(source.droppableId, 10);
    const toSectionId = parseInt(destination.droppableId, 10);

    const sectionTasks = getSectionTasks(toSectionId, entities.tasks);

    let previousIndex;

    if (fromSectionId !== toSectionId) {
      previousIndex = destination.index > 0 ? destination.index - 1 : null;
    } else {
      if (destination.index > source.index) {
        previousIndex = destination.index;
      } else {
        previousIndex = destination.index > 0 ? destination.index - 1 : null;
      }
    }

    const previousTaskId =
      sectionTasks.length > 0 && previousIndex !== null
        ? sectionTasks[previousIndex].id
        : undefined;

    const rank = getTaskRank({ sectionId: toSectionId, previousTaskId });

    try {
      await updateTask({
        taskId,
        payload: {
          sectionId: toSectionId,
          rank,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {day.sections.map(sectionId => {
        return <Section key={sectionId} sectionId={sectionId} />;
      })}
    </DragDropContext>
  );
};
