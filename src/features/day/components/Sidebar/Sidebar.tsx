import React from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useDayQuery } from '../../api/useDayQuery';
import { EditableTaskSummary } from './components/EditableTaskSummary/EditableTaskSummary';
import { ScopeSelection } from './components/ScopeSelection/ScopeSelection';
import { SidebarWrapper } from './Sidebar.styles';
import { SidebarEmpty } from './Sidebar.empty';
import { NotesEditor } from '../NotesEditor/NotesEditor';
import { Timer } from '../Timer/Timer';

export const Sidebar = () => {
  const { taskId } = useDayRouteParams();

  const { data } = useDayQuery();

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
      <EditableTaskSummary key={taskId} taskId={id} summary={summary} ml={-10} />

      <ScopeSelection task={task} mt="16" />

      <Timer task={task} mt="16" />

      <NotesEditor taskId={id} notes={notes} mt="16" />
    </SidebarWrapper>
  );
};
