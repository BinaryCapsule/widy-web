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
import { HelpText } from '@binarycapsule/ui-capsules/dist/HelpText/HelpText';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { useTaskRank } from '../../hooks/useTaskRank';
import { useDayRouteNavigate } from '../../hooks/useDayRouteNavigate';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { getNow } from '../../utils/getNow';
import { FormValues } from './MoveTask.meta';
import { useMoveTask } from './useMoveTask';
import { TaskDto } from '../../api/useDayQuery';

interface Props {
  task: TaskDto;
  isLaunch?: boolean;
  onRequestClose(): void;
}

export const MoveTask: React.FC<Props> = ({ task, isLaunch, onRequestClose }) => {
  const { data } = useMoveTask({ task });

  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const { getTaskRank } = useTaskRank();

  const { dayId } = useDayRouteParams();

  const { navigate } = useDayRouteNavigate();

  if (!data) {
    return null;
  }

  const { sectionOpts, selectedSectionId, formBag } = data;

  const onMoveTask = async ({ sectionId }: FormValues) => {
    if (!sectionId) {
      return;
    }

    try {
      onRequestClose();

      navigate({ dayId, taskId: task.id.toString() });

      await updateTask({
        taskId: task.id,
        payload: {
          sectionId,
          rank: getTaskRank(sectionId),
          start: isLaunch ? getNow() : undefined,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen onRequestClose={onRequestClose} contentLabel="Launch task" size="small">
      <form onSubmit={formBag.handleSubmit(onMoveTask)}>
        <ModalHeader>Select section</ModalHeader>
        <ModalCloseButton onClick={onRequestClose} />

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
          <Button variant="ghost" variantColor="neutral" onClick={onRequestClose}>
            Cancel
          </Button>

          <Button type="submit">{`${isLaunch ? 'Launch' : 'Move'} task`}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
