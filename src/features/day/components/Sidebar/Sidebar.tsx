import React from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useDayQuery } from '../../api/useDayQuery';
import { EditableTaskSummary } from './components/EditableTaskSummary/EditableTaskSummary';
import { ScopeSelection } from './components/ScopeSelection/ScopeSelection';
import { SidebarWrapper } from './Sidebar.styles';
import { SidebarEmpty } from './Sidebar.empty';
import { NotesEditor } from '../NotesEditor/NotesEditor';
import { Timer } from '../Timer/Timer';
import { useTomorrowQuery } from '../../api/useTomorrowQuery';
import { AddToPlan } from '../AddToPlan/AddToPlan';
import { useTodayDayId } from '../../hooks/useTodayDayId';

export const Sidebar = () => {
  const { dayId, taskId } = useDayRouteParams();

  const { data: dayData } = useDayQuery();

  const { todayDayId } = useTodayDayId();

  const { data: tomorrowData } = useTomorrowQuery();

  let data;

  if (dayId === 'tomorrow' && tomorrowData) {
    data = tomorrowData;
  } else {
    data = dayData;
  }

  if (!data) {
    return <SidebarWrapper />;
  }

  const task = taskId ? data.entities.tasks?.[parseInt(taskId, 10)] : null;

  if (!task) {
    return <SidebarEmpty />;
  }

  const { id, summary, notes } = task;

  return (
    <SidebarWrapper>
      <EditableTaskSummary key={taskId} taskId={id} summary={summary} css={{ ml: -10 }} />

      <ScopeSelection task={task} css={{ mt: '$4' }} />

      {todayDayId && dayId === 'tomorrow' && (
        <AddToPlan isButton dayId={todayDayId} task={task} css={{ mt: '$4' }} />
      )}

      {dayId !== 'tomorrow' && <Timer task={task} css={{ mt: '$4' }} />}

      <NotesEditor taskId={id} notes={notes} css={{ mt: '$4' }} />
    </SidebarWrapper>
  );
};
