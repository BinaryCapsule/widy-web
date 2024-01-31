import React from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useDayQuery } from '../../api/useDayQuery';
import { EditableTaskSummary } from './components/EditableTaskSummary/EditableTaskSummary';
import { ScopeSelection } from './components/ScopeSelection/ScopeSelection';
import { CloseButton, SidebarWrapper } from './Sidebar.styles';
import { SidebarEmpty } from './Sidebar.empty';
import { Timer } from '../Timer/Timer';
import { useTomorrowQuery } from '../../api/useTomorrowQuery';
import { AddToPlan } from '../AddToPlan/AddToPlan';
import { useTodayDayId } from '../../hooks/useTodayDayId';
import { useSidebarStore } from '../../stores/sidebarStore';

// const NotesEditor = lazy(() => import('../NotesEditor/NotesEditor'));

export const Sidebar = () => {
  const { dayId, taskId } = useDayRouteParams();

  const { data: dayData } = useDayQuery();

  const { todayDayId } = useTodayDayId();

  const { data: tomorrowData } = useTomorrowQuery();

  const isSidebarOpen = useSidebarStore(state => state.isOpen);
  const setSidebarOpen = useSidebarStore(state => state.setIsOpen);

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
    <SidebarWrapper $isOpen={isSidebarOpen}>
      <CloseButton
        icon="x"
        variant="ghostGray"
        size="small"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close"
      />

      <EditableTaskSummary key={taskId} taskId={id} summary={summary} style={{ marginLeft: -10 }} />

      <ScopeSelection task={task} style={{ marginTop: 16 }} />

      {todayDayId && dayId === 'tomorrow' && (
        <AddToPlan isButton dayId={todayDayId} task={task} style={{ marginTop: 16 }} />
      )}

      {dayId !== 'tomorrow' && <Timer task={task} style={{ marginTop: 16 }} />}

      {/*<Suspense fallback={null}>*/}
      {/*  <NotesEditor taskId={id} notes={notes} style={{ marginTop: 16 }} />*/}
      {/*</Suspense>*/}
    </SidebarWrapper>
  );
};
