import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  RadioPicker,
} from '@binarycapsule/ui-capsules';
import { ErrorMessage } from '@hookform/error-message';
import { FormValues } from './LaunchTaskModal.meta';
import { HelpText } from '@binarycapsule/ui-capsules/dist/HelpText/HelpText';
import { useLaunchTaskModal } from './useLaunchTaskModal';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { useTaskRank } from '../../hooks/useTaskRank';
import { useDayRouteNavigate } from '../../hooks/useDayRouteNavigate';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { getNow } from '../../utils/getNow';

interface Props {
  taskId: number;
  onClose(): void;
}

export const LaunchTaskModal: React.FC<Props> = ({ taskId, onClose }) => {
  const { data } = useLaunchTaskModal();

  const { mutateAsync: updateTask, isLoading: isUpdatingTask } = useUpdateTaskMutation();

  const { getTaskRank } = useTaskRank();

  const { dayId } = useDayRouteParams();

  const { navigate } = useDayRouteNavigate();

  if (!data) {
    return null;
  }

  const { sectionOpts, selectedSectionId, formBag } = data;

  const onLaunchTask = async ({ sectionId }: FormValues) => {
    if (!sectionId) {
      return;
    }

    try {
      await updateTask({
        taskId,
        payload: {
          sectionId,
          rank: getTaskRank(sectionId),
          start: getNow(),
        },
      });

      navigate({ dayId, taskId: taskId.toString() });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} contentLabel="Launch task" size="small">
      <form onSubmit={formBag.handleSubmit(onLaunchTask)}>
        <ModalHeader>Select section</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody>
          <Box display="flex" flexDirection="column">
            {sectionOpts.map(({ id, label }, index) => (
              <RadioPicker
                key={id}
                checked={id === selectedSectionId}
                label={label}
                onChange={() => formBag.setValue('sectionId', id)}
                mb={index !== sectionOpts.length - 1 ? '16' : 0}
              />
            ))}
          </Box>

          <ErrorMessage
            errors={formBag.formState.errors}
            name="sectionId"
            render={({ message }) => <HelpText variant="error">{message}</HelpText>}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" isLoading={isUpdatingTask}>
            Launch Task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
