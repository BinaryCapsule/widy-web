import React from 'react';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { useDayQuery } from '../../api/useDayQuery';
import { EditableTaskSummary } from './components/EditableTaskSummary/EditableTaskSummary';
import { ScopeSelection } from './components/ScopeSelection/ScopeSelection';
import { SidebarWrapper } from './Sidebar.styles';
import { SidebarEmpty } from './Sidebar.empty';

export const Sidebar = () => {
  const { taskId } = useDayRouteParams();

  const { data } = useDayQuery();

  if (!data) {
    return null;
  }

  const task = taskId ? data.entities.tasks?.[parseInt(taskId, 10)] : null;

  if (!task) {
    return <SidebarEmpty />;
  }

  const { id, summary } = task;

  return (
    <SidebarWrapper>
      <EditableTaskSummary key={taskId} taskId={id} summary={summary} ml={-10} />

      <ScopeSelection task={task} mt="16" />
    </SidebarWrapper>
  );
};
