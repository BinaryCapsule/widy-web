import React from 'react';
import { Action, Dialog } from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { useDeleteTaskMutation } from '../../api/useDeleteTaskMutation';

interface Props {
  task: TaskDto;
  onRequestClose(): void;
}

export const DeleteTask: React.FC<Props> = ({ task, onRequestClose }) => {
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();

  const deleteAction = async () => {
    try {
      await deleteTask({ task });
    } catch {
      // Ignore
    }
  };

  const actions: Action[] = [
    {
      text: 'Cancel',
      variant: 'ghostGray',
      onClick: onRequestClose,
    },
    {
      text: 'Delete',
      variant: 'error',
      onClick: deleteAction,
    },
  ];

  return (
    <Dialog
      isOpen
      onClose={onRequestClose}
      contentLabel="Delete task dialog"
      actions={actions}
      title="Delete task"
      message="Are you sure you want to delete this task?"
      variant="warning"
    />
  );
};
